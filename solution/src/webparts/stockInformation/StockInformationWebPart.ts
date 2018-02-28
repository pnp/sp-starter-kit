import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'StockInformationWebPartStrings';
import StockInformation from './components/StockInformation';
import { IStockInformationProps } from './components/IStockInformationProps';

export interface IStockInformationWebPartProps {
  description: string;
}

export default class StockInformationWebPart extends BaseClientSideWebPart<IStockInformationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IStockInformationProps > = React.createElement(
      StockInformation,
      {
        description: this.properties.description
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
