import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SiteInformationWebPartStrings';
import SiteInformation from './components/SiteInformation';
import { ISiteInformationProps } from './components/ISiteInformationProps';

export interface ISiteInformationWebPartProps {
  description: string;
}

export default class SiteInformationWebPart extends BaseClientSideWebPart<ISiteInformationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISiteInformationProps > = React.createElement(
      SiteInformation,
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
