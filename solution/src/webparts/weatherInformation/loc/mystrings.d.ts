declare interface IWeatherInformationWebPartStrings {
  PropertyPaneDescription: string;
  DataGroupName: string;
  LocationFieldLabel: string;
  UnitFieldLabel: string;
  UnitFieldCelsius: string;
  UnitFieldFahrenheit: string;
}

declare module 'WeatherInformationWebPartStrings' {
  const strings: IWeatherInformationWebPartStrings;
  export = strings;
}
