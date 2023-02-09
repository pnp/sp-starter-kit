import * as React from 'react';
import styles from './LobIntegration.module.scss';
import { ILobIntegrationProps } from './ILobIntegrationProps';
import { ILobIntegrationState } from './ILobIntegrationState';

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
  IColumn,
  SelectionMode
} from '@fluentui/react';
import { AadHttpClient, HttpClientResponse, IHttpClientOptions } from "@microsoft/sp-http";
import { ILobServiceResponse } from '../ILobServiceResponse';

/**
 * Define the columns that will be used to render the list of customers
 */
const _customersColumns: IColumn[] = [
  {
    key: 'CustomerIDColumn',
    name: strings.CustomerIDColumn,
    fieldName: 'customerID',
    minWidth: 80,
    maxWidth: 100,
    isResizable: true,
    ariaLabel: strings.CustomerIDColumnAriaLabel
  },
  {
    key: 'CompanyNameColumn',
    name: strings.CompanyNameColumn,
    fieldName: 'companyName',
    minWidth: 150,
    maxWidth: 350,
    isResizable: true,
    ariaLabel: strings.CompanyNameColumnAriaLabel
  },
  {
    key: 'ContactNameColumn',
    name: strings.ContactNameColumn,
    fieldName: 'contactName',
    minWidth: 150,
    maxWidth: 350,
    isResizable: true,
    ariaLabel: strings.ContactNameColumnAriaLabel
  },
  {
    key: 'CountryColumn',
    name: strings.CountryColumn,
    fieldName: 'country',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: strings.CountryColumnAriaLabel
  },
];

export default class LobIntegration extends React.Component<ILobIntegrationProps, ILobIntegrationState> {

  constructor(props: ILobIntegrationProps) {
    super(props);

    // set initial state for the component
    this.state = {
      loading: false,
      searchFor: "",
      customers: null,
    };
  }

  public componentDidMount(): void {
    // this._listCustomers();
  }

  private _onSearchForChanged(newValue: string): void {
    // update the component state accordingly to the current user's input
    this.setState({
      searchFor: newValue,
    });
  }

  private async _callService(requestUrl: string): Promise<ILobServiceResponse> {
    // create an AadHttpClient object to consume the 3rd party API
    const aadClient: AadHttpClient = await this.props.context.aadHttpClientFactory.getClient(this.props.applicationUri);

    console.log("Created aadClient");

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Accept', 'application/json');

    const requestOptions: IHttpClientOptions = {
      headers: requestHeaders,
    };

    // get the list of customers
    const httpResponse: HttpClientResponse = await aadClient
      .get(
        requestUrl,
        AadHttpClient.configurations.v1,
        requestOptions
      );

    return await httpResponse.json();
  }

  private async _listCustomers(): Promise<void> {
    // update the component state while listing customers
    this.setState({
      customers: null,
      loading: true,
    });

    const response:ILobServiceResponse = await this._callService(this.props.serviceUrl);

    // update the component state accordingly to the result
    this.setState({
      customers: response.customers,
      username: response.username,
      requestDateTime: response.requestDateTime,
      loading: false,
    });

    return;
  }

  private async _searchCustomers(): Promise<void> {
    // update the component state while searching customers
    this.setState({
      customers: null,
      loading: true,
    });

    const response: ILobServiceResponse = await this._callService(`${this.props.serviceUrl}/search/${this.state.searchFor}`);

    // update the component state accordingly to the result
    this.setState({
      customers: response.customers,
      username: response.username,
      requestDateTime: response.requestDateTime,
      loading: false,
    });

    return;
  }

    public render(): React.ReactElement<ILobIntegrationProps> {

      let contents: JSX.Element = null;

      if (!this.props.needsConfiguration) {
        contents = (
          <div className={styles.lobIntegration}>
            <div className={styles.container}>
              <div className={styles.row}>

                <div className={styles.column}>
                  <span className={styles.title}>{strings.ListDescription}</span>
                  <p className={styles.form}>
                    <PrimaryButton
                      text={strings.ListButtonText}
                      title={strings.ListButtonText}
                      onClick={() => this._listCustomers()}
                    />
                  </p>
                </div>

                <div className={styles.column}>
                  <span className={styles.title}>{strings.SearchDescription}</span>
                  <p className={styles.form}>
                    <TextField
                      label={strings.SearchFor}
                      required={true}
                      value={this.state.searchFor}
                      onChange={(ev, newValue: string) => this._onSearchForChanged(newValue)}
                    />
                  </p>
                  <p className={styles.form}>
                    <PrimaryButton
                      text={strings.SearchButtonText}
                      title={strings.SearchButtonText}
                      onClick={() => this._searchCustomers()}
                    />
                  </p>
                </div>

              </div>
              {
                (this.state.customers != null) ?
                  <div className={styles.row}>
                    <div className={styles.column}>
                      <div><Label>Username: {this.state.username}</Label></div>
                      <div><Label>Request DateTime: {this.state.requestDateTime}</Label></div>
                      <div>
                        <DetailsList
                          items={this.state.customers}
                          columns={_customersColumns}
                          selectionMode={SelectionMode.none}
                          layoutMode={DetailsListLayoutMode.justified} />
                      </div>
                    </div>
                  </div>
                  : null
              }
              {
                (this.state.loading) ?
                  <div className={styles.row}>
                    <div className={styles.column}>
                      <Spinner size={SpinnerSize.large} label={strings.LoadingDataLabel} className={styles.spinner} />
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
              onConfigure={() => this.props.configureHandler()} />
          }
          {contents}
        </div>
    );
  }
}
