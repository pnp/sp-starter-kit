import { ILinkGroup } from "../PortalFooter";

export interface ILinksEditDialogContentsProps {
  close: () => void;
  selectedLinks: ILinkGroup[];
  submit: (selectedLinks: ILinkGroup[]) => void;
}