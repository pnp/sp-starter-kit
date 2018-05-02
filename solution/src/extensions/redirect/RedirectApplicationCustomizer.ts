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
import { sp, CamlQuery } from "@pnp/sp";

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
    const redirection: IRedirection = await this.loadRedirectionForCurrentPage(this.properties.redirectionsListTitle, currentPageRelativeUrl);

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

    return(result);
  }
}
