import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle } from "@microsoft/sp-property-pane";

import * as strings from 'PersonalTasksWebPartStrings';
import { PersonalTasks, IPersonalTasksProps } from './components';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IPersonalTasksWebPartProps {
  title: string;
  showCompleted: boolean;
}

export default class PersonalTasksWebPart extends BaseClientSideWebPart<IPersonalTasksWebPartProps> {
  private graphClient: MSGraphClient;

  public onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient): void => {
          this.graphClient = client;
          resolve();
        }, err => reject(err));
    });
  }

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
        graphClient: this.graphClient,
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
