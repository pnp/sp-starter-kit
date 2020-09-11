import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'TilesWebPartStrings';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";

import { Tiles, ITilesProps, ITileInfo, LinkTarget } from './components';

export interface ITilesWebPartProps {
  collectionData: ITileInfo[];
  tileHeight: number;
  title: string;
}

export default class TilesWebPart extends BaseClientSideWebPart<ITilesWebPartProps> {
  private propertyFieldNumber;
  private propertyFieldCollectionData;
  private customCollectionFieldType;

  public render(): void {
    const element: React.ReactElement<ITilesProps> = React.createElement(
      Tiles,
      {
        title: this.properties.title,
        tileHeight: this.properties.tileHeight,
        collectionData: this.properties.collectionData,
        displayMode: this.displayMode,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
        fPropertyPaneOpen: this.context.propertyPane.open
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  //executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components

    const { PropertyFieldNumber } = await import (
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/propertyFields/number'
    );
    const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import (
      /* webpackChunkName: 'pnp-propcontrols-colldata' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
    );

    this.propertyFieldNumber = PropertyFieldNumber;
    this.propertyFieldCollectionData = PropertyFieldCollectionData;
    this.customCollectionFieldType = CustomCollectionFieldType;
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
                this.propertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: strings.tilesDataLabel,
                  panelHeader: strings.tilesPanelHeader,
                  panelDescription: `${strings.iconInformation} https://developer.microsoft.com/en-us/fabric#/styles/icons`,
                  manageBtnLabel: strings.tilesManageBtn,
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "title",
                      title: strings.titleField,
                      type: this.customCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "description",
                      title: strings.descriptionField,
                      type: this.customCollectionFieldType.string,
                      required: false
                    },
                    {
                      id: "url",
                      title: strings.urlField,
                      type: this.customCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "icon",
                      title: strings.iconField,
                      type: this.customCollectionFieldType.fabricIcon,
                      required: true
                    },
                    {
                      id: "target",
                      title: strings.targetField,
                      type: this.customCollectionFieldType.dropdown,
                      options: [
                        {
                          key: LinkTarget.parent,
                          text: strings.targetCurrent
                        },
                        {
                          key: LinkTarget.blank,
                          text: strings.targetNew
                        }
                      ]
                    }
                  ]
                }),
                this.propertyFieldNumber('tileHeight', {
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
