import { IPersonalTasksWebPartProps } from "../PersonalTasksWebPart";
import { DisplayMode } from "@microsoft/sp-core-library";
import { MSGraphClient } from "@microsoft/sp-http";

export interface IPersonalTasksProps extends IPersonalTasksWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClient;
  updateProperty: (value: string) => void;
  userName: string;
}
