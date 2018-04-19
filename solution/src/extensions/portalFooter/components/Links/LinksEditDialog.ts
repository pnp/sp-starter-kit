import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { ILinkGroup } from '../PortalFooter';

export class LinksEditDialog extends BaseDialog {
  public selectedLinks: ILinkGroup[];

  private _handleSubmit(links: ILinkGroup[]): void {
    this.selectedLinks = links;
    this.close();
  }

  public render(): void {
    ReactDOM.render(<ColorPickerDialogContent
        close={ this.close }
        message = { this.message }
        defaultColor = { this.colorCode }
        submit = { this._submit }
      />, this.domElement);
  }

  public getConfig(): IDialogConfiguration {
    return {
      isBlocking: true
    };
  }
}