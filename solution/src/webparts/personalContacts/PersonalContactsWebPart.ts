import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';
import * as strings from 'PersonalContactsWebPartStrings';
import { PersonalContacts, IPersonalContactsProps } from './components/PersonalContacts';
import { MSGraphClient } from '@microsoft/sp-http';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IPersonalContactsWebPartProps {
  title: string;
  nrOfContacts: number;
}

export default class PersonalContactsWebPart extends BaseClientSideWebPart<IPersonalContactsWebPartProps> {
  private graphClient: MSGraphClient;
  private propertyFieldNumber;
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  
  public onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._themeVariant = this._themeProvider.tryGetTheme();
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient): void => {
          this.graphClient = client;
          resolve();
        }, err => reject(err));
    });
  }

  public render(): void {
    const element: React.ReactElement<IPersonalContactsProps> = React.createElement(
      PersonalContacts,
      {
        title: this.properties.title,
        themeVariant: this._themeVariant,
        nrOfContacts: this.properties.nrOfContacts,
        // pass the reference to the MSGraphClient
        graphClient: this.graphClient,
        // pass the current display mode to determine if the title should be
        // editable or not
        displayMode: this.displayMode,
        // handle updated web part title
        updateProperty: (value: string): void => {
          // store the new title in the title web part property
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  //executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components

    const { PropertyFieldNumber } = await import(
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/propertyFields/number'
    );

    this.propertyFieldNumber = PropertyFieldNumber;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                this.propertyFieldNumber("nrOfContacts", {
                  key: "nrOfContacts",
                  label: strings.NrOfContactsToShow,
                  value: this.properties.nrOfContacts,
                  minValue: 1,
                  maxValue: 10
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
