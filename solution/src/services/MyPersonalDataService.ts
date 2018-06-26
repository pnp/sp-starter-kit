/**
 * This service uses the OneDrive for Business Site Collection of the current user
 * to store personal data, through a custom list
 */

// import additional controls/components
import { IWebPartContext} from '@microsoft/sp-webpart-base';
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { IPersonProperties, ISetPropertyResponse } from './SPUserProfileTypes';
import { sp, CamlQuery, ListEnsureResult, UrlFieldFormatType, Field, FieldAddResult, List, SPRest } from "@pnp/sp";
import { MSGraphClient } from '@microsoft/sp-client-preview';
import { IDriveInfo } from './IDriveInfo';

export default class MyPersonalDataService {

    private personalDataList: string = "PnP-Personal-Data";

    /**
     * Constructor for the MyPersonalDataService type
     */
    constructor(private graphClient: MSGraphClient) {
    }

    // this method ensures the existence of the personal data list in
    // the OD4B Site Collection
    private async ensurePersonalDataList(): Promise<List> {

      let result: List = null;

      // get a reference to the current user's OneDrive for Business site
      const drive: IDriveInfo = await this.graphClient
        .api("me/drive")
        .version("v1.0")
        .select("id,webUrl")
        .get();

      if (drive) {
        const oneDriveSiteUrl: string = drive.webUrl.substring(0, drive.webUrl.lastIndexOf("/"));
        const oneDriveSiteHostname: string = oneDriveSiteUrl.substring(8).substring(0, oneDriveSiteUrl.substring(8).indexOf("/"));
        const oneDriveSiteRelativeUrl: string = oneDriveSiteUrl.substring(8).substring(oneDriveSiteUrl.substring(8).indexOf("/"));

        console.log(oneDriveSiteUrl);
        console.log(oneDriveSiteHostname);
        console.log(oneDriveSiteRelativeUrl);

        const oneDriveSite: any = await this.graphClient
          .api(`sites/${oneDriveSiteHostname}:${oneDriveSiteRelativeUrl}`)
          .version("v1.0")
          .select("id")
          .get();

        console.log(oneDriveSite.id);

        // target the OneDrive for Business Site Collection with PnP JS
        const spOneDrive: SPRest = sp.configure({ }, oneDriveSiteUrl);

        // ensure the personal data list is there
        const ensureResult: ListEnsureResult = await spOneDrive.web.lists.ensure(this.personalDataList,
          this.personalDataList,
          100,
          false);

        // if we've got the list
        if (ensureResult.list != null) {

          result = ensureResult.list;

          // if the list has just been created
          if (ensureResult.created) {
            // we need to add the custom fields to the list
            const valueFieldAddResult: FieldAddResult = await ensureResult.list.fields.addMultilineText(
              "PnPPersonalDataValue",
              1000, // numberOfLines
              false, // richText
              false, // restrictedMode
              false, // appendOnly
              false, // allowHyperlink
              { Required: true });
            await valueFieldAddResult.field.update({ Title: "Value"});
          } else {
            // the list already exists, double check the fields
            try {
              const valueField: Field = await ensureResult.list.fields.getByInternalNameOrTitle("PnPPersonalDataValue").get();
            } catch (e) {
              // if any of the fields does not exist, raise an exception in the console log
              console.log(`The ${this.personalDataList} list does not match the expected fields definition.`);
            }
          }
        }
      }

      return(result);
    }

    // retrieves the value of a personal data item
    public async getUserData(propertyName: string): Promise<any> {

        // ensure the Personal Data list and get a reference to it
        const personalDataList: List = await this.ensurePersonalDataList();
        console.log(personalDataList);

        return(null);
    }

    // stores the value of a personal data item
    public async setUserData(propertyName: string, value: any): Promise<boolean> {

        // ensure the Personal Data list and get a reference to it
        const personalDataList: List = await this.ensurePersonalDataList();
        console.log(personalDataList);

        return(false);
    }
}