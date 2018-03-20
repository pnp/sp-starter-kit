import * as React from 'react';
import styles from './SiteInformation.module.scss';
import { ISiteInformationProps } from './ISiteInformationProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SiteInformation extends React.Component<ISiteInformationProps, {}> {
  public render(): React.ReactElement<ISiteInformationProps> {
    return (
      <div className={ styles.siteInformation }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>This will be 'Site information' web part!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
