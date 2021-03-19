import { IRecentlyVisitedSitesWebPartProps } from '../RecentlyVisitedSitesWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-http';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IRecentlyVisitedSitesProps extends IRecentlyVisitedSitesWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClient;
  themeVariant: IReadonlyTheme | undefined;
  updateProperty: (value: string) => void;

}
