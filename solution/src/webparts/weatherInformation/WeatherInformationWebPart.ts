import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WeatherInformationWebPartStrings';
import WeatherInformation from './components/WeatherInformation';
import { IWeatherInformationProps } from './components/IWeatherInformationProps';

export interface IWeatherInformationWebPartProps {
  description: string;
}

export default class WeatherInformationWebPart extends BaseClientSideWebPart<IWeatherInformationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWeatherInformationProps > = React.createElement(
      WeatherInformation,
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
