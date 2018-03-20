import * as React from 'react';
import styles from './PersonalTasks.module.scss';
import { IPersonalTasksProps } from './IPersonalTasksProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PersonalTasks extends React.Component<IPersonalTasksProps, {}> {
  public render(): React.ReactElement<IPersonalTasksProps> {
    return (
      <div className={ styles.personalTasks }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>This will be 'Personal tasks' web part!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
