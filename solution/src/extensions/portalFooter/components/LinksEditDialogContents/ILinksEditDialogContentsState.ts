import { ILinkGroup } from "../PortalFooter";

export interface ILinksEditDialogContentsState {
  availableLinks: ILinkGroup[];
  loading: boolean;
}