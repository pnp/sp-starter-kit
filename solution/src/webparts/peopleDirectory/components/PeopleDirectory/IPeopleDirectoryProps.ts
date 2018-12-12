import { SPHttpClient } from "@microsoft/sp-http";
import { DisplayMode } from "@microsoft/sp-core-library";

/**
 * Properties for the people directory component
 */
export interface IPeopleDirectoryProps {
  /**
   * Absolute URL of the current site
   */
  webUrl: string;
  /**
   * Instance of the SPHttpClient. Used to retrieve information about
   * people.
   */
  spHttpClient: SPHttpClient;
  /**
   * Web part title to be displayed in the web part
   */
  title: string;
  /**
   * Current page display mode. Used to determine if the user should
   * be able to edit the page title or not.
   */
  displayMode: DisplayMode;
   /**
   * Current locale
   */
  locale: string;
  /**
   * Event handler for changing the web part title
   */
  onTitleUpdate: (newTitle: string) => void;
}
