import * as React from 'react';
import styles from './SiteClassificationHeader.module.scss';
import { ISiteClassificationHeaderProps } from './ISiteClassificationHeaderProps';

import * as strings from 'SiteClassificationApplicationCustomizerStrings';

// import additional controls/components
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class SiteClassificationHeader extends React.Component<ISiteClassificationHeaderProps, {}> {

  // main constructor for the component
  constructor(props: ISiteClassificationHeaderProps) {
    super(props);
  }

  public render(): React.ReactElement<ISiteClassificationHeaderProps> {
    return (
      <div className={styles.classificationHeader}>
        <div className={styles.classificationContainer}>
          <Icon iconName='ProtectionCenterLogo32' className={styles.classificationIcon} />
          <span className={styles.classificationCaption}>{strings.ClassificationCaption}</span>
          <span className={styles.classification}>{this.props.classification}</span>
        </div>
      </div>
    );
  }
}
