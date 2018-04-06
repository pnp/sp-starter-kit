import * as React from 'react';
import styles from './StockInformation.module.scss';
import { IStockInformationProps } from './IStockInformationProps';
import { IStockInformationState } from './IStockInformationState';
import { escape } from '@microsoft/sp-lodash-subset';

// import strings from localized resources
import * as strings from 'StockInformationWebPartStrings';

// import supporting types
import { IStockInformationData, IStockData } from './IStockInformationData';
import { IAVResults, IAVResultsMetadata, IAVResultsSeries } from './AlphaVantageResults';

// import additional controls/components
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { HttpClientResponse, HttpClient } from '@microsoft/sp-http';
import * as lodash from '@microsoft/sp-lodash-subset';

export default class StockInformation extends React.Component<IStockInformationProps, IStockInformationState> {

  constructor() {
    super();

    // set initial state for the component: not loading, no stock information
    this.state = {
      loading: false,
      stockInfo: null
    };
  }

  // on componentDidMount refresh data
  public componentDidMount(): void {
    if (!this.props.needsConfiguration) {
      this.loadStockInformation(this.props.stockSymbol, this.props.autoRefresh);
    }
  }

  // on componentWillReceiveProps refresh data
  public componentWillReceiveProps(nextProps: IStockInformationProps): void {
    if (nextProps.stockSymbol) {
      this.loadStockInformation(this.props.stockSymbol, this.props.autoRefresh);
    }
  }

  // method to load stock information from external REST API
  private loadStockInformation(stockSymbol: string, autoRefresh: boolean): void {

    // double-check to have the API Key
    if (!this.props.apiKey) {

      // if we don't have the API Key, stop the Spinner
      this.setState({
        loading: false,
        stockInfo: null
      });
      // and show a specific error
      this.props.errorHandler(strings.NoAPIKeyInTenantProperties);
    } else {

      // show the Spinner control
      this.setState({
        loading: true
      });

      // get the current date and time
      const now: Date = new Date();

      // determine the date of yesterday
      const yesterday: Date = new Date(now.getTime() - 24 * 60 * 60000);
      const yesterdayName: string = yesterday.toISOString().substring(0, 10);

      // get yesterday's closing price if it is not already in the local storage cache
      const dailyCloseKeyName: string = `PnP-Portal-AlphaVantage-Close-${escape(stockSymbol)}-${yesterdayName}`;

      // try to get the close price from the local session storage
      let closeValue: number = Number(sessionStorage.getItem(dailyCloseKeyName));

      // if it is not there, load it from the API
      // and store its value in the session storage
      if (!closeValue) {

        const serviceDailyEndpoint: string =
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${escape(stockSymbol)}&apikey=${this.props.apiKey}`;

        // request stock information to the REST API
        this.props.httpClient
        .get(serviceDailyEndpoint, HttpClient.configurations.v1)
        .then((response: HttpClientResponse): Promise<IAVResults> => {
          return response.json();
        })
        .then((data: IAVResults): void => {

          // if there are no errors and we have data
          if (!data["Error Message"] && data["Meta Data"] && data["Time Series (Daily)"]) {

            // get the current date and time
            const now: Date = new Date();

            // get yesterday date and time
            const yesterdayData: IAVResultsSeries = data["Time Series (Daily)"][yesterdayName];
            closeValue = yesterdayData["4. close"];

            if (closeValue > 0) {
              sessionStorage.setItem(dailyCloseKeyName, closeValue.toString());
            }
          }
        });
      }

      const serviceIntradayEndpoint: string =
       `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${escape(stockSymbol)}&interval=1min&apikey=${this.props.apiKey}`;

      // request stock information to the REST API
      this.props.httpClient
        .get(serviceIntradayEndpoint, HttpClient.configurations.v1)
        .then((response: HttpClientResponse): Promise<IAVResults> => {
          return response.json();
        })
        .then((data: IAVResults): void => {

          // if there are no errors and we have data
          if (!data["Error Message"] && data["Meta Data"] && data["Time Series (1min)"]) {

            const timeSeries: Array<IAVResultsSeries> = new Array<IAVResultsSeries>();

            // parse response to retrieve the quotes
            lodash.forIn(data["Time Series (1min)"], (value: IAVResultsSeries, key: string) => {
              timeSeries.push(value);
            });

            // get the last data series from the AV service
            const lastAVDataSeries: IAVResultsSeries = timeSeries[0];

            // build the state variable to render the stock information
            const stockInfo: IStockInformationData = {
              symbol: data["Meta Data"]["2. Symbol"],
              lastRefreshed: now,
              lastData: {
                open: lastAVDataSeries["1. open"],
                high: lastAVDataSeries["2. high"],
                low: lastAVDataSeries["3. low"],
                close: lastAVDataSeries["4. close"],
                volume: lastAVDataSeries["5. volume"]
              },
              previousClose: closeValue
            };

            // set the state with the new stock information and stop the Spinner
            this.setState({
              loading: false,
              stockInfo: stockInfo
            });
          } else {
            // if we don't have data in the response, stop the Spinner and show previous data
            this.setState({
              loading: false
            });
            // and show a specific error
            this.props.errorHandler(`${strings.NoDataForStockSymbol}${escape(stockSymbol)}`);
          }
        }, (error: any): void => {
          // in case of any other generic error, stop the Spinner and show previous data
          this.setState({
            loading: false
          });
          // and show the error
          this.props.errorHandler(error);
        })
        .catch((error: any): void => {
          // in case of any other error, stop the Spinner and show previous data
          this.setState({
            loading: false
          });
          // and show the error
          this.props.errorHandler(error);
        });

      // handle autoRefresh logic
      if (autoRefresh) {
        // if autoRefresh is enabled, refresh data every 60sec
        setTimeout(() => { this.loadStockInformation(stockSymbol, autoRefresh); }, 60000);
      }
    }
  }

  public render(): React.ReactElement<IStockInformationProps> {

    let contents: JSX.Element;

    // if we already have the configuration
    if (this.props.needsConfiguration === false &&
      this.state.stockInfo) {
      if (this.state.loading) {
        // show the Spinner control while loading data
        contents = <Spinner size={SpinnerSize.large} label={strings.LoadingDataLabel} />;
      } else {
        // show the Stock information, if we already have it
        const lastStockData: IStockData = this.state.stockInfo != null ? this.state.stockInfo.lastData : null;
        const previousClose: number = this.state.stockInfo != null ? this.state.stockInfo.previousClose : 0;
        contents = (
          <div className={styles.stock}>
            <div className={styles.stockSymbol}>{this.state.stockInfo.symbol}</div>
            <div>
              { lastStockData.close > previousClose ?
              <Icon iconName='TriangleSolidUp12' className={styles.iconTrendGreen} /> :
              lastStockData.close < previousClose ?
              <Icon iconName='TriangleSolidDown12' className={styles.iconTrendRed} /> :
              <Icon iconName='CircleFill' className={styles.iconTrendNeutral} />}
              <span className={styles.stockValue}>{ lastStockData.close }</span>
            </div>
          </div>
        );
      }
    }

    // show the Placeholder control, if we are missing the real content, otherwise show the real content
    return (
      <div className={styles.stockInformation}>
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
