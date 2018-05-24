import * as React from 'react';
import * as strings from 'TilesWebPartStrings';
import styles from './Tiles.module.scss';
import { ITilesProps } from '.';
import { Tile } from './tile';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { List } from 'office-ui-fabric-react/lib/components/List';

export class Tiles extends React.Component<ITilesProps, {}> {

  /**
   * Default React remder method
   */
  public render(): React.ReactElement<ITilesProps> {
    return (
      <div className={ styles.tiles }>
        <WebPartTitle displayMode={this.props.displayMode}
                      title={this.props.title}
                      updateProperty={this.props.fUpdateProperty} />

        {
          this.props.collectionData && this.props.collectionData.length > 0 ? (
            <div className={styles.tilesList}>
              {
                this.props.collectionData.map((tile, idx) => <Tile key={idx} item={tile} height={this.props.tileHeight} />)
              }
            </div>
          ) : (
            <Placeholder
              iconName='Edit'
              iconText={strings.noTilesIconText}
              description={strings.noTilesConfigured}
              buttonLabel={strings.noTilesBtn}
              onConfigure={this.props.fPropertyPaneOpen} />
          )
        }
      </div>
    );
  }
}
