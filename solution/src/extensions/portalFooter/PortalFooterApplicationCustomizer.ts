import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'PortalFooterApplicationCustomizerStrings';
import { IPortalFooterProps, PortalFooter } from './components/PortalFooter';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPortalFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PortalFooterApplicationCustomizer
  extends BaseApplicationCustomizer<IPortalFooterApplicationCustomizerProperties> {
  private static _bottomPlaceholder?: PlaceholderContent;
  private static readonly _storageKey: string = 'pnpTabPage_HomePage';

  private _handleDispose(): void {
  }

  @override
  public onInit(): Promise<void> {
    // add handler to he page navigated event which occurs both when
    // the user opens and leaves the page
    this.context.application.navigatedEvent.add(this, this._render);

    return Promise.resolve();
  }

  private _render(): void {
    // check if the application customizer has already been rendered
    if (!PortalFooterApplicationCustomizer._bottomPlaceholder) {
      // create a DOM element in the top placeholder for the application customizer
      // to render
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
      }
    );

    // render the UI using a React component
    ReactDom.render(element, PortalFooterApplicationCustomizer._bottomPlaceholder.domElement);
  }
}
