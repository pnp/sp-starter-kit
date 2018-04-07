import * as React from 'react';
import styles from './SiteInformation.module.scss';
import { ISiteInformationProps } from './ISiteInformationProps';
import { escape } from '@microsoft/sp-lodash-subset';

// import strings from localized resources
import * as strings from 'SiteInformationWebPartStrings';

// import additional controls/components
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class SiteInformation extends React.Component<ISiteInformationProps, {}> {

  constructor(props: ISiteInformationProps) {
    super(props);
  }

  public render(): React.ReactElement<ISiteInformationProps> {

    // show the Placeholder control, if we are missing the configuration, otherwise show the real content
    return (
      <div className={styles.siteInformation}>
        {(this.props.needsConfiguration
          || !this.props.siteTitle
          || !this.props.siteContactLogin
          || !this.props.siteContactEmail
          || !this.props.siteContactFullName
          || !this.props.siteOrganization) ?
          <Placeholder
            iconName={strings.PlaceholderIconName}
            iconText={strings.PlaceholderIconText}
            description={strings.PlaceholderDescription}
            buttonLabel={strings.PlaceholderButtonLabel}
            onConfigure={this.props.configureHandler} /> :
          <div className={styles.siteInformationContent}>
            <div className={styles.siteTitle}>
              <span className={styles.siteTitleCaption}>{strings.SiteTitleCaption}</span>
              {this.props.siteTitle}</div>
            <div className={styles.siteContact}>
              <span className={styles.siteContactCaption}>{strings.SiteContactCaption}</span>
              { this.props.siteContactEmail ?
                <a href={`mailto:${this.props.siteContactEmail}`}>{this.props.siteContactFullName}</a> :
                <span>{this.props.siteContactFullName}</span>
              }
              </div>
            <div className={styles.siteOrganization}>
              <span className={styles.siteOrganizationCaption}>{strings.SiteOrganizationCaption}</span>
              {this.props.siteOrganization}</div>
          </div>
        }
      </div>);
  }
}
