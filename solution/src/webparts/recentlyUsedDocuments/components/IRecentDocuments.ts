/**
 * Microsoft Graph Insights Interface
 */
export interface IRecentDocuments {
  '@odata.context': string;
  value: IRecentDocument[];
}

export interface IRecentDocument {
  id: string;
  lastUsed: LastUsed;
  resourceVisualization: ResourceVisualization;
  resourceReference: ResourceReference;
}

export interface ResourceReference {
  webUrl: string;
  id: string;
  type: string;
}

export interface ResourceVisualization {
  title: string;
  type: string;
  mediaType: string;
  previewImageUrl: string;
  previewText: string;
  containerWebUrl: string;
  containerDisplayName: string;
  containerType: string;
}

export interface LastUsed {
  lastAccessedDateTime: string;
  lastModifiedDateTime: string;
}
