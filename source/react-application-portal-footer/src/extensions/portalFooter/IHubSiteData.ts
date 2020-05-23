export interface IHubSiteDataResponse {
    ["odata.metadata"]: string;
    value: string;
}

export interface IHubSiteData {
    themeKey: string;
    name: string;
    url: string;
    logoUrl: string;
    usesMetadataNavigation: boolean;
    navigation: {
        Id: number;
        Title: string;
        Url: string;
        IsDocLib: boolean;
        IsExternal: boolean;
        ParentId: number;
        ListTemplateType: number;
        Children: any[]
    }[];
}