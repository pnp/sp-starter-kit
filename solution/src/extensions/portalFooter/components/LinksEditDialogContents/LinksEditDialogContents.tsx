import * as React from 'react';
import styles from './Links.module.scss';
import * as strings from 'PortalFooterApplicationCustomizerStrings';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DialogContent, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { ILinksEditDialogContentsProps, ILinksEditDialogContentsState } from '.';

export class LinksEditDialogContents extends React.Component<ILinksEditDialogContentsProps, ILinksEditDialogContentsState> {
   constructor(props: ILinksEditDialogContentsProps) {
     super(props);
     
     this.state = {
       availableLinks: [],
       loading: false,
     };
   }

  public render(): React.ReactElement<ILinksEditDialogContentsProps> {
    return <DialogContent
     title='Color Picker'
     subText={this.props.message}
     onDismiss={this.props.close}
     showCloseButton={true}
   >
     <ColorPicker color={this._pickedColor} onColorChanged={this._onColorChange} />
     <DialogFooter>
       <DefaultButton text='Cancel' onClick={this.props.close} />
       <DefaultButton primary={true} text='OK' onClick={() => { this.props.submit(this._pickedColor); }} />
     </DialogFooter>
   </DialogContent>;
  }
}
