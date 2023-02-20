import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

import * as strings from 'RedirectApplicationCustomizerStrings';
import { IRedirectApplicationCustomizerProperties } from './IRedirectApplicationCustomizerProperties';
import { IRedirection } from './IRedirection';
import { IListEnsureResult, SPFI, spfi, SPFx } from '@pnp/sp/presets/all';
import { UrlFieldFormatType, IFieldAddResult, IField } from "@pnp/sp/fields";

const LOG_SOURCE: string = 'RedirectApplicationCustomizer';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class RedirectApplicationCustomizer
  extends BaseApplicationCustomizer<IRedirectApplicationCustomizerProperties> {

  private readonly FIELD_INTERNALNAME_SOURCEURL: string = 'PnPSourceUrl';
  private readonly FIELD_INTERNALNAME_DESTINATIONURL: string = 'PnPDestinationUrl';
  private readonly FIELD_INTERNALNAME_REDIRECTIONENABLED: string = 'PnPRedirectionEnabled';
  private _sp : SPFI;
  // private _web: IWeb;

  @override
  public async onInit(): Promise<void> {
    await super.onInit();

    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // ensure to have proper settings
    if (!this.properties || !this.properties.redirectionsListTitle) {
      Log.info(LOG_SOURCE, 'No properties were provided');
      return;
    }

    this._sp = spfi().using(SPFx(this.context));

    // read the server relative URL of the current page from Legacy Page Context
    const currentPageRelativeUrl: string = this.context.pageContext.legacyPageContext.serverRequestPath;

    // currentPageRelativeUrl will look similar to: /sites/contosoportal/SitePages/Home.aspx

    // Getting the current SharePoint Web URL
    // this._web = Web(this.context.pageContext.web.absoluteUrl);

    // search for a redirection rule for the current page, if any
    const redirection: IRedirection = await this.loadRedirectionForCurrentPage(
      this.properties.redirectionsListTitle, currentPageRelativeUrl);

    if (redirection) {
      // redirect to the target page, if any
      window.location.href = redirection.destinationUrl;
    }
  }

  private async loadRedirectionForCurrentPage(redirectionsListTitle: string, currentPageRelativeUrl: string):
    Promise<IRedirection> {

    let result: IRedirection = undefined;

    // first of all, exclude redirection for the list of redirections
    if (currentPageRelativeUrl.indexOf(`Lists/${redirectionsListTitle}/AllItems.aspx`) < 0) {

      // ensures that the PnPRedirections lists exists
      // it will fail if a user doesn't have correct permissions, but we won't limit this to prevent subsequent execution
      await this.ensureRedirectionsList(redirectionsListTitle).catch(error=>{
        console.log("Unable to call Ensure(). User does not have enough permissions.");
      });

      // define a CAML query to get the redirection item for the current page, if any
      const query = {
        ViewXml: `<View><Query>
        <Where>
          <And>
            <Eq>
              <FieldRef Name='${this.FIELD_INTERNALNAME_REDIRECTIONENABLED}'/>
              <Value Type='Boolean'>1</Value>
            </Eq>
            <Contains>
              <FieldRef Name='${this.FIELD_INTERNALNAME_SOURCEURL}'/>
              <Value Type='URL'>${currentPageRelativeUrl}</Value>
            </Contains>
          </And>
        </Where>
        <RowLimit>1</RowLimit>
        </Query></View>`
      };

      // search for items matching the query
      // tslint:disable-next-line: no-any
      const queryResult: any = await this._sp.web.lists.getByTitle(redirectionsListTitle).getItemsByCAMLQuery(query);

      if (queryResult && queryResult.length > 0) {

        // if there are any items, get the first one only to build the result
        // tslint:disable-next-line: no-any
        const firstResult: any = queryResult[0];
        result = {
          sourceRelativeUrl: firstResult[this.FIELD_INTERNALNAME_SOURCEURL].Url,
          destinationUrl: firstResult[this.FIELD_INTERNALNAME_DESTINATIONURL].Url,
          enabled: firstResult[this.FIELD_INTERNALNAME_REDIRECTIONENABLED]
        };
      }
    }

    return(result);
  }

  // this method ensures that the Redirections lists exists, or if it doesn't exist
  // it creates it, as long as the currently connected user has proper permissions
  private async ensureRedirectionsList(redirectionsListTitle: string): Promise<boolean> {

    let result: boolean = false;

    try {
      const ensureResult: IListEnsureResult = await this._sp.web.lists.ensure(redirectionsListTitle,
        'Redirections',
        100,
        true);

      // if we've got the list
      if (ensureResult.list) {
        // if the list has just been created
        if (ensureResult.created) {
          // we need to add the custom fields to the list
          const sourceUrlFieldAddResult: IFieldAddResult = await ensureResult.list.fields.addUrl(
            this.FIELD_INTERNALNAME_SOURCEURL, { DisplayFormat: UrlFieldFormatType.Hyperlink, Required: true }
          );
          await sourceUrlFieldAddResult.field.update({ Title: strings.FieldSourceUrlTitle });
          const destinationUrlFieldAddResult: IFieldAddResult = await ensureResult.list.fields.addUrl(
            this.FIELD_INTERNALNAME_DESTINATIONURL, { DisplayFormat: UrlFieldFormatType.Hyperlink, Required: true }
          );
          await destinationUrlFieldAddResult.field.update({ Title: strings.FieldDestinationUrlTitle });
          const redirectionEnabledFieldAddResult: IFieldAddResult = await ensureResult.list.fields.addBoolean(
            this.FIELD_INTERNALNAME_REDIRECTIONENABLED,
            { Required: true });
          await redirectionEnabledFieldAddResult.field.update({ Title: strings.FieldRedirectionEnabledTitle });

          // the list is ready to be used
          result = true;
        } else {
          // the list already exists, double check the fields
          try {
            const sourceUrlField: IField = ensureResult.list.fields.getByInternalNameOrTitle(
              this.FIELD_INTERNALNAME_SOURCEURL);
            const destinationUrlField: IField = ensureResult.list.fields.getByInternalNameOrTitle(
              this.FIELD_INTERNALNAME_DESTINATIONURL);
            const redirectionEnabledField: IField = ensureResult.list.fields.getByInternalNameOrTitle(
              this.FIELD_INTERNALNAME_REDIRECTIONENABLED);

            // if it is all good, then the list is ready to be used
            result = (sourceUrlField && destinationUrlField && redirectionEnabledField) !== undefined;
          } catch (e) {
            // if any of the fields does not exist, raise an exception in the console log
            console.log(`The ${redirectionsListTitle} list does not match the expected fields definition.`);
          }
        }
      }
    } catch (e) {
      // if we fail to create the list, raise an exception in the console log
      console.log(`Failed to create custom list ${redirectionsListTitle}.`);
    }

    return(result);
  }
}
