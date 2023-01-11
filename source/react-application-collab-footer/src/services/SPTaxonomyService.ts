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
import { ITermSets, ITermSet, ITerms, ITerm } from './SPTaxonomyTypes';

export default class SPTaxonomyService {

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
   * Retrieves the collection of terms for a term set stored in the current SharePoint env
   */
  public async getTermsFromTermSet(termSetName: string, locale: number = 1033): Promise<ITerm[]> {

    // if we are in a real SharePoint environment
    if (Environment.type === EnvironmentType.SharePoint ||
      Environment.type === EnvironmentType.ClassicSharePoint) {

      this.formDigest = await this.getFormDigest();

      // build the Client Service Request
      let data: string = `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0"
        LibraryVersion="16.0.0.0" ApplicationName="JavaScript Client"
        xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
          <Actions>
            <ObjectPath Id="2" ObjectPathId="1" />
            <ObjectIdentityQuery Id="3" ObjectPathId="1" />
            <ObjectPath Id="5" ObjectPathId="4" />
            <ObjectIdentityQuery Id="6" ObjectPathId="4" />
            <ObjectPath Id="8" ObjectPathId="7" />
            <Query Id="9" ObjectPathId="7">
              <Query SelectAllProperties="false">
                <Properties />
              </Query>
              <ChildItemQuery SelectAllProperties="false">
                <Properties>
                  <Property Name="Terms" SelectAll="true">
                    <Query SelectAllProperties="false">
                      <Properties />
                    </Query>
                  </Property>
                </Properties>
              </ChildItemQuery>
            </Query>
          </Actions>
          <ObjectPaths>
            <StaticMethod Id="1" Name="GetTaxonomySession"
              TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" />
            <Method Id="4" ParentId="1" Name="GetDefaultSiteCollectionTermStore" />
            <Method Id="7" ParentId="4" Name="GetTermSetsByName">
              <Parameters>
                <Parameter Type="String">${termSetName}</Parameter>
                <Parameter Type="Int32">${locale}</Parameter>
              </Parameters>
            </Method>
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

      //let result: Array<ITerm> = new Array<ITerm>();

      // extract the object of type SP.Taxonomy.TermSetCollection from the array
      let termSetsCollections: ITermSets[] = serviceJSONResponse.filter(
        (child: any) => (child != null && child['_ObjectType_'] !== undefined && child['_ObjectType_'] === "SP.Taxonomy.TermSetCollection")
      );

      // and if any, process the TermSet objects in it
      if (termSetsCollections != null && termSetsCollections.length > 0) {
        let termSetCollection: ITermSets = termSetsCollections[0];

        let childTermSets: ITermSet[] = termSetCollection._Child_Items_;

        // extract the object of type SP.Taxonomy.TermSet from the array
        let termSets: ITermSet[] = childTermSets.filter(
          (child: any) => (child != null && child['_ObjectType_'] !== undefined && child['_ObjectType_'] === "SP.Taxonomy.TermSet")
        );

        // and if any, process the requested TermSet object
        if (termSets != null && termSets.length > 0) {
          let termSet: ITermSet = termSets[0];

          let childItems: ITerm[] = termSet.Terms._Child_Items_;

          return(await Promise.all<ITerm>(childItems.map(async (t: any): Promise<ITerm> => {
            return await this.expandTerm(t);
          })));
        }
      }
    }

    // default empty array in case of any missing data
    return (new Promise<Array<ITerm>>((resolve, reject) => {
      resolve(new Array<ITerm>());
    }));
  }


  /**
   * @function
   * Gets the child terms of another term of the Term Store in the current SharePoint env
   */
  private async getChildTerms(term: ITerm): Promise<ITerm[]> {

    // check if there are child terms to search for
    if (Number(term.TermsCount) > 0) {

      // build the Client Service Request
      let data: string = `<Request AddExpandoFieldTypeSuffix="true"
      SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0"
      ApplicationName=".NET Library"
      xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
        <Actions>
          <ObjectPath Id="20" ObjectPathId="19" />
          <Query Id="21" ObjectPathId="19">
            <Query SelectAllProperties="false">
              <Properties />
            </Query>
            <ChildItemQuery SelectAllProperties="true">
              <Properties>
                <Property Name="CustomSortOrder" ScalarProperty="true" />
                <Property Name="CustomProperties" ScalarProperty="true" />
                <Property Name="LocalCustomProperties" ScalarProperty="true" />
              </Properties>
            </ChildItemQuery>
          </Query>
        </Actions>
        <ObjectPaths>
          <Property Id="19" ParentId="16" Name="Terms" />
          <Identity Id="16" Name="${term._ObjectIdentity_}" />
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

      // extract the object of type SP.Taxonomy.TermCollection from the array
      let termsCollections: ITerms[] = serviceJSONResponse.filter(
        (child: any) => (child != null && child['_ObjectType_'] !== undefined && child['_ObjectType_'] === "SP.Taxonomy.TermCollection")
      );

      // and if any, get the first and unique Terms collection object
      if (termsCollections != null && termsCollections.length > 0) {
        let termsCollection: ITerms = termsCollections[0];

        let childItems: Array<ITerm> = termsCollection._Child_Items_;

        return(await Promise.all<ITerm>(childItems.map(async (t: ITerm): Promise<ITerm> => {
          return await this.expandTerm(t);
        })));
      }
    }

    // default empty array in case of any missing data
    return (new Promise<Array<ITerm>>((resolve, reject) => {
      resolve(new Array<ITerm>());
    }));
  }

  /**
   * @function
   * Expands a Term object of type ITerm, including child terms
   * @param guid
   */
  private async expandTerm(term: ITerm): Promise<ITerm> {

    let childTerms: ITerm[] = await this.getChildTerms(term);
    term.CustomProperties = term.CustomProperties !== undefined ? term.CustomProperties : null;
    term.Id = term.Id !== undefined ? this.cleanGuid(term.Id) : "";
    term.LocalCustomProperties = term.LocalCustomProperties !== undefined ? term.LocalCustomProperties : null;
    term.Terms = childTerms;
    term.TermsCount = childTerms.length;
    term.PathDepth = term.PathOfTerm.split(';').length;

    return(term);
  }

  /**
   * @function
   * Clean the Guid from the Web Service response
   * @param guid
   */
  private cleanGuid(guid: string): string {
    if (guid !== undefined) {
      return guid.replace('/Guid(', '').replace('/', '').replace(')', '');
    } else {
      return("");
    }
  }
}
