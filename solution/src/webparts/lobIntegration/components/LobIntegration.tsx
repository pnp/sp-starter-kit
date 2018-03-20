import * as React from 'react';
import styles from './LobIntegration.module.scss';
import { ILobIntegrationProps } from './ILobIntegrationProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class LobIntegration extends React.Component<ILobIntegrationProps, {}> {
  public render(): React.ReactElement<ILobIntegrationProps> {
    return (
      <div className={ styles.lobIntegration }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>This will be 'LOB' web part!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
