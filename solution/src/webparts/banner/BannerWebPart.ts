import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  IWebPartPropertiesMetadata
} from '@microsoft/sp-webpart-base';

import * as strings from 'BannerWebPartStrings';
import Banner from './components/Banner';
import { IBannerProps } from './components/IBannerProps';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';

export interface IBannerWebPartProps {
  bannerText: string;
  bannerImage: string;
  bannerLink: string;
  bannerHeight: number;
  fullWidth: boolean;
  useParallax: boolean;
  useParallaxInt: boolean;
}

export default class BannerWebPart extends BaseClientSideWebPart<IBannerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBannerProps> = React.createElement(
      Banner,
      {
        ...this.properties,
        propertyPane: this.context.propertyPane,
        domElement: this.context.domElement,
        useParallaxInt: this.displayMode === DisplayMode.Read && !!this.properties.bannerImage && this.properties.useParallax
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * Set property metadata
   */
  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'bannerText': { isSearchablePlainText: true },
      'bannerImage': { isImageSource: true },
      'bannerLink': { isLink: true }
    };
  }

  /**
   * Field validation
   */
  private _validateImageField(imgVal: string): string {
    if (imgVal) {
      const urlSplit = imgVal.split(".");
      if (urlSplit && urlSplit.length > 0) {
        const extName = urlSplit.pop().toLowerCase();
        if (["jpg", "jpeg", "png", "gif"].indexOf(extName) === -1) {
          return strings.BannerValidationNotImage;
        }
      }
    }
    return "";
  }

  /**
   * Property pane configuration
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BannerConfigName,
              groupFields: [
                PropertyPaneTextField('bannerText', {
                  label: strings.BannerTextField,
                  multiline: true,
                  maxLength: 200,
                  value: this.properties.bannerText
                }),
                PropertyPaneTextField('bannerImage', {
                  label: strings.BannerImageUrlField,
                  onGetErrorMessage: this._validateImageField,
                  value: this.properties.bannerImage
                }),
                PropertyPaneTextField('bannerLink', {
                  label: strings.BannerLinkField,
                  value: this.properties.bannerLink
                }),
                PropertyFieldNumber('bannerHeight', {
                  key: "bannerHeight",
                  label: strings.BannerNumberField,
                  value: this.properties.bannerHeight,
                  maxValue: 500,
                  minValue: 100
                }),
                PropertyPaneToggle('useParallax', {
                  label: strings.BannerParallaxField,
                  checked: this.properties.useParallax
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
