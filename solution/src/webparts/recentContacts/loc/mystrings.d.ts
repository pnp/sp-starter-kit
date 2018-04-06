declare interface IRecentContactsWebPartStrings {
  PropertyPaneDescription: string;

  NrOfContactsToShow: string;

  NoContacts: string;
  Loading: string;
  Error: string;
}

declare module 'RecentContactsWebPartStrings' {
  const strings: IRecentContactsWebPartStrings;
  export = strings;
}
