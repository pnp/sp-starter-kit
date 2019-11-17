import * as React from 'react';
import styles from './RecentlyVisitedSites.module.scss';
import { IRecentlyVisitedSitesProps } from './IRecentlyVisitedSitesProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class RecentlyVisitedSites extends React.Component<IRecentlyVisitedSitesProps, {}> {
  public render(): React.ReactElement<IRecentlyVisitedSitesProps> {
    return (
      <div className={ styles.recentlyVisitedSites }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Recently Visited Sites</span>
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
