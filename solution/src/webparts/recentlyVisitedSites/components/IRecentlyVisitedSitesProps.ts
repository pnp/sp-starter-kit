import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IRecentlyVisitedSitesWebPartProps } from '../RecentlyVisitedSitesWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IRecentlyVisitedSitesProps extends IRecentlyVisitedSitesWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
}

export interface IRecentlyVisitedSitesState {
  usedSites: IWebs[];
  loading: boolean;
}

export interface IWebs {
  id: string;
  title: string;
  path: string;
}

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
