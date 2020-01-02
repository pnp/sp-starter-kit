import { HttpClient } from '@microsoft/sp-http';

export interface IWeatherProps {
/**
   * The location for which the weather should be displayed
   */
  location: string;
  /**
   * Unit in which the temperature should be displayed.
   * 'c' for Celsius and 'f' for Fahrenheit
   */
  unit: string;
    /**
   * API Key for the API call
   */
  apikey: string;
  /**
   * True if the web part requires configuration
   * (eg. the location hasn't been specified)
   */
  needsConfiguration: boolean;
  /**
   * Instance of the HttpClient used to retrieve weather information
   * from a third party API
   */
  httpClient: HttpClient;
  /**
   * Event handler for clicking the Configure button in the placeholder
   */
  configureHandler: () => void;
  /**
   * Event handler for an error that occurred while loading weather information
   */
  errorHandler: (errorMessage: string) => void;
}