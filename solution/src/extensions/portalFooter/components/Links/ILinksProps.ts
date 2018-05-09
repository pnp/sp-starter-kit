import { ILinkGroup } from "../PortalFooter";

export interface ILinksProps {
  links: ILinkGroup[];
  loadingLinks: boolean;
  visible: boolean;
  onLinksEdit: (selectedLinks: ILinkGroup[]) => void;
}