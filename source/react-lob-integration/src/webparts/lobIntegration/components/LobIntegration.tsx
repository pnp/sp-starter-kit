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
              <span className={ styles.title }>LOB Integration!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
