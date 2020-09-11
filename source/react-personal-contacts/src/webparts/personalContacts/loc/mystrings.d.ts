declare interface IPersonalContactsWebPartStrings {
  Error: string;
  Loading: string;
  NoContacts: string;
  NrOfContactsToShow: string;
  PropertyPaneDescription: string;
  ViewAll: string;
}

declare module 'PersonalContactsWebPartStrings' {
  const strings: IPersonalContactsWebPartStrings;
  export = strings;
}