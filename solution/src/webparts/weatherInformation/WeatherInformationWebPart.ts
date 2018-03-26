import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-webpart-base';

import * as strings from 'WeatherInformationWebPartStrings';
import WeatherInformation from './components/WeatherInformation';
import { IWeatherInformationProps } from './components/IWeatherInformationProps';

export interface IWeatherInformationWebPartProps {
  location: string;
  unit: string;
}

export default class WeatherInformationWebPart extends BaseClientSideWebPart<IWeatherInformationWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IWeatherInformationProps> = React.createElement(
      WeatherInformation,
      {
        needsConfiguration: this.needsConfiguration(),
        location: this.properties.location,
        unit: this.properties.unit,
        httpClient: this.context.httpClient,
        configureHandler: this.onConfigure.bind(this),
        errorHandler: this.onError.bind(this)
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
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('location', {
                  label: strings.LocationFieldLabel,
                  onGetErrorMessage: this.validateLocation.bind(this)
                }),
                PropertyPaneChoiceGroup('unit', {
                  label: strings.UnitFieldLabel,
                  options: [
                    {
                      text: strings.UnitFieldCelsius,
                      key: 'c'
                    },
                    {
                      text: strings.UnitFieldFahrenheit,
                      key: 'f'
                    }
                  ]
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

  private onConfigure(): void {
    this.context.propertyPane.open();
  }

  private onError(errorMessage: string): void {
    this.context.statusRenderer.renderError(this.domElement, errorMessage);
  }

  private validateLocation(value: string): string {
    if (value === null ||
      value.trim().length === 0) {
      return 'Specify a location';
    }

    if (value.indexOf('"') > -1) {
      return '" (double quote) is not allowed in the location name';
    }

    return '';
  }

  private needsConfiguration(): boolean {
    return !this.properties.location ||
      this.properties.location.length === 0 ||
      !this.properties.unit ||
      this.properties.unit.length === 0;
  }
}
