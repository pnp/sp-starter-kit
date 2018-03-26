import { HttpClient } from "@microsoft/sp-http";

export interface IWeatherInformationProps {
  location: string;
  unit: string;
  needsConfiguration: boolean;
  httpClient: HttpClient;
  configureHandler: () => void;
  errorHandler: (errorMessage: string) => void;
}
