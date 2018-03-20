import * as React from 'react';
import styles from './PersonalEmail.module.scss';
import { IPersonalEmailProps } from './IPersonalEmailProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PersonalEmail extends React.Component<IPersonalEmailProps, {}> {
  public render(): React.ReactElement<IPersonalEmailProps> {
    return (
      <div className={ styles.personalEmail }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>This will be 'Personal email' web part!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
