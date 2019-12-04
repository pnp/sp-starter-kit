import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ILobIntegrationProps {
  webapiUri: string;
  needsConfiguration: boolean;
  context: WebPartContext;
  configureHandler: () => void;
  errorHandler: (errorMessage: string) => void;
}
