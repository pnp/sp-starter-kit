import * as React from 'react';
import styles from './PersonalContacts.module.scss';
import { IPersonalContactsProps } from './IPersonalContactsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PersonalContacts extends React.Component<IPersonalContactsProps, {}> {
  public render(): React.ReactElement<IPersonalContactsProps> {
    return (
      <div className={ styles.personalContacts }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>This will be 'Personal contacts' web part!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
