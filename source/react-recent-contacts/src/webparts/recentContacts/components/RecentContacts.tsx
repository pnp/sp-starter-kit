import * as React from 'react';
import styles from './RecentContacts.module.scss';
import { IRecentContactsProps } from './IRecentContactsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class RecentContacts extends React.Component<IRecentContactsProps, {}> {
  public render(): React.ReactElement<IRecentContactsProps> {
    return (
      <div className={ styles.recentContacts }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Recent Contacts</span>
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
