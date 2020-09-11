import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";

import * as strings from 'WorldTimeWebPartStrings';
import WorldTime from './components/WorldTime';
import { IWorldTimeProps } from './components/IWorldTimeProps';

// import additional controls/components
import { IWorldTimeWebPartProps } from './IWorldTimeWebPartProps';
import * as timeZones from './components/Timezones';

export default class WorldTimeWebPart extends BaseClientSideWebPart<IWorldTimeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWorldTimeProps> = React.createElement(
      WorldTime,
      {
        description: this.properties.description,
        timeZoneOffset: this.properties.timeZoneOffset,
        errorHandler: (errorMessage: string) => {
          this.context.statusRenderer.renderError(this.domElement, errorMessage);
        }
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private getTimeZones(): Array<IPropertyPaneDropdownOption> {
    var result: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();

    for (let tz of timeZones.TimeZones.zones) {
      result.push({ key: tz.id, text: tz.displayName});
    }

    return(result);
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
                }),
                PropertyPaneDropdown('timeZoneOffset', {
                  label: strings.TimeZoneOffsetFieldLabel,
                  options: this.getTimeZones()
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
