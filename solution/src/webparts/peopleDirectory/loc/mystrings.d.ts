declare interface IPeopleDirectoryWebPartStrings {
  SearchButtonText: string;
  LoadingSpinnerLabel: string;
  NoPeopleFoundLabel: string;
  SearchBoxPlaceholder: string;
  ErrorLabel: string;
}

declare module 'PeopleDirectoryWebPartStrings' {
  const strings: IPeopleDirectoryWebPartStrings;
  export = strings;
}
