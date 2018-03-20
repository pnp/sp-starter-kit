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
              <span className={ styles.title }>This will be 'World time' web part!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
