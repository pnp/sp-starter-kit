import * as React from 'react';
import * as ReactDom from 'react-dom';

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import * as strings from 'CollaborationFooterApplicationCustomizerStrings';

import CollabFooter from './components/CollabFooter';
import { ICollabFooterProps } from './components/ICollabFooterProps';
import { ICollabFooterEditResult } from './components/ICollabFooterEditResult';

// import additional controls/components
import { ContextualMenuItemType, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import SPTaxonomyService from '../../services/SPTaxonomyService';
import {ITerm } from '../../services/SPTaxonomyTypes';
import SPUserProfileService from '../../services/SPUserProfileService';
import MyLinksDialog from './components/myLinks/MyLinksDialog';
import IMyLink from './components/myLinks/IMyLink';

const LOG_SOURCE: string = 'CollaborationFooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICollaborationFooterApplicationCustomizerProperties {
   // the Taxonomy Term Set that stores the shared menu items
   sourceTermSet: string;
   // the UPS property to store the MyLinks items
   personalItemsStorageProperty: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CollaborationFooterApplicationCustomizer
  extends BaseApplicationCustomizer<ICollaborationFooterApplicationCustomizerProperties> {

    private _footerPlaceholder: PlaceholderContent | undefined;
    private _myLinks: IMyLink[];
    private _myLinksMenuItems: IContextualMenuItem[];

    @override
    public async onInit(): Promise<void> {
      Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

      let sourceTermSet: string = this.properties.sourceTermSet;
      let personalItemsStorageProperty: string = this.properties.personalItemsStorageProperty;
      if (!sourceTermSet || !personalItemsStorageProperty) {
        console.log('Provide valid properties for CollabFooterApplicationCustomizer!');
      }

      // call render method for generating the needed html elements
      return(await this._renderPlaceHolders());
    }

    private async getMenuItems(): Promise<IContextualMenuItem[]> {

      // get the list of menu items from the Taxonomy
      const svc: SPTaxonomyService = new SPTaxonomyService(this.context);
      const terms: ITerm[] = await svc.getTermsFromTermSet(this.properties.sourceTermSet);

      // map the taxonomy items to the menu items
      const sharedMenuItems: IContextualMenuItem[] = terms.map((i) => {
        return(this.projectTermToMenuItem(i, ContextualMenuItemType.Header));
      });

      // prepare the result
      let result: IContextualMenuItem[] = sharedMenuItems;

      // get the list of personal items from the User Profile Service
      let upsService: SPUserProfileService = new SPUserProfileService(this.context);
      let myLinksJson: any = await upsService.getUserProfileProperty(this.properties.personalItemsStorageProperty);

      if (myLinksJson != null) {
        if (myLinksJson.length > 0) {
          this._myLinks = JSON.parse(myLinksJson) as IMyLink[];

          // map the taxonomy items to the menu items
          this._myLinksMenuItems = this._myLinks.map((i) => {
            return(this.projectMyLinkToMenuItem(i, ContextualMenuItemType.Normal));
          });
        } else {
          // if there are no personal items for my links, just provide an empty array that can be customized
          this._myLinks = [];
          this._myLinksMenuItems = [];
        }
      }

      return(result);
    }

    // projects a Taxonomy term into an object of type IContextualMenuItem for the CommandBar
    private projectTermToMenuItem(menuItem: ITerm, itemType: ContextualMenuItemType): IContextualMenuItem {
      return({
        key: menuItem.Id,
        name: menuItem.Name,
        itemType: itemType,
        iconProps: {
          iconName: (menuItem.LocalCustomProperties["PnP-CollabFooter-Icon"] !== undefined ?
            menuItem.LocalCustomProperties["PnP-CollabFooter-Icon"]
            : null)
        },
        href: menuItem.Terms.length === 0 ?
            (menuItem.LocalCustomProperties["_Sys_Nav_SimpleLinkUrl"] !== undefined ?
                menuItem.LocalCustomProperties["_Sys_Nav_SimpleLinkUrl"]
                : null)
            : null,
        subMenuProps: menuItem.Terms.length > 0 ?
            { items : menuItem.Terms.map((i) => { return(this.projectTermToMenuItem(i, ContextualMenuItemType.Normal)); }) }
            : null,
        isSubMenu: itemType !== ContextualMenuItemType.Header,
      });
    }

    // projects a personal link item into an object of type IContextualMenuItem for the CommandBar
    private projectMyLinkToMenuItem(menuItem: IMyLink, itemType: ContextualMenuItemType): IContextualMenuItem {
      return({
        key: menuItem.title,
        name: menuItem.title,
        itemType: itemType,
        href: menuItem.url,
        subMenuProps: null,
        isSubMenu: itemType !== ContextualMenuItemType.Header,
      });
    }

    private _editMyLinks = async (): Promise<ICollabFooterEditResult> => {

      let result: ICollabFooterEditResult = {
        editResult: null,
        myLinks: null,
      };

      const myLinksDialog: MyLinksDialog = new MyLinksDialog(this._myLinks);
      await myLinksDialog.show();

      // update the local list of links
      let resultingLinks: IMyLink[] = myLinksDialog.links;

      if (this._myLinks !== resultingLinks) {
        this._myLinks = resultingLinks;

        // map the taxonomy items to the menu items
        this._myLinksMenuItems = this._myLinks.map((i) => {
          return(this.projectMyLinkToMenuItem(i, ContextualMenuItemType.Normal));
        });

        // update the result
        result.myLinks = this._myLinksMenuItems;

        // save the personal links in the UPS, if there are any updates
        let upsService: SPUserProfileService = new SPUserProfileService(this.context);
        result.editResult = await upsService.setUserProfileProperty(this.properties.personalItemsStorageProperty,
          'String',
          JSON.stringify(this._myLinks));
      }

      return (result);
    }

    private async _renderPlaceHolders(): Promise<void> {

      // Handling the header placeholder
      if (!this._footerPlaceholder) {
        this._footerPlaceholder =
          this.context.placeholderProvider.tryCreateContent(
            PlaceholderName.Bottom,
            { onDispose: this._onDispose });

        // The extension should not assume that the expected placeholder is available.
        if (!this._footerPlaceholder) {
          console.error('The expected placeholder (Bottom) was not found.');
          return;
        }

        const menuItems: IContextualMenuItem[] = await this.getMenuItems();

        const element: React.ReactElement<ICollabFooterProps> = React.createElement(
          CollabFooter,
          {
            sharedLinks: menuItems,
            myLinks: this._myLinksMenuItems,
            editMyLinks: this._editMyLinks
          }
        );

        ReactDom.render(element, this._footerPlaceholder.domElement);
      }
    }

    private _onDispose(): void {
      console.log('[CollabFooterApplicationCustomizer._onDispose] Disposed custom bottom placeholder.');
    }
}
