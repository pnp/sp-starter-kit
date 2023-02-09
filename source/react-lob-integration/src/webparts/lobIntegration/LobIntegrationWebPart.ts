import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import * as strings from 'LobIntegrationWebPartStrings';
import { ILobIntegrationWebPartProps } from './ILobIntegrationWebPartProps';
import LobIntegration from './components/LobIntegration';
import { ILobIntegrationProps } from './components/ILobIntegrationProps';

export default class LobIntegrationWebPart extends BaseClientSideWebPart<ILobIntegrationWebPartProps> {

  // method to determine if the web part has to be configured
  private needsConfiguration(): boolean {
    // as long as we don't have the configuration settings
    return (!this.properties.applicationUri || !this.properties.serviceUrl);
  }

  public render(): void {
    const element: React.ReactElement<ILobIntegrationProps > = React.createElement(
      LobIntegration,
      {
        applicationUri: this.properties.applicationUri,
        serviceUrl: this.properties.serviceUrl,
        needsConfiguration: this.needsConfiguration(),
        context: this.context,
        configureHandler: () => {
          this.context.propertyPane.open();
        },
        errorHandler: (errorMessage: string) => {
          if (this.displayMode === DisplayMode.Edit) {
            this.context.statusRenderer.renderError(this.domElement, errorMessage);
          } else {
            // nothing to do, if we are not in edit Mode
          }
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('serviceUrl', {
                  label: strings.ServiceUrlFieldLabel
                }),
                PropertyPaneTextField('applicationUri', {
                  label: strings.ApplicationUriFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
