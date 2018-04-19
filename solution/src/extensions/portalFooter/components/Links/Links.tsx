import * as React from 'react';
import styles from './Links.module.scss';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import * as strings from 'PortalFooterApplicationCustomizerStrings';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { ILinksProps, LinksEditDialog } from '.';

export class Links extends React.Component<ILinksProps, {}> {
  private _handleEdit = () => {
    const dialog: LinksEditDialog = new LinksEditDialog();
    dialog.selectedLinks = this.props.links;
    dialog.show().then(() => {
      this.props.onLinksEdit(dialog.selectedLinks);
    });
  }

  public render(): React.ReactElement<ILinksProps> {
    return (
      <div className={`${styles.links} ${this.props.visible ? styles.visible : styles.hidden}`}>
        <div className={styles.content}>
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              {this.props.links.map(g =>
                <div className="ms-Grid-col ms-sm3" key={g.title}>
                  <div className={styles.linksGroupTitle}>{g.title}</div>
                  <ul>
                    {g.links.map(l => <li key={l.title}>
                      <a href={l.url}>{l.title}</a>
                    </li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <DefaultButton
          href='#'
          title={strings.EditTitle}
          className={styles.editButton}
          onClick={this._handleEdit}
        >{strings.Edit}</DefaultButton>
      </div>
    );
  }
}
