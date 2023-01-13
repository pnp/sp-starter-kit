import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import * as strings from 'PersonalEmailWebPartStrings';
import { PersonalEmail, IPersonalEmailProps } from './components';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import {
  IReadonlyTheme,
  ThemeChangedEventArgs,
  ThemeProvider
} from "@microsoft/sp-component-base";

export interface IPersonalEmailWebPartProps {
  title: string;
  nrOfMessages: number;
  showInboxOnly: boolean;
}

export default class PersonalEmailWebPart extends BaseClientSideWebPart<IPersonalEmailWebPartProps> {
  private graphClient: MSGraphClientV3;
  private propertyFieldNumber: any;
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  public onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.msGraphClientFactory
        .getClient('3')
        .then((client: MSGraphClientV3): void => {
          this.graphClient = client;
          resolve();
        }, err => reject(err));

        this._themeProvider = this.context.serviceScope.consume(
          ThemeProvider.serviceKey
        );
        // If it exists, get the theme variant
        this._themeVariant = this._themeProvider.tryGetTheme();
        // Register a handler to be notified if the theme variant changes
        this._themeProvider.themeChangedEvent.add(
          this,
          this._handleThemeChangedEvent
        );
    });
  }

  public render(): void {
    const element: React.ReactElement<IPersonalEmailProps> = React.createElement(
      PersonalEmail,
      {
        title: this.properties.title,
        nrOfMessages: this.properties.nrOfMessages,
        showInboxOnly: this.properties.showInboxOnly,
        // pass the current display mode to determine if the title should be
        // editable or not
        displayMode: this.displayMode,
        themeVariant: this._themeVariant,
        // pass the reference to the MSGraphClient
        graphClient: this.graphClient,
        // handle updated web part title
        updateProperty: (value: string): void => {
          // store the new title in the title web part property
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
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
                this.propertyFieldNumber("nrOfMessages", {
                  key: "nrOfMessages",
                  label: strings.NrOfMessagesToShow,
                  value: this.properties.nrOfMessages,
                  minValue: 1,
                  maxValue: 10
                }),
                PropertyFieldToggleWithCallout('showInboxOnly', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'showInboxOnly',
                  label: strings.ShowInboxOnly,
                  calloutContent: React.createElement('p', {}, strings.ShowInboxOnlyCallout),
                  checked: this.properties.showInboxOnly
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;

    this.render();
  }
}
