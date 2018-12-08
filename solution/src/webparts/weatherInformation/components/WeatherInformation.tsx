import * as React from 'react';
import styles from './WeatherInformation.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { HttpClientResponse, HttpClient } from '@microsoft/sp-http';
import {
  IWeatherInformationProps,
  IWeatherInformationState,
  IWeatherInformationData,
  IWeatherInformationQueryResults,
  IWeatherInformationCondition,
  IWeatherInformationLocation
} from '.';
import * as strings from 'WeatherInformationWebPartStrings';

export default class WeatherInformation extends React.Component<IWeatherInformationProps, IWeatherInformationState> {
  constructor(props: IWeatherInformationProps) {
    super(props);

    this.state = {
      loading: false
    };
  }

  /**
   * Loads weather information for the specified location from a third party API
   * @param location Location for which to load weather information
   * @param unit Unit to display the current temperature.
   */
  private _loadWeatherInfo(location: string, unit: string): void {
    // notify the user that the component will load its data
    this.setState({
      loading: true
    });

    let weatherInfo: IWeatherInformationQueryResults;

    // retrieve weather information from the Yahoo weather API
    this.props.httpClient
      .get(`https://query.yahooapis.com/v1/public/yql?q=select location, item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}") and u='${unit}'&format=json`, HttpClient.configurations.v1)
      .then((response: HttpClientResponse): Promise<IWeatherInformationData> => {
        return response.json();
      })
      .then((data: IWeatherInformationData): void => {
        if (data.query.results) {
          weatherInfo = data.query.results;

          this.setState({
            loading: false,
            weatherInfo: weatherInfo
          });
        }
        else {
          // No weather information for the specified location has been found.
          // Notify the user that loading the data is finished.
          this.setState({
            loading: false,
            weatherInfo: null
          });
          // Return an error message stating that no weather information has been found
          this.props.errorHandler(`${strings.NoWeatherInformationFoundMessage}${location}`);
        }
      }, (error: any): void => {
        // An error has occurred when calling the weather API.
        // Notify the user that loading the data is finished
        this.setState({
          loading: false,
          weatherInfo: null
        });
        // Return the error message
        this.props.errorHandler(error);
      })
      .catch((error: any): void => {
        // An exception has occurred when calling the weather API.
        // Notify the user that loading the data is finished
        this.setState({
          loading: false,
          weatherInfo: null
        });
        // Return the exception message
        this.props.errorHandler(error);
      });
  }

  public componentDidMount(): void {
    if (!this.props.needsConfiguration) {
      // The web part has been configured. Load the weather information
      // for the specified location.
      this._loadWeatherInfo(this.props.location, this.props.unit);
    }
  }

  public componentWillReceiveProps(nextProps: IWeatherInformationProps): void {
    // If the location or the temperature unit have changed,
    // refresh the weather information
    if (nextProps.location && nextProps.unit) {
      this._loadWeatherInfo(nextProps.location, nextProps.unit);
    }
  }

  public render(): React.ReactElement<IWeatherInformationProps> {
    let contents: JSX.Element;
    // Check if the web part has been configured. Also check,
    // if the weather information has been initiated. This is
    // necessary, because the first time the component renders,
    // it's not loading its data but there is also no weather
    // information available yet
    if (this.props.needsConfiguration === false &&
      this.state.weatherInfo) {
      if (this.state.loading) {
        // Component is loading its data. Show spinner to communicate this to the user
        contents = <Spinner size={SpinnerSize.large} label={strings.LoadingSpinnerLabel} />;
      }
      else {
        // render the retrieved weather information
        const weather: IWeatherInformationCondition = this.state.weatherInfo.channel.item.condition;
        const location: IWeatherInformationLocation = this.state.weatherInfo.channel.location;
        contents = (
          <div className={styles.weather}>
            <div className='temp'><i className={'icon' + weather.code}></i> {weather.temp}&deg;{this.props.unit.toUpperCase()}</div>
            <div className={styles.location}>{location.city}, {location.region}</div>
          </div>
        );
      }
    }

    return (
      <div className={styles.weatherInformation}>
        {this.props.needsConfiguration &&
          // The web part hasn't been configured yet.
          // Show a placeholder to have the user configure the web part
          <Placeholder
            iconName='Edit'
            iconText={strings.PlaceholderIconText}
            description={strings.PropertyPaneDescription}
            buttonLabel={strings.PlaceholderButtonLabel}
            onConfigure={this.props.configureHandler} />
        }
        {contents}
      </div>
    );
  }
}
