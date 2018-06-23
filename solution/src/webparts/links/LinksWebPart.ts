import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneHorizontalRule
} from '@microsoft/sp-webpart-base';

import * as strings from 'LinksWebPartStrings';
import Links from './components/Links';
import { ILinksProps } from './components/ILinksProps';
import { ILink, LinkTarget } from './components/ILink';

import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

export interface ILinksWebPartProps {
  collectionData: ILink[];
  groupData: any[];
  title: string;
}

export default class LinksWebPart extends BaseClientSideWebPart<ILinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ILinksProps> = React.createElement(
      Links,
      {
        collectionData: this.properties.collectionData,
        title: this.properties.title,
        displayMode: this.displayMode,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
        fPropertyPaneOpen: this.context.propertyPane.open
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let groups = [];
    if (this.properties.groupData && this.properties.groupData.length > 0) {
      groups = this.properties.groupData.map((group: any) => ({ key: group.title, text: group.title }));
    }

    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyFieldCollectionData("groupData", {
                  key: "groupData",
                  label: strings.groupDataLabel,
                  panelHeader: strings.groupPanelHeader,
                  panelDescription: `${strings.iconInformation} https://developer.microsoft.com/en-us/fabric#/styles/icons`,
                  manageBtnLabel: strings.manageGroupBtn,
                  value: this.properties.groupData,
                  fields: [
                    {
                      id: "title",
                      title: strings.titleField,
                      type: CustomCollectionFieldType.string,
                      required: true
                    }
                  ]
                }),
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: strings.linkDataLabel,
                  panelHeader: strings.linkPanelHeader,
                  manageBtnLabel: strings.manageLinksBtn,
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "title",
                      title: strings.titleField,
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "url",
                      title: strings.urlField,
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "icon",
                      title: strings.iconField,
                      type: CustomCollectionFieldType.fabricIcon
                    },
                    {
                      id: "group",
                      title: strings.groupField,
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: null,
                          text: ""
                        },
                        ...groups
                      ]
                    },
                    {
                      id: "target",
                      title: strings.targetField,
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: LinkTarget.parent,
                          text: strings.targetCurrent
                        },
                        {
                          key: LinkTarget.blank,
                          text: strings.targetNew
                        }
                      ]
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
