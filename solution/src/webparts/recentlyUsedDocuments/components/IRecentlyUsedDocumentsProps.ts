import { IRecentlyUsedDocumentsWebPartProps } from '../RecentlyUsedDocumentsWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IRecentlyUsedDocumentsProps extends IRecentlyUsedDocumentsWebPartProps {
  context: WebPartContext;
  displayMode: DisplayMode;
  graphClient: MSGraphClient;
  updateProperty: (value: string) => void;
}
