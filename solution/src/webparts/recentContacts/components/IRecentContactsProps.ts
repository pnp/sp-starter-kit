import { IRecentContactsWebPartProps } from "../RecentContactsWebPart";
import { DisplayMode } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-http';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IRecentContactsProps extends IRecentContactsWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  graphClient: MSGraphClient;
  themeVariant: IReadonlyTheme | undefined;
}
