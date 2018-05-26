declare interface ILinksWebPartStrings {
  groupDataLabel: string;
  groupPanelHeader: string;
  manageGroupBtn: string;
  iconInformation: string;

  linkDataLabel: string;
  linkPanelHeader: string;
  manageLinksBtn: string;

  titleField: string;
  urlField: string;
  iconField: string;
  groupField: string;
  targetField: string;

  targetCurrent: string;
  targetNew: string;

  noLinksIconText: string;
  noLinksConfigured: string;
  noLinksBtn: string;
}

declare module 'LinksWebPartStrings' {
  const strings: ILinksWebPartStrings;
  export = strings;
}
