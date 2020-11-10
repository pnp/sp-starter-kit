import { IPersonalCalendarWebPartProps } from "../PersonalCalendarWebPart";
import { DisplayMode } from "@microsoft/sp-core-library";
import { MSGraphClient } from "@microsoft/sp-http";

export interface IPersonalCalendarProps extends IPersonalCalendarWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
