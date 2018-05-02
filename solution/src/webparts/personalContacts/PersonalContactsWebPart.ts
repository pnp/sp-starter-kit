import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as strings from 'PersonalContactsWebPartStrings';
import { PersonalContacts, IPersonalContactsProps } from './components/PersonalContacts';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import { MSGraphClient } from '@microsoft/sp-client-preview';

export interface IPersonalContactsWebPartProps {
  title: string;
  nrOfContacts: number;
}

export default class PersonalContactsWebPart extends BaseClientSideWebPart<IPersonalContactsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalContactsProps> = React.createElement(
      PersonalContacts,
      {
        title: this.properties.title,
        nrOfContacts: this.properties.nrOfContacts,
        // pass the reference to the MSGraphClient
        graphClient: this.context.serviceScope.consume(MSGraphClient.serviceKey),
        // pass the current display mode to determine if the title should be
        // editable or not
        displayMode: this.displayMode,
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
                PropertyFieldNumber("nrOfContacts", {
                  key: "nrOfContacts",
                  label: strings.NrOfContactsToShow,
                  value: this.properties.nrOfContacts,
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
