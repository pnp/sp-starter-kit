import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

import * as strings from 'FollowedSitesWebPartStrings';
import FollowedSites from './components/FollowedSites';
import { IFollowedSitesProps } from './components/IFollowedSitesProps';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';

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

  public render(): void {
    const element: React.ReactElement<IFollowedSitesProps > = React.createElement(
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
                PropertyFieldNumber("nrOfItems", {
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
