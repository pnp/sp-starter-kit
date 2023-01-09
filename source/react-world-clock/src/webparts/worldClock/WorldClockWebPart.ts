import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneDropdown, IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";

import * as strings from 'WorldClockWebPartStrings';
import WorldClock from './components/WorldClock';
import { IWorldClockProps } from './components/IWorldClockProps';

import {IWorldClockWebPartProps} from './IWorldClockWebPartProps';
import * as timeZones from './components/Timezones';

export default class WorldClockWebPart extends BaseClientSideWebPart<IWorldClockWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWorldClockProps > = React.createElement(
      WorldClock,
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

  // protected onDispose(): void {
  //   ReactDom.unmountComponentAtNode(this.domElement);
  // }

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

  private getTimeZones(): Array<IPropertyPaneDropdownOption> {
    const result: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();

    for (const tz of timeZones.TimeZones.zones) {
      result.push({ key: tz.id, text: tz.displayName});
    }

    return(result);
  }
}
