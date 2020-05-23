declare interface IPortalFooterApplicationCustomizerStrings {
  Title: string;
  MyLinks: string;
  ToggleButtonOpen: string;
  ToggleButtonClose: string;
  Edit: string;
  EditTitle: string;
  MyLinksSaveSuccess: string;
  MyLinksSaveFailed: string;
}

declare module 'PortalFooterApplicationCustomizerStrings' {
  const strings: IPortalFooterApplicationCustomizerStrings;
  export = strings;
}
