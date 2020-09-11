import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup } from "@microsoft/sp-property-pane";

import { DisplayMode } from '@microsoft/sp-core-library';

import * as strings from 'LobIntegrationWebPartStrings';
import LobIntegration from './components/LobIntegration';
import { ILobIntegrationProps } from './components/ILobIntegrationProps';
import { ILobIntegrationWebPartProps, serviceType } from './ILobIntegrationWebPartProps';

export default class LobIntegrationWebPart extends BaseClientSideWebPart<ILobIntegrationWebPartProps> {

  // method to determine if the web part has to be configured
  private needsConfiguration(): boolean {
    // as long as we don't have the configuration settings
    return (!this.properties.webapiUri && !this.properties.functionUri) ||
      !this.properties.serviceType;
  }

  public render(): void {
    const element: React.ReactElement<ILobIntegrationProps > = React.createElement(
      LobIntegration,
      {
        webapiUri: this.properties.webapiUri,
        functionUri: this.properties.functionUri,
        serviceType: this.properties.serviceType,
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

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // // method to disable reactive properties in the property pane
  // protected get disableReactivePropertyChanges(): boolean {
  //   return true;
  // }

  // // method to refresh any error after properties configuration
  // protected onAfterPropertyPaneChangesApplied(): void {
  //   this.context.statusRenderer.clearError(this.domElement);
  // }

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
                PropertyPaneTextField('webapiUri', {
                  label: strings.WebApiUriFieldLabel
                }),
                PropertyPaneTextField('functionUri', {
                  label: strings.FunctionUriFieldLabel
                }),
                PropertyPaneChoiceGroup('serviceType', {
                  label: strings.ServiceTypeFieldLabel,
                  options: [
                    { key: 1, text: "ASP.NET REST API"},
                    { key: 2, text: "Azure Function"},
                  ]
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
