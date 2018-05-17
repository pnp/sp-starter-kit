import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/propertyFields/number';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneHorizontalRule
} from '@microsoft/sp-webpart-base';

import * as strings from 'TilesWebPartStrings';
import { Tiles, ITilesProps } from './components';
import { TenantPropertyHelper } from './helpers';

export interface ITilesWebPartProps {
  title: string;
  listUrl: string;
  tileHeight: number;
}

const PROPERTY_NAME_PREFIX = "PnPTilesList";

export default class TilesWebPart extends BaseClientSideWebPart<ITilesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITilesProps> = React.createElement(
      Tiles,
      {
        title: this.properties.title,
        listUrl: this.properties.listUrl,
        tileHeight: this.properties.tileHeight,
        context: this.context,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // Fetch the list location
    this.properties.listUrl = await TenantPropertyHelper.getPropertyValue(this.context, `${PROPERTY_NAME_PREFIX}-${this.context.pageContext.legacyPageContext.departmentId}`);
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
              groupFields: [
                PropertyPaneLabel('', {
                  text: strings.TilesListDescription
                }),
                PropertyPaneLink('', {
                  text: this.properties.listUrl,
                  target: "_blank",
                  href: this.properties.listUrl
                }),
                PropertyPaneHorizontalRule(),
                PropertyFieldNumber('tileHeight', {
                  key: "tileHeight",
                  label: strings.TileHeight,
                  value: this.properties.tileHeight
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
