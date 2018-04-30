import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalEmailWebPartStrings';
import { PersonalEmail, IPersonalEmailProps } from './components';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import { MSGraphClient } from '@microsoft/sp-client-preview';

export interface IPersonalEmailWebPartProps {
  title: string;
  nrOfMessages: number;
}

export default class PersonalEmailWebPart extends BaseClientSideWebPart<IPersonalEmailWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalEmailProps> = React.createElement(
      PersonalEmail,
      {
        title: this.properties.title,
        nrOfMessages: this.properties.nrOfMessages,
        // pass the current display mode to determine if the title should be
        // editable or not
        displayMode: this.displayMode,
        // pass the reference to the MSGraphClient
        graphClient: this.context.serviceScope.consume(MSGraphClient.serviceKey),
        // handle updated web part title
        updateProperty: (value: string): void => {
          // store the new title in the title web part property
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
                PropertyFieldNumber("nrOfMessages", {
                  key: "nrOfMessages",
                  label: strings.NrOfMessagesToShow,
                  value: this.properties.nrOfMessages,
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
