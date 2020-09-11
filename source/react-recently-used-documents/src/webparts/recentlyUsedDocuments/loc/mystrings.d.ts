declare interface IRecentlyUsedDocumentsWebPartStrings {
  PropertyPaneDescription: string;
  NrOfDocumentsToShow: string;

  // Web part
  NoRecentDocuments: string;
  LastUsedMsg: string;
  Loading: string;
  Error: string;

  // Relative date strings
  DateJustNow: string;
  DateMinute: string;
  DateMinutesAgo: string;
  DateHour: string;
  DateHoursAgo: string;
  DateDay: string;
  DateDaysAgo: string;
  DateWeeksAgo: string;
}

declare module 'RecentlyUsedDocumentsWebPartStrings' {
  const strings: IRecentlyUsedDocumentsWebPartStrings;
  export = strings;
}