import * as React from 'react';
import styles from './Links.module.scss';
import * as strings from 'PortalFooterApplicationCustomizerStrings';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { ILinksProps } from '.';

export class Links extends React.Component<ILinksProps, {}> {

  private _handleEdit = async (): Promise<void> => {
    return(await this.props.onMyLinksEdit());
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
          title={strings.EditTitle}
          className={styles.editButton}
          onClick={this._handleEdit}
        >{strings.Edit}</DefaultButton>
      </div>
    );
  }
}