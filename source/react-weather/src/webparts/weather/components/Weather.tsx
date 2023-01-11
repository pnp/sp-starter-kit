import * as React from 'react';
import styles from './Weather.module.scss';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import {
  Spinner,
  SpinnerSize
} from '@fluentui/react/lib/Spinner';
import { HttpClientResponse, HttpClient } from '@microsoft/sp-http';
import {
  IWeatherState,
  IWeatherData,
  IWeatherProps,
  IWeatherCondition,
  IWeatherLocation,
  IWeatherDescription
} from '.';
import * as strings from 'WeatherWebPartStrings';




export default class Weather extends React.Component < IWeatherProps, IWeatherState > {
  constructor(props: IWeatherProps) {
  super(props);

  this.state = {
    loading: false
  };
}

/**
 * Loads weather information for the specified location from a third party API
 * @param location Location for which to load weather information
 * @param unit Unit to display the current temperature.
 * @param apikey API key to authenticate the API call
 */
private _loadWeatherInfo(location: string, unit: string, apikey: string): void {
  // notify the user that the component will load its data
  this.setState({
    loading: true
  });

  let coord: IWeatherLocation;
  let weather: IWeatherDescription;
  let main: IWeatherCondition;
  let timezone: number;
  let name: string;

  // retrieve weather information from the OpenWeatherMap weather API
  this.props.httpClient
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`,
     HttpClient.configurations.v1)
    .then((response: HttpClientResponse): Promise<IWeatherData> => {
      return response.json();
    })
    .then((data: IWeatherData): void => {
      if (data) {
        coord = data.coord;
        weather =  data.weather[0];
        main = data.main;
        timezone = data.timezone;
        name = data.name;

        this.setState({
          loading: false,
          coord: coord,
          weather: weather,
          main: main,
          timezone: timezone,
          name: name
        });
      }
      else {
        // No weather information for the specified location has been found.
        // Notify the user that loading the data is finished.
        this.setState({
          loading: false,
          coord: null,
          weather: null,
          main: null,
          timezone: null,
          name: null
        });
        // Return an error message stating that no weather information has been found
        this.props.errorHandler(`${strings.NoWeatherInformationFoundMessage}${location}`);
      }
    }, (error: any): void => {
      // An error has occurred when calling the weather API.
      // Notify the user that loading the data is finished
      this.setState({
        loading: false,
        coord: null,
        weather: null,
        main: null,
        timezone: null,
        name: null
      });
      // Return the error message
      this.props.errorHandler(error);
    })
    .catch((error: any): void => {
      // An exception has occurred when calling the weather API.
      // Notify the user that loading the data is finished
      this.setState({
        loading: false,
        coord: null,
        weather: null,
        main: null,
        timezone: null,
        name: null
      });
      // Return the exception message
      this.props.errorHandler(error);
    });
}

public componentDidMount(): void {
  if (!this.props.needsConfiguration) {
    // The web part has been configured. Load the weather information
    // for the specified location.
    this._loadWeatherInfo(this.props.location, this.props.unit, this.props.apikey);
  }
}

public componentWillReceiveProps(nextProps: IWeatherProps): void {
  // If the location or the temperature unit have changed,
  // refresh the weather information
  if (nextProps.location && nextProps.unit) {
    this._loadWeatherInfo(nextProps.location, nextProps.unit, nextProps.apikey);
  }
}

public render(): React.ReactElement<IWeatherProps> {
  let contents: JSX.Element;
  // Check if the web part has been configured. Also check,
  // if the weather information has been initiated. This is
  // necessary, because the first time the component renders,
  // it's not loading its data but there is also no weather
  // information available yet
  if (this.props.needsConfiguration === false && this.state.weather) {
    if (this.state.loading) {
      // Component is loading its data. Show spinner to communicate this to the user
      contents = <Spinner size={SpinnerSize.large} label={strings.LoadingSpinnerLabel} />;
    }
    else {

      // render the retrieved weather information
      const weather: IWeatherDescription = this.state.weather;
      const location: IWeatherLocation = this.state.coord;
      console.log(location)
      const main: IWeatherCondition = this.state.main;
      const name: string = this.state.name;
      const image: any = 'http://openweathermap.org/img/w/' + weather.icon + '.png';

      const tempUnit: string = this.props.unit.toUpperCase();
      let tempValue: number = 0;

      // Convert temperature to selected unit scale
      if(tempUnit === 'C') {
        tempValue = main.temp - 273.16;
      }
      else {
        tempValue = (main.temp * 1.8) - 459.67;
      }

      contents = (
        <div className={styles.weather}>
          <div className='temp'>
            <img src={image} />
             {Math.round(tempValue)}&deg;{tempUnit}</div>
          <div className={styles.location}>{name}</div>
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
