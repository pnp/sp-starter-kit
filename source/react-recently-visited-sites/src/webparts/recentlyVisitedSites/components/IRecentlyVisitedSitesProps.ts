import { IRecentlyVisitedSitesWebPartProps } from '../RecentlyVisitedSitesWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IRecentlyVisitedSitesProps extends IRecentlyVisitedSitesWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClientV3;
  themeVariant: IReadonlyTheme | undefined;
  updateProperty: (value: string) => void;

}
