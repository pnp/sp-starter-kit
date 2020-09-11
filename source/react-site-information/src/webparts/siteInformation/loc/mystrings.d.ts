declare interface ISiteInformationWebPartStrings {

  // Property Pane labels and strings
  PropertyPaneDescription: string;
  BasicGroupName: string;
  SiteTitleFieldLabel: string;
  SiteContactFieldLabel: string;
  SiteOrganizationFieldLabel: string;
  SiteOrganizationPanelTitle: string;

  // Placeholder labels and strings
  PlaceholderIconName: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;

  // UI labels and strings
  SiteTitleCaption: string;
  SiteContactCaption: string;
  SiteOrganizationCaption: string;
}

declare module 'SiteInformationWebPartStrings' {
  const strings: ISiteInformationWebPartStrings;
  export = strings;
}
