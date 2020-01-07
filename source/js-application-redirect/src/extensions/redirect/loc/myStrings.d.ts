declare interface IRedirectApplicationCustomizerStrings {
  FieldRedirectionEnabledTitle: string;
  FieldDestinationUrlTitle: string;
  FieldSourceUrlTitle: string;
  Title: string;
}

declare module 'RedirectApplicationCustomizerStrings' {
  const strings: IRedirectApplicationCustomizerStrings;
  export = strings;
}
