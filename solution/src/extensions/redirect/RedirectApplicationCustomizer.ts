import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import { IRedirectApplicationCustomizerProperties } from './IRedirectApplicationCustomizerProperties';
import { IRedirection } from './IRedirection';
import * as strings from 'RedirectApplicationCustomizerStrings';

// import additional controls/components
import { sp, CamlQuery, ListEnsureResult, UrlFieldFormatType, Field, FieldAddResult } from "@pnp/sp";

const LOG_SOURCE: string = 'RedirectApplicationCustomizer';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class RedirectApplicationCustomizer
  extends BaseApplicationCustomizer<IRedirectApplicationCustomizerProperties> {

  @override
  public async onInit(): Promise<void> {

    // initialize PnP JS library to play with SPFx contenxt
    sp.setup({
      spfxContext: this.context
    });

    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // ensure to have proper settings
    if (!this.properties || !this.properties.redirectionsListTitle) {
      Log.info(LOG_SOURCE, 'No properties were provided');
      return;
    }

    // read the server relative URL of the current page from Legacy Page Context
    const currentPageRelativeUrl: string = this.context.pageContext.legacyPageContext.serverRequestPath;

    // search for a redirection rule for the current page, if any
    const redirection: IRedirection = await this.loadRedirectionForCurrentPage(
      this.properties.redirectionsListTitle, currentPageRelativeUrl);

    if (redirection != null) {
      console.log(redirection);

      // redirect to the target page, if any
      location.href = redirection.destinationUrl;
    }
  }

  private async loadRedirectionForCurrentPage(redirectionsListTitle: string, currentPageRelativeUrl: string): Promise<IRedirection> {

    let result: IRedirection = null;

    // first of all, exclude redirection for the list of redirections
    if (currentPageRelativeUrl.indexOf('Lists/PnPRedirections/AllItems.aspx') < 0) {

      // ensures that the PnPRedirections lists exists
      if (await this.ensureRedirectionsList(redirectionsListTitle)) {
        // define a CAML query to get the redirection item for the current page, if any
        const query: CamlQuery = {
          ViewXml: `<View><Query>
          <Where>
            <And>
              <Eq>
                <FieldRef Name='PnPRedirectionEnabled'/>
                <Value Type='Boolean'>1</Value>
              </Eq>
              <Contains>
                <FieldRef Name='PnPSourceUrl'/>
                <Value Type='URL'>${currentPageRelativeUrl}</Value>
              </Contains>
            </And>
          </Where>
          <RowLimit>1</RowLimit>
          </Query></View>`
        };

        // search for items matching the query
        const queryResult: any[] = await sp.web.lists.getByTitle(redirectionsListTitle).getItemsByCAMLQuery(query);
        if (queryResult != null && queryResult.length > 0) {
          // if there are any items, get the first one only to build the result
          let firstResult: any = queryResult[0];
          result = {
            sourceRelativeUrl: firstResult["PnPSourceUrl"]["Url"],
            destinationUrl: firstResult["PnPDestinationUrl"]["Url"],
            enabled: firstResult["PnPRedirectionEnabled"],
          };
        }
      }
    }

    return(result);
  }

  // this method ensures that the Redirections lists exists, or if it doesn't exist
  // it creates it, as long as the currently connected user has proper permissions
  private async ensureRedirectionsList(redirectionsListTitle: string): Promise<boolean> {

    let result: boolean = false;

    try {
      const ensureResult: ListEnsureResult = await sp.web.lists.ensure(redirectionsListTitle,
        "Redirections",
        100,
        true);

      // if we've got the list
      if (ensureResult.list != null) {
        // if the list has just been created
        if (ensureResult.created) {
          // we need to add the custom fields to the list
          const sourceUrlFieldAddResult: FieldAddResult = await ensureResult.list.fields.addUrl(
            "PnPSourceUrl", UrlFieldFormatType.Hyperlink,
            { Required: true });
          await sourceUrlFieldAddResult.field.update({ Title: "Source URL"});
          const destinationUrlFieldAddResult: FieldAddResult = await ensureResult.list.fields.addUrl(
            "PnPDestinationUrl", UrlFieldFormatType.Hyperlink,
            { Required: true });
          await destinationUrlFieldAddResult.field.update({ Title: "Destination URL"});
          const redirectionEnabledFieldAddResult: FieldAddResult = await ensureResult.list.fields.addBoolean(
            "PnPRedirectionEnabled",
            { Required: true });
          await redirectionEnabledFieldAddResult.field.update({ Title: "Redirection Enabled"});

          // the list is ready to be used
          result = true;
        } else {
          // the list already exists, double check the fields
          try {
            const sourceUrlField: Field = await ensureResult.list.fields.getByInternalNameOrTitle("PnPSourceUrl").get();
            const destinationUrlField: Field = await ensureResult.list.fields.getByInternalNameOrTitle("PnPDestinationUrl").get();
            const redirectionEnabledField: Field = await ensureResult.list.fields.getByInternalNameOrTitle("PnPRedirectionEnabled").get();

            // if it is all good, then the list is ready to be used
            result = true;
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
