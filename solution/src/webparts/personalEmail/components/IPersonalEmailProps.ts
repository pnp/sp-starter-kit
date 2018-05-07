import { IPersonalEmailWebPartProps } from "../PersonalEmailWebPart";
import { MSGraphClient } from "@microsoft/sp-client-preview";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface IPersonalEmailProps extends IPersonalEmailWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClient;
  updateProperty: (value: string) => void;
}
