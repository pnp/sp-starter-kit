import { IWeatherInformationQueryResults } from ".";

/**
 * State for the weather information component
 */
export interface IWeatherInformationState {
  /**
   * True if the component is loading its data, false otherwise
   */
  loading: boolean;
  /**
   * Weather information retrieved from the third part API.
   * Undefined, if no information has been loaded
   */
  weatherInfo?: IWeatherInformationQueryResults;
}
