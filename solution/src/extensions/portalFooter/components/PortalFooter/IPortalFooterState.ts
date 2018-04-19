import { ILinkGroup } from ".";

export interface IPortalFooterState {
  expanded: boolean;
  links: ILinkGroup[];
  loadingLinks: boolean;
  toggleButtonIconName: string;
}