import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle } from "@microsoft/sp-property-pane";

import * as strings from 'BannerWebPartStrings';
import { Banner, IBannerProps } from './components';

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

  private propertyFieldNumber;

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

  //executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components

    const { PropertyFieldNumber } = await import(
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/propertyFields/number'
    );

    this.propertyFieldNumber = PropertyFieldNumber;
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
                this.propertyFieldNumber('bannerHeight', {
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
