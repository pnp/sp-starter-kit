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

import * as strings from 'CollabFooterApplicationCustomizerStrings';

import CollabFooter from './components/CollabFooter';
import { ICollabFooterProps } from './components/ICollabFooterProps';

const LOG_SOURCE: string = 'CollabFooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICollabFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CollabFooterApplicationCustomizer
  extends BaseApplicationCustomizer<ICollabFooterApplicationCustomizerProperties> {

  private _footerPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    // Call render method for generating the needed html elements
    this._renderPlaceHolders();

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {

    // Handling the header placeholder
    if (!this._footerPlaceholder) {
      this._footerPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._footerPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
      }

      const element: React.ReactElement<ICollabFooterProps> = React.createElement(
        CollabFooter,
        {
        }
      );

      ReactDom.render(element, this._footerPlaceholder.domElement);
    }

  }

  private _onDispose(): void {
    console.log('[CollabFooterApplicationCustomizer._onDispose] Disposed custom bottom placeholder.');
  }
}
