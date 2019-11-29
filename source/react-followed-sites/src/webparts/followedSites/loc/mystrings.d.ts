declare interface IFollowedSitesWebPartStrings {
  PropertyPaneDescription: string;

  // Web part properties
  NrOfFollowedItemsLabel: string;
  SortOrderFollowedItemsLabel: string;
  SortOrderDefaultLabel: string;
  SortOrderNameLabel: string;

  // Web part
  NoFollowedSitesMsg: string;
  SitesFilterLabel: string;
  NoFollowSitesFoundMsg: string;
  loading: string;
  error: string;
}

declare module 'FollowedSitesWebPartStrings' {
  const strings: IFollowedSitesWebPartStrings;
  export = strings;
}
