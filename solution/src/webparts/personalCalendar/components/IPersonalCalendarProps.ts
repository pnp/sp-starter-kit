import { IPersonalCalendarWebPartProps } from "../PersonalCalendarWebPart";
import { DisplayMode } from "@microsoft/sp-core-library";
import { MSGraphClient } from "@microsoft/sp-http";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IPersonalCalendarProps extends IPersonalCalendarWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClient;
  updateProperty: (value: string) => void;
  themeVariant: IReadonlyTheme | undefined;
}
