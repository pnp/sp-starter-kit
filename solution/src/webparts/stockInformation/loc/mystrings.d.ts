declare interface IStockInformationWebPartStrings {
  
  // Property Pane labels and strings
  PropertyPaneDescription: string;
  BasicGroupName: string;
  StockSymbolFieldLabel: string;
  AutoRefreshFieldLabel: string;
  DemoFieldLabel: string;

  // Placeholder labels and strings
  PlaceholderIconName: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;

  // UI labels and strings
  LoadingDataLabel: string;
  NoDataForStockSymbol: string;
  NoAPIKeyInTenantProperties: string;
}

declare module 'StockInformationWebPartStrings' {
  const strings: IStockInformationWebPartStrings;
  export = strings;
}
