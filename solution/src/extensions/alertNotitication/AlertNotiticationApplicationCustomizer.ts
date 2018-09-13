import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'AlertNotiticationApplicationCustomizerStrings';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IHubSiteDataResponse, IHubSiteData } from './IHubSiteData';
import { IAlert, IAlertItem, AlertType } from './IAlert';
import { IAlertNotificationsProps, AlertNotifications } from './components';
import * as React from 'react';
import * as ReactDom from 'react-dom';

export interface IAlertNotiticationApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AlertNotiticationApplicationCustomizer
  extends BaseApplicationCustomizer<IAlertNotiticationApplicationCustomizerProperties> {
  private static _topPlaceholder?: PlaceholderContent;
  /**
   * Constant used to exit the chain of promises when the current site
   * is not connected to a hub site and is not a hub site itself.
   */
  private static readonly NO_HUBSITE_DATA: string = 'NO_HUBSITE_DATA';

  private _handleDispose(): void {
  }

  @override
  public onInit(): Promise<void> {
    // add handler to he page navigated event which occurs both when
    // the user opens and leaves the page
    this.context.application.navigatedEvent.add(this, this._render);

    return Promise.resolve();
  }

  /**
   * Retrieves information about the hub site to which the current site is connected.
   * If the current site is a hub site itself, returns information about the current
   * hub site.
   * If the is not connected to a hub sites, returns null;
   */
  private _getConnectedHubSiteData(): Promise<IHubSiteData> {
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
          if (res["@odata.null"] === true) {
            resolve(null);
            return;
          }

          try {
            // parse the hub site data from the value property to JSON
            const hubSiteData: IHubSiteData = JSON.parse(res.value);
            resolve(hubSiteData);
          }
          catch (e) {
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
    return new Promise<IAlert[]>((resolve: (upcomingAlerts: IAlert[]) => void, reject: (error: any) => void): void => {
      // suppress loading metadata to minimize the amount of data sent over the network
      const headers: Headers = new Headers();
      headers.append('accept', 'application/json;odata.metadata=none');

      // current date in the ISO format used to retrieve active alerts
      const nowString: string = new Date().toISOString();

      // from the Alerts list in the hub site, load the list of upcoming alerts sorted
      // ascending by their end time so that alerts that expire first, are shown on top
      this.context.spHttpClient
        .get(`${hubSiteUrl}/_api/web/lists/getByTitle('Alerts')/items?$filter=PnPAlertStartDateTime le datetime'${nowString}' and PnPAlertEndDateTime ge datetime'${nowString}'&$select=PnPAlertType,PnPAlertMessage,PnPAlertMoreInformation&$orderby=PnPAlertEndDateTime`, SPHttpClient.configurations.v1, {
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
              moreInformationUrl: alert.PnPAlertMoreInformation ? alert.PnPAlertMoreInformation.Url : null
            };
          });
          resolve(upcomingAlerts);
        })
        .catch((error: any): void => {
          reject(error);
        });
    });
  }

  private _render(): void {
    // check if the application customizer has already been rendered
    if (!AlertNotiticationApplicationCustomizer._topPlaceholder) {
      // create a DOM element in the top placeholder for the application customizer
      // to render
      AlertNotiticationApplicationCustomizer._topPlaceholder = this.context.placeholderProvider
        .tryCreateContent(PlaceholderName.Top, { onDispose: this._handleDispose });
    }

    // if the top placeholder is not available, there is no place in the UI
    // for the app customizer to render, so quit.
    if (!AlertNotiticationApplicationCustomizer._topPlaceholder) {
      return;
    }

    this
      ._getConnectedHubSiteData()
      .then((connectedHubSiteData: IHubSiteData): Promise<IAlert[]> => {
        if (connectedHubSiteData === null) {
          // Current site is not connected to a hub site and is not a hub site
          // itself. Exit the promise chain by rejecting the promise with a known
          // error code.
          return Promise.reject(AlertNotiticationApplicationCustomizer.NO_HUBSITE_DATA);
        }

        return this._loadUpcomingAlerts(connectedHubSiteData.url);
      })
      .then((upcomingAlerts: IAlert[]): void => {
        if (upcomingAlerts.length === 0) {
          console.info('No upcoming alerts found');
          return;
        }

        const element: React.ReactElement<IAlertNotificationsProps> = React.createElement(
          AlertNotifications,
          {
            alerts: upcomingAlerts
          }
        );

        // render the UI using a React component
        ReactDom.render(element, AlertNotiticationApplicationCustomizer._topPlaceholder.domElement);
      })
      .catch((error: any): void => {
        if (error === AlertNotiticationApplicationCustomizer.NO_HUBSITE_DATA) {
          console.debug('Current site is not connected to a hub site and is not a hub site itself. Skipping loading alerts');
        }
        else {
          console.error(error);
        }
      });
  }
}
