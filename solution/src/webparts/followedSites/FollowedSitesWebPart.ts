import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown } from "@microsoft/sp-property-pane";

import * as strings from 'FollowedSitesWebPartStrings';
import FollowedSites from './components/FollowedSites';
import { IFollowedSitesProps } from './components/IFollowedSitesProps';

export interface IFollowedSitesWebPartProps {
  title: string;
  nrOfItems: number;
  sortOrder: number;
}

export enum SortOrder {
  default = 1,
  name
}

export default class FollowedSitesWebPart extends BaseClientSideWebPart<IFollowedSitesWebPartProps> {

  private propertyFieldNumber;

  public render(): void {
    const element: React.ReactElement<IFollowedSitesProps> = React.createElement(
      FollowedSites,
      {
        title: this.properties.title,
        nrOfItems: this.properties.nrOfItems,
        sortOrder: this.properties.sortOrder,
        context: this.context,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
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

    const { PropertyFieldNumber } = await import(
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/propertyFields/number'
    );

    this.propertyFieldNumber = PropertyFieldNumber;
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
                this.propertyFieldNumber("nrOfItems", {
                  key: "nrOfItems",
                  label: strings.NrOfFollowedItemsLabel,
                  value: this.properties.nrOfItems
                }),
                PropertyPaneDropdown('sortOrder', {
                  label: strings.SortOrderFollowedItemsLabel,
                  selectedKey: this.properties.sortOrder,
                  options: [
                    {
                      key: SortOrder.default,
                      text: strings.SortOrderDefaultLabel
                    },
                    {
                      key: SortOrder.name,
                      text: strings.SortOrderNameLabel
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
}
