import * as React from 'react';
import styles from './LobIntegration.module.scss';
import { ILobIntegrationProps } from './ILobIntegrationProps';
import { ILobIntegrationState } from './ILobIntegrationState';
import { escape } from '@microsoft/sp-lodash-subset';

// import additional controls/components
import * as strings from 'LobIntegrationWebPartStrings';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import {
  Spinner,
  SpinnerSize,
  PrimaryButton,
  TextField,
  Label,
  DetailsList,
  DetailsListLayoutMode,
  IColumn
} from 'office-ui-fabric-react';
import { AadHttpClient, HttpClientResponse, IHttpClientOptions } from "@microsoft/sp-http";
import { serviceType } from '../ILobIntegrationWebPartProps';
import { IListNorthwindCustomersResponse, IClaim } from './IListNorthwindCustomersResponse';
import { ISearchNorthwindCustomersResponse } from './ISearchNorthwindCustomersResponse';
/**
 * Define the columns that will be used to render the list of customers
 */
const _customersColumns: IColumn[] = [
  {
    key: 'CustomerIDColumn',
    name: strings.CustomerIDColumn,
    fieldName: 'CustomerID',
    minWidth: 80,
    maxWidth: 100,
    isResizable: true,
    ariaLabel: strings.CustomerIDColumnAriaLabel
  },
  {
    key: 'CompanyNameColumn',
    name: strings.CompanyNameColumn,
    fieldName: 'CompanyName',
    minWidth: 150,
    maxWidth: 350,
    isResizable: true,
    ariaLabel: strings.CompanyNameColumnAriaLabel
  },
  {
    key: 'ContactNameColumn',
    name: strings.ContactNameColumn,
    fieldName: 'ContactName',
    minWidth: 150,
    maxWidth: 350,
    isResizable: true,
    ariaLabel: strings.ContactNameColumnAriaLabel
  },
  {
    key: 'CountryColumn',
    name: strings.CountryColumn,
    fieldName: 'Country',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: strings.CountryColumnAriaLabel
  },
];

export default class LobIntegration extends React.Component<ILobIntegrationProps, ILobIntegrationState> {

  constructor(props: ILobIntegrationProps) {
    super(props);

    // set initial state for the component: not loading
    this.state = {
      loading: false,
      searchFor: "",
      customers: null,
    };
  }

  private _onSearchForChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {

    // update the component state accordingly to the current user's input
    this.setState({
      searchFor: newValue,
    });
  }

  private _listCustomers = async (): Promise<void> => {

    // update the component state while listing customers
    this.setState({
      customers: null,
      loading: true,
    });

    // create an AadHttpClient object to consume the 3rd party API
    const aadClient: AadHttpClient = await this.props.context.aadHttpClientFactory.getClient("https://officedevpnp.onmicrosoft.com/spfx-lob-function");

    console.log("Created aadClient");

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Accept', 'application/json');

    const requestOptions: IHttpClientOptions = {
      headers: requestHeaders,
    };

    // get the list of customers
    const httpResponse: HttpClientResponse = await aadClient
      .get(
        this.props.functionUri,
        AadHttpClient.configurations.v1,
        requestOptions
      );

    const response: IListNorthwindCustomersResponse = await httpResponse.json();
    const nameClaims: IClaim[] = response.CurrentPrincipalClaims.filter((i) => {
      return(i.m_type === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
    });
    const username: string = nameClaims.length > 0 ? nameClaims[0].m_value : "";

    // update the component state accordingly to the result
    this.setState({
      customers: response.Customers,
      username: username,
      requestDateTime: response.RequestDateTime,
      loading: false,
    });

    return;
  }

  private _searchCustomers = async (): Promise<void> => {

    // update the component state while searching customers
    this.setState({
      customers: null,
      loading: true,
    });

    // create an AadHttpClient object to consume the 3rd party API
    const aadClient: AadHttpClient = await this.props.context.aadHttpClientFactory.getClient("https://officedevpnp.onmicrosoft.com/spfx-lob-webapi");

    console.log("Created aadClient");

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Accept', 'application/json');

    const requestOptions: IHttpClientOptions = {
      headers: requestHeaders,
    };

    // get the list of customers
    const httpResponse: HttpClientResponse = await aadClient
    .get(
      `${this.props.webapiUri}/search/${this.state.searchFor}`,
      AadHttpClient.configurations.v1,
      requestOptions
    );

    const response: ISearchNorthwindCustomersResponse = await httpResponse.json();

    // update the component state accordingly to the result
    this.setState({
      customers: response.Customers,
      username: response.Username,
      requestDateTime: response.RequestDateTime,
      loading: false,
    });

    return;
  }

  public render(): React.ReactElement<ILobIntegrationProps> {

    let contents: JSX.Element = null;

    if (!this.props.needsConfiguration) {
      contents = (
        <div className={styles.lobIntegration}>
          <div className={ styles.container }>
            <div className={ styles.row }>
              { this.props.serviceType === serviceType.AspNetRestAPI ?
                <div className={ styles.column }>
                  <span className={ styles.title }>{ strings.SearchDescription }</span>
                  <p className={ styles.form }>
                    <TextField
                        label={ strings.SearchFor }
                        required={ true }
                        value={ this.state.searchFor }
                        onChange={ this._onSearchForChanged }
                      />
                  </p>
                  <p className={ styles.form }>
                    <PrimaryButton
                        text={ strings.SearchButtonText }
                        title={ strings.SearchButtonText }
                        onClick={ this._searchCustomers }
                      />
                  </p>
                </div> :
                <div className={ styles.column }>
                  <span className={ styles.title }>{ strings.ListDescription }</span>
                  <p className={ styles.form }>
                    <PrimaryButton
                        text={ strings.ListButtonText }
                        title={ strings.ListButtonText }
                        onClick={ this._listCustomers }
                      />
                  </p>
                </div>
              }
            </div>
            {
              (this.state.customers != null) ?
                <div className={ styles.row }>
                  <div className={ styles.column }>
                    <div><Label>Username: { this.state.username }</Label></div>
                    <div><Label>Request DateTime: { this.state.requestDateTime }</Label></div>
                    <div>
                    <DetailsList
                      items={ this.state.customers }
                      columns={ _customersColumns }
                      layoutMode={ DetailsListLayoutMode.justified } />
                    </div>
                  </div>
                </div>
              : null
            }
            {
              (this.state.loading) ?
                <div className={ styles.row }>
                  <div className={ styles.column }>
                    <Spinner size={ SpinnerSize.large } label={ strings.LoadingDataLabel } className={ styles.spinner } />
                  </div>
                </div>
              : null
            }
          </div>
        </div>
      );
    }

    // show the Placeholder control, if we are missing the real content, otherwise show the real content
    return (
      <div className={styles.lobIntegration}>
        {this.props.needsConfiguration &&
          <Placeholder
            iconName={strings.PlaceholderIconName}
            iconText={strings.PlaceholderIconText}
            description={strings.PlaceholderDescription}
            buttonLabel={strings.PlaceholderButtonLabel}
            onConfigure={this.props.configureHandler} />
        }
        {contents}
      </div>);
  }
}
