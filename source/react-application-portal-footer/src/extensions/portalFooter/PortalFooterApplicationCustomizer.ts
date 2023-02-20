import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'PortalFooterApplicationCustomizerStrings';

const LOG_SOURCE: string = 'PortalFooterApplicationCustomizer';

import { IPortalFooterProps, PortalFooter } from './components/PortalFooter';
import { ILinkGroup } from './components/PortalFooter/ILinkGroup';

// import additional controls/components

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IHubSiteData, IHubSiteDataResponse } from './IHubSiteData';
import { ILinkListItem } from './ILinkListItem';

import SPUserProfileService from '../../services/SPUserProfileService';
import MyLinksDialog from './components/myLinks/MyLinksDialog';
import IMyLink from './components/myLinks/IMyLink';
import { IPortalFooterEditResult } from './components/PortalFooter/IPortalFooterEditResult';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPortalFooterApplicationCustomizerProperties {
  // the title of the list, in the Hub Site, holding the link items
  linksListTitle: string;
  // copyright message for the footer
  copyright?: string;
  // support text for the footer
  support?: string;
  // the UPS property to store the MyLinks items
  personalItemsStorageProperty: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PortalFooterApplicationCustomizer
  extends BaseApplicationCustomizer<IPortalFooterApplicationCustomizerProperties> {

    private _bottomPlaceholder?: PlaceholderContent;
    private _myLinks: IMyLink[];

    private _handleDispose(): void {
      console.log('[PortalFooterApplicationCustomizer._onDispose] Disposed custom bottom placeholder.');
    }

  @override
  public async onInit(): Promise<void> {

    // get the hub site URL
    let hubSiteUrl: string = await this.getHubSiteUrl();

    if (!hubSiteUrl) {
      console.log('Current site is not part of an hub and the footer will fallback to local list of links.');
      hubSiteUrl = this.context.pageContext.web.absoluteUrl;
    }

    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let linksListTitle: string = this.properties.linksListTitle;
    let copyright: string = this.properties.copyright;
    let support: string = this.properties.support;
    let personalItemsStorageProperty: string = this.properties.personalItemsStorageProperty;
    if (!linksListTitle || !copyright || !support || !personalItemsStorageProperty) {
      console.log('Provide valid properties for PortalFooterApplicationCustomizer!');
    }

    // call render method for generating the needed html elements
    return (await this._renderPlaceHolders());
  }

  private _editLinks = async (): Promise<IPortalFooterEditResult> => {

    let result: IPortalFooterEditResult = {
      editResult: null,
      links: null,
    };

    const myLinksDialog: MyLinksDialog = new MyLinksDialog(this._myLinks);
    await myLinksDialog.show();

    // update the local list of links
    let resultingLinks: IMyLink[] = myLinksDialog.links;

    // Do not save if the dialog was cancelled
    if (myLinksDialog.isSave) {
      if (this._myLinks !== resultingLinks) {
        this._myLinks = resultingLinks;

        // save the personal links in the UPS, if there are any updates
        let upsService: SPUserProfileService = new SPUserProfileService(this.context);
        result.editResult = await upsService.setUserProfileProperty(this.properties.personalItemsStorageProperty,
          'String',
          JSON.stringify(this._myLinks));

      }
    }
    result.links = await this.loadLinks();
    return (result);
  }

  // retrieves the URL of the hub site for the current site
  private async getHubSiteUrl(): Promise<string> {

    let result: string = null;

    try {
      // get the hub site data via REST API
      let response: SPHttpClientResponse = await this.context.spHttpClient
        .get(`${this.context.pageContext.web.absoluteUrl}/_api/web/hubsitedata`,
          SPHttpClient.configurations.v1);

      // deserialize JSON response and, if any, get the URL of the hub site
      const hubSiteDataResponse: IHubSiteDataResponse = await response.json();
      if (hubSiteDataResponse) {
        let hubSiteData: IHubSiteData = hubSiteDataResponse.value && JSON.parse(hubSiteDataResponse.value);
        if (hubSiteData) {
          result = hubSiteData.url;
        }
      }
    } catch (error) {
      console.log(error);
    }

    return (result);
  }

  // loads the groups of links from the hub site reference list
  private async loadLinks(): Promise<ILinkGroup[]> {
    const { spfi, SPFx } = await import(
      /* webpackChunkName: 'pnp-sp' */
      "@pnp/sp/presets/all");

    // initialize PnP JS library to play with SPFx contenxt
    const sp = spfi().using(SPFx(this.context));

    // prepare the result variable
    let result: ILinkGroup[] = [];

    // get the links from the source list
    let items: ILinkListItem[] = await sp.web
      .lists.getByTitle(this.properties.linksListTitle)
      .items.select("Title", "PnPPortalLinkGroup", "PnPPortalLinkUrl").top(100)
      .orderBy("PnPPortalLinkGroup", true)
      .orderBy("Title", true)();

    // console.log("ITEMS: >>", items);

    // map the list items to the results
    items.map((v, i, a) => {
      // in case we have a new group title
      if (result.length === 0 || v.PnPPortalLinkGroup !== result[result.length - 1].title) {
        // create the new group and add the current item
        result.push({
          title: v.PnPPortalLinkGroup,
          links: [{
            title: v.Title,
            url: v.PnPPortalLinkUrl.Url,
          }],
        });
      } else {
        // or add the current item to the already existing group
        result[result.length - 1].links.push({
          title: v.Title,
          url: v.PnPPortalLinkUrl.Url,
        });
      }
    });

    // get the list of personal items from the User Profile Service
    let upsService: SPUserProfileService = new SPUserProfileService(this.context);
    let myLinksJson: any = await upsService.getUserProfileProperty(this.properties.personalItemsStorageProperty);

    // if we have personalizes links
    if (myLinksJson != null) {
      if (myLinksJson.length > 0) {
        this._myLinks = JSON.parse(myLinksJson) as IMyLink[];

        // add all of them to the "My Links" group
        if (this._myLinks.length > 0) {
          result.push({
            title: strings.MyLinks,
            links: this._myLinks,
          });
        }
      }
      else {
        // if there are no personal items for my links, just provide an empty array that can be customized
        this._myLinks = [];
      }
    }

    return (result);
  }

  private async _renderPlaceHolders(): Promise<void> {

    // check if the application customizer has already been rendered
    if (!this._bottomPlaceholder) {
      // create a DOM element in the bottom placeholder for the application customizer to render
      this._bottomPlaceholder = this.context.placeholderProvider
        .tryCreateContent(PlaceholderName.Bottom, { onDispose: this._handleDispose });
    }

    // if the top placeholder is not available, there is no place in the UI
    // for the app customizer to render, so quit.
    if (!this._bottomPlaceholder) {
      return;
    }

    const links: ILinkGroup[] = await this.loadLinks();

    const element: React.ReactElement<IPortalFooterProps> = React.createElement(
      PortalFooter,
      {
        links: links,
        copyright: this.properties.copyright,
        support: this.properties.support,
        onLinksEdit: this._editLinks,
      }
    );

    // render the UI using a React component
    ReactDom.render(element, this._bottomPlaceholder.domElement);
  }

}
