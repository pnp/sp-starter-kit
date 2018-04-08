import * as React from 'react';
import * as ReactDom from 'react-dom';

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'SiteClassificationApplicationCustomizerStrings';

import SiteClassificationHeader from './components/SiteClassificationHeader';
import { ISiteClassificationHeaderProps } from './components/ISiteClassificationHeaderProps';

// import additional controls/components
import { sp } from "@pnp/sp";

const LOG_SOURCE: string = 'SiteClassificationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISiteClassificationApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SiteClassificationApplicationCustomizer
  extends BaseApplicationCustomizer<ISiteClassificationApplicationCustomizerProperties> {

  private _headerPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // initialize the PnP JS library
    sp.setup({
      spfxContext: this.context
    });

    // call render method for generating the needed html elements
    this._renderPlaceHolders();

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {

    // handling the header placeholder
    if (!this._headerPlaceholder) {
      this._headerPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose });

      // the extension should not assume that the expected placeholder is available.
      if (!this._headerPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }

      // initialize the Site Title property reading the current site title via PnP JS
      sp.site.select("Classification").get().then((r: any) => {

        if (r.Classification) {

          let classification: string = r.Classification;

          const element: React.ReactElement<ISiteClassificationHeaderProps> = React.createElement(
            SiteClassificationHeader,
            {
              classification: classification
            }
          );

          ReactDom.render(element, this._headerPlaceholder.domElement);
          }
      });
    }

  }

  private _onDispose(): void {
    console.log('[SiteClassificationApplicationCustomizer._onDispose] Disposed custom top placeholder.');
  }
}
