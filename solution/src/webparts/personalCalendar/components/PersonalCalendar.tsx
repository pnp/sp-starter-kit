import * as React from 'react';
import styles from './PersonalCalendar.module.scss';
import { IPersonalCalendarProps } from './IPersonalCalendarProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PersonalCalendar extends React.Component<IPersonalCalendarProps, {}> {
  public render(): React.ReactElement<IPersonalCalendarProps> {
    return (
      <div className={ styles.personalCalendar }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>This will be 'Personal calendar' web part!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
