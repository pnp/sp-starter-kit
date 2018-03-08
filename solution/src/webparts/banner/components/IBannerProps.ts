import { IBannerWebPartProps } from "../BannerWebPart";
import { IPropertyPaneAccessor } from "@microsoft/sp-webpart-base";

export interface IBannerProps extends IBannerWebPartProps {
  propertyPane: IPropertyPaneAccessor;
  domElement: HTMLElement;
}
