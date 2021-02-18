import { IPersonalEmailWebPartProps } from "../PersonalEmailWebPart";
import { MSGraphClient } from "@microsoft/sp-http";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface IPersonalEmailProps extends IPersonalEmailWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClient;
  themeVariant: IReadonlyTheme | undefined;
  updateProperty: (value: string) => void;
}
