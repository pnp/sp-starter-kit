import { IRecentContactsWebPartProps } from "../RecentContactsWebPart";
import { DisplayMode } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IRecentContactsProps extends IRecentContactsWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  graphClient: MSGraphClient;
}
