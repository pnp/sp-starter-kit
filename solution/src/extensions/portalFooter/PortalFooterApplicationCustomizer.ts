import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'PortalFooterApplicationCustomizerStrings';
import { IPortalFooterProps, PortalFooter } from './components/PortalFooter';

const LOG_SOURCE: string = 'PortalFooterApplicationCustomizer';

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
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PortalFooterApplicationCustomizer
  extends BaseApplicationCustomizer<IPortalFooterApplicationCustomizerProperties> {

  private static _bottomPlaceholder?: PlaceholderContent;

  private _handleDispose(): void {
    console.log('[PortalFooterApplicationCustomizer._onDispose] Disposed custom bottom placeholder.');
  }

  @override
  public async onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let linksListTitle: string = this.properties.linksListTitle;
    let copyright: string = this.properties.copyright;
    let support: string = this.properties.support;
    if (!linksListTitle || !copyright || !support) {
      console.log('Provide valid properties for PortalFooterApplicationCustomizer!');
    }

    // call render method for generating the needed html elements
    return(await this._renderPlaceHolders());
  }

  private async _renderPlaceHolders(): Promise<void> {

    // check if the application customizer has already been rendered
    if (!PortalFooterApplicationCustomizer._bottomPlaceholder) {
      // create a DOM element in the bottom placeholder for the application customizer to render
      PortalFooterApplicationCustomizer._bottomPlaceholder = this.context.placeholderProvider
        .tryCreateContent(PlaceholderName.Bottom, { onDispose: this._handleDispose });
    }

    // if the top placeholder is not available, there is no place in the UI
    // for the app customizer to render, so quit.
    if (!PortalFooterApplicationCustomizer._bottomPlaceholder) {
      return;
    }

    const element: React.ReactElement<IPortalFooterProps> = React.createElement(
      PortalFooter,
      {
        copyright: this.properties.copyright,
        support: this.properties.support
      }
    );

    // render the UI using a React component
    ReactDom.render(element, PortalFooterApplicationCustomizer._bottomPlaceholder.domElement);
  }
}
