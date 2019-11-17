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
              <span className={ styles.title }>Personal Tasks</span>
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
