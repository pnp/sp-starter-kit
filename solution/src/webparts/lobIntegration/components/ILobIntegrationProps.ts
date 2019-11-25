import { serviceType } from "../ILobIntegrationWebPartProps";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface ILobIntegrationProps {
  functionUri: string;
  webapiUri: string;
  serviceType?: serviceType;
  needsConfiguration: boolean;
  context: WebPartContext;
  configureHandler: () => void;
  errorHandler: (errorMessage: string) => void;
  themeVariant: IReadonlyTheme | undefined;
}
