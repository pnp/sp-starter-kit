/**
 * DISCLAIMER
 *
 * As there is not yet an OData end-point for managed metadata, this service makes use of the ProcessQuery end-points.
 * The service will get updated once the APIs are in place for managing managed metadata.
 */

import { IWebPartContext} from '@microsoft/sp-webpart-base';
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { IPersonProperties, ISetPropertyResponse } from './SPUserProfileTypes';

export default class SPUserProfileService {

  // private member to hold the URL of the /_vti_bin/client.svc/ProcessQuery endpoint
  private clientServiceUrl: string;

  // private member to hold the URL of the /_api/contextinfo endpoint
  private contextInfoUrl: string;

  // private member to hold the FormDigest for SPO
  private formDigest: string;

  /**
   * Main constructor for the Taxonomy Service
   */
  constructor(private context: IWebPartContext | ExtensionContext) {
    this.clientServiceUrl = this.context.pageContext.web.absoluteUrl + '/_vti_bin/client.svc/ProcessQuery';
    this.contextInfoUrl = this.context.pageContext.web.absoluteUrl + '/_api/contextinfo';
  }

  /**
   * @function
   * Retrieves a new value for the Form Digest for SPO
   */
  private async getFormDigest(): Promise<string> {

    let httpPostOptions: ISPHttpClientOptions = {
      headers: {
      "accept": "application/json",
      "content-type": "application/json"
      }
    };
    let contextInfoResponse: SPHttpClientResponse =
      await this.context.spHttpClient.post(this.contextInfoUrl,
        SPHttpClient.configurations.v1, httpPostOptions);
    let contextInfoJsonResponse: any = await contextInfoResponse.json();
    const formDigest: string = contextInfoJsonResponse.FormDigestValue;

    return(formDigest);
  }

  /**
   * @function
   * Retrieves the value of a User Profile property for the current user
   */
  public async getUserProfileProperty(propertyName: string): Promise<any> {

    // if we are in a real SharePoint environment
    if (Environment.type === EnvironmentType.SharePoint ||
      Environment.type === EnvironmentType.ClassicSharePoint) {

      this.formDigest = await this.getFormDigest();

      // build the Client Service Request
      let data: string = `<Request AddExpandoFieldTypeSuffix="true"
        SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0"
        ApplicationName=".NET Library"
        xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
            <Actions>
                <ObjectPath Id="2" ObjectPathId="1" />
                <ObjectPath Id="4" ObjectPathId="3" />
                <Query Id="5" ObjectPathId="3">
                    <Query SelectAllProperties="false">
                        <Properties>
                            <Property Name="AccountName" ScalarProperty="true" />
                            <Property Name="UserProfileProperties" ScalarProperty="true" />
                        </Properties>
                    </Query>
                </Query>
            </Actions>
            <ObjectPaths>
                <Constructor Id="1" TypeId="{cf560d69-0fdb-4489-a216-b6b47adf8ef8}" />
                <Method Id="3" ParentId="1" Name="GetMyProperties" />
            </ObjectPaths>
        </Request>`;

      let httpPostOptions: ISPHttpClientOptions = {
        headers: {
          'accept': 'application/json',
          'content-type': 'text/xml',
          "X-RequestDigest": this.formDigest
        },
        body: data
      };

      let serviceResponse: SPHttpClientResponse =
        await this.context.spHttpClient.post(this.clientServiceUrl,
            SPHttpClient.configurations.v1, httpPostOptions);
      let serviceJSONResponse: Array<any> = await serviceResponse.json();

      // extract the object of type SP.UserProfiles.PersonProperties from the array
      let personPropertiesCollection: IPersonProperties[] = serviceJSONResponse.filter(
        (child: any) => (child != null && child['_ObjectType_'] !== undefined && child['_ObjectType_'] === "SP.UserProfiles.PersonProperties")
      );

      // and if any, process the TermSet objects in it
      if (personPropertiesCollection != null && personPropertiesCollection.length > 0) {
        let personProperties: IPersonProperties = personPropertiesCollection[0];

        // return the requested User Profile property
        return(personProperties.UserProfileProperties[propertyName]);
      }
    }

    // default empty item in case of any missing data
    return (new Promise<any>((resolve, reject) => {
      resolve(null);
    }));
  }

  /**
   * @function
   * Retrieves the value of a User Profile property for the current user
   */
  public async setUserProfileProperty(propertyName: string, propertyType: string, value: any): Promise<boolean> {

    // if we are in a real SharePoint environment
    if (Environment.type === EnvironmentType.SharePoint ||
      Environment.type === EnvironmentType.ClassicSharePoint) {

      this.formDigest = await this.getFormDigest();

      // make the request based on the current user's name
      const currentUserName: string = `i:0#.f|membership|${this.context.pageContext.user.loginName}`;

      // build the Client Service Request
      let data: string = `<Request AddExpandoFieldTypeSuffix="true"
        SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0"
        ApplicationName=".NET Library"
        xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
          <Actions>
            <Method Name="SetSingleValueProfileProperty" Id="7" ObjectPathId="1">
              <Parameters>
                <Parameter Type="String">${currentUserName}</Parameter>
                <Parameter Type="String">${propertyName}</Parameter>
                <Parameter Type="${propertyType}">${value}</Parameter>
              </Parameters>
            </Method>
          </Actions>
          <ObjectPaths>
            <Constructor Id="1" TypeId="{cf560d69-0fdb-4489-a216-b6b47adf8ef8}" />
          </ObjectPaths>
        </Request>`;

      let httpPostOptions: ISPHttpClientOptions = {
        headers: {
          'accept': 'application/json',
          'content-type': 'text/xml',
          "X-RequestDigest": this.formDigest
        },
        body: data
      };

      let serviceResponse: SPHttpClientResponse =
        await this.context.spHttpClient.post(this.clientServiceUrl,
            SPHttpClient.configurations.v1, httpPostOptions);
      let serviceJSONResponse: Array<any> = await serviceResponse.json();

      // get the response, if any
      if (serviceJSONResponse != null && serviceJSONResponse.length > 0) {
        let response: ISetPropertyResponse = serviceJSONResponse[0];

        // return the requested User Profile property
        return(response.ErrorInfo === null);
      }
    }

    // default to false in case of any missing data
    return (new Promise<boolean>((resolve, reject) => {
      resolve(false);
    }));
  }
}
