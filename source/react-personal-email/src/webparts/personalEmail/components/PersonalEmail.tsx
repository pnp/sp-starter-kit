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
              <span className={ styles.title }>Personal Email</span>
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
