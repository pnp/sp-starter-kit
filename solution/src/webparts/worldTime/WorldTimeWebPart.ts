import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WorldTimeWebPartStrings';
import WorldTime from './components/WorldTime';
import { IWorldTimeProps } from './components/IWorldTimeProps';

export interface IWorldTimeWebPartProps {
  description: string;
}

export default class WorldTimeWebPart extends BaseClientSideWebPart<IWorldTimeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWorldTimeProps > = React.createElement(
      WorldTime,
      {
        description: this.properties.description
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
