import * as React from 'react';
import styles from './Tiles.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import * as strings from 'TilesWebPartStrings';
import { ITilesProps, ITilesState, ITileListInfo, ITileItem } from '.';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { SPHttpClient } from '@microsoft/sp-http';
import { List } from 'office-ui-fabric-react/lib/components/List';
import { Tile } from './tile';

export class Tiles extends React.Component<ITilesProps, ITilesState> {

  constructor(props: ITilesProps) {
    super(props);

    this.state = {
      tiles: [],
      loading: true,
      error: null
    };
  }

  /**
   * Fetch the items from the tiles list
   */
  private _fetchTileItems() {
    this.setState({
      error: null,
      loading: true
    });

    const { listUrl, context } = this.props;
    if (listUrl) {
      // Create relative URL from the retrieved list URL
      const idx = listUrl.indexOf(document.location.hostname);
      let relativeUrl = listUrl;
      if (idx !== -1) {
        const splitUrl = listUrl.split(document.location.hostname);
        relativeUrl = splitUrl && splitUrl.length > 0 ? splitUrl[splitUrl.length -1] : listUrl;
      }
      // Create the API URL to fetch the list items
      const apiUrl = `${context.pageContext.web.absoluteUrl}/_api/web/GetList('${relativeUrl}')/RenderListDataAsStream`;
      // Call the API
      context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, {
        body: JSON.stringify({
          parameters: {
            ViewXml: `
              <View>
                <ViewFields>
                  <FieldRef Name="ID" />
                  <FieldRef Name="Title" />
                  <FieldRef Name="PnPDescription" />
                  <FieldRef Name="PnPIconName" />
                  <FieldRef Name="PnPUrl" />
                  <FieldRef Name="PnPUrlTarget" />
                </ViewFields>
                <Query />
                <RowLimit />
              </View>
            `
          }
        })
      })
      .then(data => data.json())
      .then((data: ITileListInfo) => {
        // Check if an error occured
        if (data && data.error) {
          this.setState({
            error: strings.Error,
            tiles: [],
            loading: false
          });
          return;
        }

        // Check if tiles were retrieved
        if (data && data.Row && data.Row.length > 0) {
          this.setState({
            tiles: data.Row,
            loading: false
          });
        } else {
          // Nothing was retrieved
          this.setState({
            tiles: [],
            loading: false
          });
        }
      });
    } else {
      this.setState({
        tiles: [],
        loading: false
      });
    }
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    if (this.props.listUrl) {
      this._fetchTileItems();
    } else {
      this.setState({
        tiles: [],
        loading: false
      });
    }
  }

  /**
   * componentDidUpdate lifecycle hook
   */
  public componentDidUpdate(prevProps: ITilesProps, prevState: ITilesState): void {
    if (this.props.listUrl !== prevProps.listUrl) {
      this._fetchTileItems();
    }
  }

  /**
   * Default React remder method
   */
  public render(): React.ReactElement<ITilesProps> {
    return (
      <div className={ styles.tiles }>
        <WebPartTitle displayMode={this.props.displayMode}
                      title={this.props.title}
                      updateProperty={this.props.updateProperty} />

        {
          this.state.loading && <Spinner label={strings.Loading} size={SpinnerSize.large} />
        }

        {
          this.state.tiles && this.state.tiles.length > 0 ? (
            <div className={styles.tilesList}>
              {
                this.state.tiles.map(tile => <Tile key={tile.ID} item={tile} height={this.props.tileHeight} />)
              }
            </div>
          ) : (
            (!this.state.loading && this.props.listUrl) && (
              this.state.error ?
                <span className={styles.error}>{this.state.error}</span> :
                <span className={styles.message}>{strings.NoTilesFound}</span>
            )
          )
        }

        {
          this.props.listUrl ? (
            null
          ) : (
            <span className={styles.message}>{strings.NoListConnection}</span>
          )
        }
      </div>
    );
  }
}
