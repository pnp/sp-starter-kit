export interface IHubSiteData {
  logoUrl: string;

  name: string;

  // tslint:disable-next-line: no-any
  navigation: any[];

  themeKey: string;

  url: string;

  usesMetadataNavigation: boolean;
}

export interface IHubSiteDataResponse {
  '@odata.null'?: boolean;
  value?: string;
}
