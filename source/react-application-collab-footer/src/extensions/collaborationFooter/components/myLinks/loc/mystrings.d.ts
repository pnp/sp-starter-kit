declare interface IMyLinksStrings {

  // generic labels for dialogs
  DialogSaveButton: string;
  DialogCancelButton: string;
  DialogAddButton: string;
  DialogUpdateButton: string;

  // labels for the dialog content
  MyLinksDialogTitle: string;
  MyLinksDialogDescription: string;
  SingleLinkDialogTitle: string;
  SingleLinkDialogDescription: string;
  ConfirmDeleteLink: string;

  // labels for the SingleLink editor dialog
  LinkTitleLabel: string;
  LinkUrlLabel: string;
  InvalidUrlError: string;

  // labels for DetailList of URLs
  TitleColumn: string;
  TitleColumnAriaLabel: string;
  UrlColumn: string;
  UrlColumnAriaLabel: string;
  SelectionColumnAriaLabel: string;
  SelectionAllColumnAriaLabel: string;

  // labels for the CommandBar
  AddLinkCommand: string;
  EditLinkCommand: string;
  DeleteLinkCommand: string;
}

declare module 'MyLinksStrings' {
  const strings: IMyLinksStrings;
  export = strings;
}
