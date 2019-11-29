declare interface IRecentlyVisitedSitesWebPartStrings {
  // Web part
  NoRecentSitesMsg: string;
  Loading: string;
  Error: string;
}

declare module 'RecentlyVisitedSitesWebPartStrings' {
  const strings: IRecentlyVisitedSitesWebPartStrings;
  export = strings;
}
