import { SPHttpClient } from "@microsoft/sp-http";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface PeopleDirectoryProps {
  webUrl: string;
  spHttpClient: SPHttpClient;
  title: string;
  displayMode: DisplayMode;
  onTitleUpdate: (newTitle: string) => void;
}
