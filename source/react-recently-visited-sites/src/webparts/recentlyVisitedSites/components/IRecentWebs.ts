/**
 * Microsoft Graph Insights Interface
 */
export interface IRecentWebs {
  '@odata.context': string;
  value: IRecentWeb[];
}

export interface IRecentWeb {
  id: string;
  lastUsed: LastUsed;
  resourceVisualization: ResourceVisualization;
  resourceReference: ResourceReference;
}

export interface ResourceReference {
}

export interface ResourceVisualization {
  title: string;
  type: string;
  mediaType: string;
  previewImageUrl: string;
  previewText: string;
  containerWebUrl: string;
  containerDisplayName: string;
}

export interface LastUsed {
  lastAccessedDateTime: string;
  lastModifiedDateTime: string;
}
