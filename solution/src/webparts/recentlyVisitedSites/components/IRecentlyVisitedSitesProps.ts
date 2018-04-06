import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IRecentlyVisitedSitesWebPartProps } from '../RecentlyVisitedSitesWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IRecentlyVisitedSitesProps extends IRecentlyVisitedSitesWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
}
