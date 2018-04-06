import { IRecentlyUsedDocumentsWebPartProps } from '../RecentlyUsedDocumentsWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IRecentlyUsedDocumentsProps extends IRecentlyUsedDocumentsWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
}
