import { ILinkGroup } from ".";

export interface IPortalFooterState {
  // state variable to show the result of saving my links
  myLinksSaved?: boolean;
  // used to hold the expanded/collapsed state for menu
  expanded: boolean;
  // used to hold the link groups
  links: ILinkGroup[];
  // used to determine if we are loading the links
  loadingLinks: boolean;
  // used to manage the expand/collapse button icon
  toggleButtonIconName: string;
}