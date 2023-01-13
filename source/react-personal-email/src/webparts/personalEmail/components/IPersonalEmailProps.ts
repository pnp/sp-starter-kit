import { IPersonalEmailWebPartProps } from "../PersonalEmailWebPart";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface IPersonalEmailProps extends IPersonalEmailWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClientV3;
  themeVariant: IReadonlyTheme | undefined;
  updateProperty: (value: string) => void;
}
