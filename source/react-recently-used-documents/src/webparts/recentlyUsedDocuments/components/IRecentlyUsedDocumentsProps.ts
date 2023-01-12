import { IRecentlyUsedDocumentsWebPartProps } from '../RecentlyUsedDocumentsWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IRecentlyUsedDocumentsProps extends IRecentlyUsedDocumentsWebPartProps {
  context: WebPartContext;
  displayMode: DisplayMode;
  graphClient: MSGraphClientV3;
  updateProperty: (value: string) => void;
}