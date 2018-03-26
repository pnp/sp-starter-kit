import * as React from 'react';
import styles from './WeatherInformation.module.scss';
import { IWeatherInformationProps } from './IWeatherInformationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { IWeatherInformationState } from './IWeatherInformationState';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { HttpClientResponse, HttpClient } from '@microsoft/sp-http';
import { WeatherInformationData, WeatherInformationQueryResults, WeatherInformationCondition, WeatherInformationLocation } from './WeatherInformationData';

export default class WeatherInformation extends React.Component<IWeatherInformationProps, IWeatherInformationState> {
  constructor() {
    super();

    this.state = {
      loading: false
    };
  }

  public componentDidMount(): void {
    if (!this.props.needsConfiguration) {
      this.loadWeatherInfo(this.props.location, this.props.unit);
    }
  }

  public componentWillReceiveProps(nextProps: IWeatherInformationProps): void {
    if (nextProps.location && nextProps.unit) {
      this.loadWeatherInfo(nextProps.location, nextProps.unit);
    }
  }

  private loadWeatherInfo(location: string, unit: string): void {
    this.setState({
      loading: true
    });

    let weatherInfo: WeatherInformationQueryResults;

    console.log(`https://query.yahooapis.com/v1/public/yql?q=select location, item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='${escape(location)}') and u='${unit}'&format=json`);

    this.props.httpClient
      .get(`https://query.yahooapis.com/v1/public/yql?q=select location, item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}") and u='${unit}'&format=json`, HttpClient.configurations.v1)
      .then((response: HttpClientResponse): Promise<WeatherInformationData> => {
        return response.json();
      })
      .then((data: WeatherInformationData): void => {
        if (data.query.results) {
          weatherInfo = data.query.results;

          this.setState({
            loading: false,
            weatherInfo: weatherInfo
          });
        }
        else {
          this.setState({
            loading: false,
            weatherInfo: null
          });
          this.props.errorHandler(`No weather information found for ${location}`);
        }
      }, (error: any): void => {
        this.setState({
          loading: false,
          weatherInfo: null
        });
        this.props.errorHandler(error);
      })
      .catch((error: any): void => {
        this.setState({
          loading: false,
          weatherInfo: null
        });
        this.props.errorHandler(error);
      });
  }

  public render(): React.ReactElement<IWeatherInformationProps> {
    let contents: JSX.Element;
    if (this.props.needsConfiguration === false &&
      this.state.weatherInfo) {
      if (this.state.loading) {
        contents = <Spinner size={SpinnerSize.large} label='Loading weather information...' />;
      }
      else {
        const weather: WeatherInformationCondition = this.state.weatherInfo.channel.item.condition;
        const location: WeatherInformationLocation = this.state.weatherInfo.channel.location;
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
          <Placeholder
            iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={this.props.configureHandler} />
        }
        {contents}
      </div>
    );
  }
}
