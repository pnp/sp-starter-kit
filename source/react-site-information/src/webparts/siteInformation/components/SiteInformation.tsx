import * as React from 'react';
import styles from './SiteInformation.module.scss';
import { ISiteInformationProps } from './ISiteInformationProps';

// import strings from localized resources
import * as strings from 'SiteInformationWebPartStrings';

// import additional controls/components
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

import {
  Persona,
  PersonaSize,
  PersonaPresence
} from '@fluentui/react/lib/Persona';

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
              {this.props.siteTitle}
            </div>
            <div className={styles.siteOrganization}>
              [{this.props.siteOrganization}]
            </div>
            <div className={styles.siteContact}>
              <Persona
                imageUrl={this.props.siteContactImageUrl}
                imageInitials={this.getInitials(this.props.siteContactEmail)}
                primaryText={this.props.siteContactFullName}
                secondaryText={this.props.siteContactEmail}
                showSecondaryText={((this.props.siteContactEmail !== null) && (this.props.siteContactEmail.length > 0))}
                size={ PersonaSize.size24 }
                presence={ PersonaPresence.none }
                />
            </div>
          </div>
        }
      </div>);
  }

  private getInitials(fullName: string): string {
    if (!fullName) {
      return (undefined);
    }

    const parts: string[] = fullName.split(' ');

    let initials: string = '';
    parts.forEach(p => {
      if (p.length > 0) {
          initials = initials.concat(p.substring(0, 1).toUpperCase());
      }
    });

    return (initials);
  }
}
