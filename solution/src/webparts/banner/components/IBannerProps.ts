import { IBannerWebPartProps } from "../BannerWebPart";
import { IPropertyPaneAccessor } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IBannerProps extends IBannerWebPartProps {
  propertyPane: IPropertyPaneAccessor;
  domElement: HTMLElement;
  themeVariant: IReadonlyTheme | undefined;
}
