import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalTasksWebPartStrings';
import { PersonalTasks, IPersonalTasksProps } from './components';
import { MSGraphClient } from '@microsoft/sp-client-preview';

export interface IPersonalTasksWebPartProps {
  title: string;
  showCompleted: boolean;
}

export default class PersonalTasksWebPart extends BaseClientSideWebPart<IPersonalTasksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalTasksProps> = React.createElement(
      PersonalTasks,
      {
        title: this.properties.title,
        showCompleted: this.properties.showCompleted,
        // pass the current display mode to determine if the title should be
        // editable or not
        displayMode: this.displayMode,
        // pass the reference to the MSGraphClient
        graphClient: this.context.serviceScope.consume(MSGraphClient.serviceKey),
        // handle updated web part title
        updateProperty: (value: string): void => {
          // store the new title in the title web part property
          this.properties.title = value;
        },
        userName: this.context.pageContext.user.loginName
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
                PropertyPaneToggle('showCompleted', {
                  label: strings.ShowCompleted
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
