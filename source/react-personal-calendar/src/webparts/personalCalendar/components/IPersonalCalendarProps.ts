import { IPersonalCalendarWebPartProps } from "../PersonalCalendarWebPart";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IPersonalCalendarProps extends IPersonalCalendarWebPartProps {
  displayMode: DisplayMode;
  themeVariant: IReadonlyTheme | undefined;
  updateProperty: (value: string) => void;
}
