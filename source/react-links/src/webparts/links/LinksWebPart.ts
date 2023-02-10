import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";

import * as strings from 'LinksWebPartStrings';
import Links from './components/Links';
import { ILinksProps } from './components/ILinksProps';
import { ILink, LinkTarget, IGroupData } from './ILink';

export interface ILinksWebPartProps {
  collectionData: ILink[];
  groupData: IGroupData[];
  title: string;
}

export default class LinksWebPart extends BaseClientSideWebPart<ILinksWebPartProps> {

  // Just for suppress the tslint validation of dinamically loading of this field by using loadPropertyPaneResources()
  // tslint:disable-next-line: no-any
  private propertyFieldCollectionData: any;
  // Just for suppress the tslint validation of dinamically loading of this field by using loadPropertyPaneResources()
  // tslint:disable-next-line: no-any
  private customCollectionFieldType: any;

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

  // executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components
    const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import(
      /* webpackChunkName: 'pnp-propcontrols-colldata' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
    );

    this.propertyFieldCollectionData = PropertyFieldCollectionData;
    this.customCollectionFieldType = CustomCollectionFieldType;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let groups: { key: string, text: string }[] = [];
    if (this.properties.groupData && this.properties.groupData.length > 0) {
      groups = this.properties.groupData.map((group: IGroupData) => ({ key: group.title, text: group.title }));
    }

    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                this.propertyFieldCollectionData('groupData', {
                  key: 'groupData',
                  label: strings.groupDataLabel,
                  panelHeader: strings.groupPanelHeader,
                  manageBtnLabel: strings.manageGroupBtn,
                  value: this.properties.groupData,
                  fields: [
                    {
                      id: 'title',
                      title: strings.titleField,
                      type: this.customCollectionFieldType.string,
                      required: true
                    }
                  ]
                }),
                this.propertyFieldCollectionData('collectionData', {
                  key: 'collectionData',
                  label: strings.linkDataLabel,
                  panelHeader: strings.linkPanelHeader,
                  // tslint:disable-next-line:max-line-length
                  panelDescription: `${strings.iconInformation} https://developer.microsoft.com/en-us/fabric#/styles/icons`,
                  manageBtnLabel: strings.manageLinksBtn,
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: 'title',
                      title: strings.titleField,
                      type: this.customCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: 'url',
                      title: strings.urlField,
                      type: this.customCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: 'icon',
                      title: strings.iconField,
                      type: this.customCollectionFieldType.fabricIcon
                    },
                    {
                      id: 'group',
                      title: strings.groupField,
                      type: this.customCollectionFieldType.dropdown,
                      options: [
                        {
                          key: undefined,
                          text: ''
                        },
                        ...groups
                      ]
                    },
                    {
                      id: 'target',
                      title: strings.targetField,
                      type: this.customCollectionFieldType.dropdown,
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
