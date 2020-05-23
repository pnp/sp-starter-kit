declare interface IPeopleDirectoryWebPartStrings {
  SearchButtonText: string;
  LoadingSpinnerLabel: string;
  NoPeopleFoundLabel: string;
  SearchBoxPlaceholder: string;
  ErrorLabel: string;
  SkillsLabel: string;
  ProjectsLabel: string;
  CopyEmailLabel: string;
  CopyPhoneLabel: string;
  CopyMobileLabel: string;
}

declare module 'PeopleDirectoryWebPartStrings' {
  const strings: IPeopleDirectoryWebPartStrings;
  export = strings;
}
