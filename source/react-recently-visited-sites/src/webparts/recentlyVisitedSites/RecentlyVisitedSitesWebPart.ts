import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { RecentlyVisitedSites, IRecentlyVisitedSitesProps } from './components';
import { MSGraphClientV3 } from '@microsoft/sp-http';

import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IRecentlyVisitedSitesWebPartProps {
  title: string;
}

export default class RecentlyVisitedSitesWebPart extends BaseClientSideWebPart<IRecentlyVisitedSitesWebPartProps> {
  private graphClient: MSGraphClientV3;
  // theme provider
  private _themeProvider: ThemeProvider;
  // current theme
  private _themeVariant: IReadonlyTheme | undefined;

  public onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.msGraphClientFactory
        .getClient('3')
        .then((client: MSGraphClientV3): void => {
          this.graphClient = client;
          resolve();
        }, err => reject(err));
    });
  }

  public render(): void {
    const element: React.ReactElement<IRecentlyVisitedSitesProps> = React.createElement(
      RecentlyVisitedSites,
      {
        title: this.properties.title,
        graphClient: this.graphClient,
        displayMode: this.displayMode,
        themeVariant: this._themeVariant,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }

  protected _handleThemeChangedEvent = (args: ThemeChangedEventArgs): void => {
    this._themeVariant = args.theme;
    this.render();
  }
}