declare interface IWorldTimeWebPartStrings {

  // Property Pane labels and strings
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  TimeZoneOffsetFieldLabel: string;

  // Placeholder labels and strings
  PlaceholderIconName: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;

  // Default strings for UI
  LocalTimeDescription: string;
}

declare module 'WorldTimeWebPartStrings' {
  const strings: IWorldTimeWebPartStrings;
  export = strings;
}
