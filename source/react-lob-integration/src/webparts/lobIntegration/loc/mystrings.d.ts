declare interface ILobIntegrationWebPartStrings {

  // Property Pane labels and strings
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ApplicationUriFieldLabel: string;
  FunctionUriFieldLabel: string;
  ServiceUrlFieldLabel: string;

  // Placeholder labels and strings
  PlaceholderIconName: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;

  // UI labels and strings
  LoadingDataLabel: string;
  SearchFor: string;
  SearchButtonText: string;
  SearchDescription: string;
  ListButtonText: string;
  ListDescription: string;

  // labels for list of customers
  CustomerIDColumn: string;
  CustomerIDColumnAriaLabel: string;
  CompanyNameColumn: string;
  CompanyNameColumnAriaLabel: string;
  ContactNameColumn: string;
  ContactNameColumnAriaLabel: string;
  CountryColumn: string;
  CountryColumnAriaLabel: string;
}

declare module 'LobIntegrationWebPartStrings' {
  const strings: ILobIntegrationWebPartStrings;
  export = strings;
}
