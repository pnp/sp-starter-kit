import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalEmailWebPartStrings';
import PersonalEmail from './components/PersonalEmail';
import { IPersonalEmailProps } from './components/IPersonalEmailProps';

export interface IPersonalEmailWebPartProps {
  description: string;
}

export default class PersonalEmailWebPart extends BaseClientSideWebPart<IPersonalEmailWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalEmailProps > = React.createElement(
      PersonalEmail,
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
