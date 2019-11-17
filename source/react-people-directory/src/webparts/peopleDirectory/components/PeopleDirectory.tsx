import * as React from 'react';
import styles from './PeopleDirectory.module.scss';
import { IPeopleDirectoryProps } from './IPeopleDirectoryProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PeopleDirectory extends React.Component<IPeopleDirectoryProps, {}> {
  public render(): React.ReactElement<IPeopleDirectoryProps> {
    return (
      <div className={ styles.peopleDirectory }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>People Directory</span>
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
