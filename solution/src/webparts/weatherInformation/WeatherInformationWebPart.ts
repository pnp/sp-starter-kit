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
        needsConfiguration: this._needsConfiguration(),
        location: this.properties.location,
        unit: this.properties.unit,
        httpClient: this.context.httpClient,
        configureHandler: this._onConfigure,
        errorHandler: this._onError
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
                  onGetErrorMessage: this._validateLocation.bind(this)
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

  /**
   * Set the web part property pane to non-reactive, to avoid excessive retrieval
   * of data from the third party API when typing the name of the location for
   * which to retrieve weather information
   */
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    // after one or more web part properties have been changed
    // clear any error messages displayed in the web part
    this.context.statusRenderer.clearError(this.domElement);
  }

  /**
   * Handles clicking the Configure button in the placeholder
   */
  private _onConfigure = (): void => {
    // open the property pane to let the user configure the web part
    this.context.propertyPane.open();
  }

  /**
   * Handles any error that occurred in the component
   */
  private _onError = (errorMessage: string): void => {
    // render the message for the error that occurred in the web part
    this.context.statusRenderer.renderError(this.domElement, errorMessage);
  }

  /**
   * Verify if the specified location is valid
   * @param value Location specified in the web part properties
   */
  private _validateLocation(value: string): string {
    if (value === null ||
      value.trim().length === 0) {
      return strings.LocationNotSpecifiedError;
    }

    if (value.indexOf('"') > -1) {
      return strings.LocationDoubleQuoteNotAllowed;
    }

    return '';
  }

  /**
   * Check if the web part has been configured
   */
  private _needsConfiguration(): boolean {
    return !this.properties.location ||
      this.properties.location.length === 0 ||
      !this.properties.unit ||
      this.properties.unit.length === 0;
  }
}
