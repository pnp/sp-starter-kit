declare interface IWeatherInformationWebPartStrings {
  PropertyPaneDescription: string;
  DataGroupName: string;
  LocationFieldLabel: string;
  UnitFieldLabel: string;
  UnitFieldCelsius: string;
  UnitFieldFahrenheit: string;
  NoWeatherInformationFoundMessage: string;
  LoadingSpinnerLabel: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
  LocationNotSpecifiedError: string;
  LocationDoubleQuoteNotAllowed: string;
}

declare module 'WeatherInformationWebPartStrings' {
  const strings: IWeatherInformationWebPartStrings;
  export = strings;
}