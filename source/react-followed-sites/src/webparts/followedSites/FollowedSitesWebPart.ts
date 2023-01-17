import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneDropdown } from "@microsoft/sp-property-pane";
import FollowedSites from './components/FollowedSites';
import { IFollowedSitesProps } from './components/IFollowedSitesProps';

import { SpStarterKitSharedLibrary, LocaleKeys } from '@starter-kit/shared-library';

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

  private propertyFieldNumber : any;
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

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
            description: SpStarterKitSharedLibrary.getLocale(LocaleKeys.PropertyPaneDescription),
          },
          groups: [
            {
              groupFields: [
                this.propertyFieldNumber("nrOfItems", {
                  key: "nrOfItems",
                  label: SpStarterKitSharedLibrary.getLocale(LocaleKeys.NrOfFollowedItemsLabel),
                  value: this.properties.nrOfItems
                }),
                PropertyPaneDropdown('sortOrder', {
                  label: SpStarterKitSharedLibrary.getLocale(LocaleKeys.SortOrderFollowedItemsLabel),
                  selectedKey: this.properties.sortOrder,
                  options: [
                    {
                      key: SortOrder.default,
                      text: SpStarterKitSharedLibrary.getLocale(LocaleKeys.SortOrderDefaultLabel)
                    },
                    {
                      key: SortOrder.name,
                      text: SpStarterKitSharedLibrary.getLocale(LocaleKeys.SortOrderNameLabel)
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
