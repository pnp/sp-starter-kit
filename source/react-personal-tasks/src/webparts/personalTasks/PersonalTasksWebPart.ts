import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneCheckbox, PropertyPaneDropdown } from "@microsoft/sp-property-pane";

import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PersonalTasksWebPartStrings';
import { PersonalTasks } from './components/PersonalTasks';
import { IPersonalTasksProps } from './components/IPersonalTasksProps';

// import the providers at the top of the page
import { Providers, SharePointProvider } from '@microsoft/mgt-spfx';
import { PropertyPaneHorizontalRule } from '@microsoft/sp-property-pane';

import { TasksSource } from '@microsoft/mgt-spfx';

export interface IPersonalTasksWebPartProps {
  /**
   * The web part title
   */
  webPartTitle: string;
  /**
   * Tasks' data source - Planner or ToDo
   */
  dataSource: TasksSource;
  /**
   * Flag if editing is allowed. Default is false.
   */
  allowEditing: boolean;
  /**
   * Flag if the header on MS Graph Toolkit Personal Tasks component should be hidden.
   * The header contains a filter and "Add" button.
   * Default is true.
   */
  hideHeader: boolean;
  /**
   * A string id to set the initially displayed planner or folder to the provided ID.
   */
  initialId: string;
  /**
   * A string id to set the initially displayed bucket (Planner Data-Source Only) to the provided ID.
   */
  initialBucketId: string;
  /**
   * A string id to lock the tasks interface to the provided planner or folder ID.
   */
  targetId: string;
  /**
   * A string ID to lock the tasks interface to the provided bucket ID (Planner Data-Source Only).
   */
  targetBucketId: string;
}

export default class PersonalTasksWebPart extends BaseClientSideWebPart<IPersonalTasksWebPartProps> {

  // theme provider
  private _themeProvider: ThemeProvider;
  // current theme
  private _themeVariant: IReadonlyTheme | undefined;

  public async onInit(): Promise<void> {
    // initializing authentication provider for MS Graph Toolkit
    Providers.globalProvider = new SharePointProvider(this.context);

    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IPersonalTasksProps> = React.createElement(
      PersonalTasks,
      {
        onTitleChange: title => { this.properties.webPartTitle = title; },
        displayMode: this.displayMode,
        themeVariant: this._themeVariant,
        ...this.properties
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneDropdown('dataSource', {
                  label: strings.DataSourcePropertyLabel,
                  options: [{
                    key: 'planner',
                    text: strings.DataSourcePlanner
                  }, {
                    key: 'todo',
                    text: strings.DataSourceToDo
                  }]
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneCheckbox('allowEditing', {
                  text: strings.AllowEditingPropertyLabel
                }),
                PropertyPaneCheckbox('hideHeader', {
                  text: strings.HideHeaderPropertyLabel
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneTextField('initialId', {
                  label: strings.InitialId
                }),
                PropertyPaneTextField('initialBucketId', {
                  label: strings.InitialBucketId,
                  disabled: this.properties.dataSource === TasksSource.todo
                }),
                PropertyPaneTextField('targetId', {
                  label: strings.TargetId
                }),
                PropertyPaneTextField('targetBucketId', {
                  label: strings.TargetBucketId,
                  disabled: this.properties.dataSource === TasksSource.todo
                }),
              ]
            }
          ]
        }
      ]
    };
  }

  protected _handleThemeChangedEvent = (args: ThemeChangedEventArgs): void => {
    this._themeVariant = args.theme;
    this.render();
  }
}
