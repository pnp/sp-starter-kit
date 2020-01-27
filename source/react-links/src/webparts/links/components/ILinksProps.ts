import { DisplayMode } from '@microsoft/sp-core-library';
import { ILink } from '../ILink';

export interface ILinksProps {
  collectionData: ILink[];
  displayMode: DisplayMode;
  title: string;

  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
}
