import { DisplayMode } from "@microsoft/sp-core-library";
import { ILink } from "./ILink";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface ILinksProps {
  collectionData: ILink[];
  displayMode: DisplayMode;
  title: string;
  themeVariant: IReadonlyTheme | undefined;

  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
}
