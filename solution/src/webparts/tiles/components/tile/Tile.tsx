import * as React from 'react';
import styles from './Tile.module.scss';
import { ITileProps } from '.';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

export class Tile extends React.Component<ITileProps, {}> {
  public render(): React.ReactElement<ITileProps> {
    return (
      <div className={styles.tile}>
        <a href={this.props.item.PnPUrl}
          target={this.props.item.PnPUrlTarget && this.props.item.PnPUrlTarget.toLowerCase().indexOf("new") !== -1 ? "_blank" : null}
          title={this.props.item.Title}>
          <div className={styles.tileIcon}>
            <Icon iconName={this.props.item.PnPIconName} />
          </div>
          <div className={styles.tileTitle}>
            {this.props.item.Title}
          </div>

          <div className={styles.overflow}>
            {this.props.item.PnPDescription}
          </div>
        </a>
      </div>
    );
  }
}
