import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';

import * as strings from 'RecentlyUsedDocumentsWebPartStrings';
import RecentlyUsedDocuments from './components/RecentlyUsedDocuments';
import { IRecentlyUsedDocumentsProps } from './components/IRecentlyUsedDocumentsProps';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/propertyFields/number';

export interface IRecentlyUsedDocumentsWebPartProps {
  title: string;
  nrOfItems: number;
}

export default class RecentlyUsedDocumentsWebPart extends BaseClientSideWebPart<IRecentlyUsedDocumentsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRecentlyUsedDocumentsProps > = React.createElement(
      RecentlyUsedDocuments,
      {
        title: this.properties.title,
        nrOfItems: this.properties.nrOfItems,
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
                  label: strings.NrOfDocumentsToShow,
                  value: this.properties.nrOfItems,
                  minValue: 1,
                  maxValue: 10
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
