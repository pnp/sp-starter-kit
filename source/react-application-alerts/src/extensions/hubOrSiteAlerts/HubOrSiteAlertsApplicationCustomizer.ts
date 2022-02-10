import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import { IHubSiteData, IHubSiteDataResponse } from './IHubSiteData';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
import { IAlert, IAlertItem, AlertType } from './IAlert';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IAlertNotificationsProps, AlertNotifications } from './components';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHubOrSiteAlertsApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HubOrSiteAlertsApplicationCustomizer
  extends BaseApplicationCustomizer<IHubOrSiteAlertsApplicationCustomizerProperties> {
    private static _topPlaceholder?: PlaceholderContent;
    /**
     * Constant used to exit the chain of promises when the current site
     * is not connected to a hub site and is not a hub site itself.
     */
    private static readonly NO_HUBSITE_DATA: string = 'NO_HUBSITE_DATA';

    @override
    public onInit(): Promise<void> {
      // add handler to he page navigated event which occurs both when
      // the user opens and leaves the page
      this.context.application.navigatedEvent.add(this, this._render);

      return Promise.resolve();
    }

    private _handleDispose(): void {
      console.log('[HubOrSiteAlertsApplicationCustomizer._onDispose] Disposed custom top placeholder.');
    }

    /**
     * Retrieves information about the hub site to which the current site is connected.
     * If the current site is a hub site itself, returns information about the current
     * hub site.
     * If the is not connected to a hub sites, returns null;
     */
    private _getConnectedHubSiteData(): Promise<IHubSiteData> {

      // tslint:disable-next-line: no-any max-line-length
      return new Promise<IHubSiteData>((resolve: (connectedHubSiteData: IHubSiteData) => void, reject: (error: any) => void): void => {
        // suppress loading metadata to minimize the amount of data sent over the network
        const headers: Headers = new Headers();
        headers.append('accept', 'application/json;odata.metadata=none');

        this.context.spHttpClient
          .get(`${this.context.pageContext.web.absoluteUrl}/_api/web/hubsitedata`, SPHttpClient.configurations.v1, {
            headers: headers
          })
          .then((res: SPHttpClientResponse): Promise<IHubSiteDataResponse> => {
            return res.json();
          })
          .then((res: IHubSiteDataResponse): void => {
            // the site is not connected to a hub site and is not a hub site itself
            if (res['@odata.null'] === true) {
              resolve(undefined);
              return;
            }

            try {
              // parse the hub site data from the value property to JSON
              const hubSiteData: IHubSiteData = JSON.parse(res.value);
              resolve(hubSiteData);
            } catch (e) {
              reject(e);
            }
          })
          .catch((error): void => {
            reject(error);
          });
      });
    }

    /**
     * Loads upcoming alerts from the Alerts list located in the hub site
     * @param hubSiteUrl URL of the hub site to which the current site is connected
     */
    private _loadUpcomingAlerts(hubSiteUrl: string): Promise<IAlert[]> {

      // tslint:disable-next-line: no-any max-line-length
      return new Promise<IAlert[]>((resolve: (upcomingAlerts: IAlert[]) => void, reject: (error: any) => void): void => {
        // suppress loading metadata to minimize the amount of data sent over the network
        const headers: Headers = new Headers();
        headers.append('accept', 'application/json;odata.metadata=none');

        // current date in the ISO format used to retrieve active alerts
        const nowString: string = new Date().toISOString();

        // from the Alerts list in the hub site, load the list of upcoming alerts sorted
        // ascending by their end time so that alerts that expire first, are shown on top
        this.context.spHttpClient
          .get(hubSiteUrl + `/_api/web/GetList('${hubSiteUrl.replace(window.location.origin,"")}/Lists/Alerts')/items?` +
            '$filter=PnPAlertStartDateTime le datetime\'' + nowString + '\' ' +
            'and PnPAlertEndDateTime ge datetime\'' + nowString + '\' ' +
            '&$select=PnPAlertType,PnPAlertMessage,PnPAlertMoreInformation&$orderby=PnPAlertEndDateTime',
            SPHttpClient.configurations.v1, {
            headers: headers
          })
          .then((res: SPHttpClientResponse): Promise<{ value: IAlertItem[] }> => {
            return res.json();
          })
          .then((res: { value: IAlertItem[] }): void => {
            // change the alert list item to alert object
            const upcomingAlerts: IAlert[] = res.value.map(alert => {
              return {
                type: AlertType[alert.PnPAlertType],
                message: alert.PnPAlertMessage,
                moreInformationUrl: alert.PnPAlertMoreInformation ? alert.PnPAlertMoreInformation.Url : undefined
              };
            });
            resolve(upcomingAlerts);
          })
          // tslint:disable-next-line: no-any
          .catch((error: any): void => {
            reject(error);
          });
      });
    }

    private _render(): void {
      // check if the application customizer has already been rendered
      if (!HubOrSiteAlertsApplicationCustomizer._topPlaceholder) {
        // create a DOM element in the top placeholder for the application customizer
        // to render
        HubOrSiteAlertsApplicationCustomizer._topPlaceholder = this.context.placeholderProvider
          .tryCreateContent(PlaceholderName.Top, { onDispose: this._handleDispose });
      }

      // if the top placeholder is not available, there is no place in the UI
      // for the app customizer to render, so quit.
      if (!HubOrSiteAlertsApplicationCustomizer._topPlaceholder) {
        return;
      }

      this
        ._getConnectedHubSiteData()
        .then((connectedHubSiteData: IHubSiteData): Promise<IAlert[]> => {
          if (!connectedHubSiteData || connectedHubSiteData === undefined) {
            // Current site is not connected to a hub site and is not a hub site
            // itself. Exit the promise chain by rejecting the promise with a known
            // error code.
            return Promise.reject(HubOrSiteAlertsApplicationCustomizer.NO_HUBSITE_DATA);
          }

          return this._loadUpcomingAlerts(connectedHubSiteData.url);
        })
        .then((upcomingAlerts: IAlert[]): void => {
          if (upcomingAlerts.length === 0) {
            console.log('No upcoming alerts found');
            return;
          }

          const element: React.ReactElement<IAlertNotificationsProps> = React.createElement(
            AlertNotifications,
            {
              alerts: upcomingAlerts
            }
          );

          // render the UI using a React component
          ReactDom.render(element, HubOrSiteAlertsApplicationCustomizer._topPlaceholder.domElement);
        })
        // tslint:disable-next-line: no-any
        .catch((error: any): void => {
          if (error === HubOrSiteAlertsApplicationCustomizer.NO_HUBSITE_DATA) {
            console.log(`Current site is not connected to a hub site and is not a hub site itself.
            Skipping loading alerts`);
          } else {
            console.error(error);
          }
        });
    }
}
