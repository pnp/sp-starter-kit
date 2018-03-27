declare interface IFollowedSitesWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  // Web part properties
  NrOfFollowedItemsLabel: string;
  SortOrderFollowedItemsLabel: string;
  SortOrderDefaultLabel: string;
  SortOrderNameLabel: string;

  // Web part
  NoFollowedSitesMsg: string;
  SitesFilterLabel: string;
  NoFollowSitesFoundMsg: string;
}

declare module 'FollowedSitesWebPartStrings' {
  const strings: IFollowedSitesWebPartStrings;
  export = strings;
}
