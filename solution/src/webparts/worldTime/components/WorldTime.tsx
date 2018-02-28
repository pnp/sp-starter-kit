import * as React from 'react';
import styles from './WorldTime.module.scss';
import { IWorldTimeProps } from './IWorldTimeProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WorldTime extends React.Component<IWorldTimeProps, {}> {
  public render(): React.ReactElement<IWorldTimeProps> {
    return (
      <div className={ styles.worldTime }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
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
