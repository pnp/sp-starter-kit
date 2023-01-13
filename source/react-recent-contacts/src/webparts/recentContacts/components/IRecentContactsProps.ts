import { IRecentContactsWebPartProps } from "../RecentContactsWebPart";
import { DisplayMode } from '@microsoft/sp-core-library';
import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IRecentContactsProps extends IRecentContactsWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  graphClient: MSGraphClientV3;
}