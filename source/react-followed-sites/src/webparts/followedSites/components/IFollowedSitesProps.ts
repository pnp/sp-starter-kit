import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IFollowedSitesWebPartProps } from "../FollowedSitesWebPart";

export interface IFollowedSitesProps extends IFollowedSitesWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
}
