declare interface IWeatherWebPartStrings {
  PropertyPaneDescription: string;
  DataGroupName: string;
  LocationFieldLabel: string;
  UnitFieldLabel: string;
  UnitFieldCelsius: string;
  UnitFieldFahrenheit: string;
  ConfigGroupName: string;
  ApiKeyFieldLabel: string;
  NoWeatherInformationFoundMessage: string;
  LoadingSpinnerLabel: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
  LocationNotSpecifiedError: string;
  LocationDoubleQuoteNotAllowed: string;
}

declare module 'WeatherWebPartStrings' {
  const strings: IWeatherWebPartStrings;
  export = strings;
}
