import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IFollowedSitesWebPartProps } from "../FollowedSitesWebPart";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IFollowedSitesProps extends IFollowedSitesWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
  themeVariant: IReadonlyTheme | undefined;
}
