import { WeatherInformationQueryResults } from "./WeatherInformationData";

export interface IWeatherInformationState {
  loading: boolean;
  weatherInfo?: WeatherInformationQueryResults;
}
