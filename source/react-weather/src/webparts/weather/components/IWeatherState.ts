import { IWeatherLocation, IWeatherDescription, IWeatherCondition } from ".";

/**
 * State for the weather information component
 */
export interface IWeatherState {
  /**
   * True if the component is loading its data, false otherwise
   */
  loading: boolean;
  /**
   * Weather information retrieved from the third party API.
   * Undefined, if no information has been loaded
   */
  // weatherInfo?: IWeatherQueryResults;
  coord?: IWeatherLocation;
  weather?: IWeatherDescription;
  main?: IWeatherCondition;
  timezone?: number;
  name?: string;
}
