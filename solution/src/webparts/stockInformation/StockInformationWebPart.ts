import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';

import * as strings from 'StockInformationWebPartStrings';

// import supporting types
import StockInformation from './components/StockInformation';
import { IStockInformationProps } from './components/IStockInformationProps';
import { IStockInformationWebPartProps } from './IStockInformationWebPartProps';
import { sp } from "@pnp/sp";

// import additional controls/components
export default class StockInformationWebPart extends BaseClientSideWebPart<IStockInformationWebPartProps> {

  public async onInit(): Promise<void> {

    return super.onInit().then(_ => {

      // init sp pnpjs library
      sp.setup({
        spfxContext: this.context
      });

    });
  }

  public async render(): Promise<void> {

    // get the tenant property for the API Key
    const storageEntity : any = await sp.web.getStorageEntity("PnP-Portal-AlphaVantage-API-Key");

    // variable to hold the API Key value
    const apiKey: string = storageEntity.Value;

    const element: React.ReactElement<IStockInformationProps > = React.createElement(
      StockInformation,
      {
        stockSymbol: this.properties.stockSymbol,
        autoRefresh: this.properties.autoRefresh,
        apiKey: apiKey,
        needsConfiguration: this.needsConfiguration(),
        httpClient: this.context.httpClient,
        configureHandler: () => {
          this.context.propertyPane.open();
        },
        errorHandler: (errorMessage: string) => {
          this.context.statusRenderer.renderError(this.domElement, errorMessage);
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
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('stockSymbol', {
                  label: strings.StockSymbolFieldLabel
                }),
                PropertyPaneCheckbox('autoRefresh', {
                  text: strings.AutoRefreshFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    this.context.statusRenderer.clearError(this.domElement);
  }

  private needsConfiguration(): boolean {
    // as long as we don't have the stock symbol, we need configuration
    return !this.properties.stockSymbol ||
      this.properties.stockSymbol.length === 0;
  }}
