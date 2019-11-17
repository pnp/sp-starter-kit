import * as React from 'react';
import styles from './Tiles.module.scss';
import { ITilesProps } from './ITilesProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Tiles extends React.Component<ITilesProps, {}> {
  public render(): React.ReactElement<ITilesProps> {
    return (
      <div className={styles.tiles} >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Tiles!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href='https://aka.ms/spfx' className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
