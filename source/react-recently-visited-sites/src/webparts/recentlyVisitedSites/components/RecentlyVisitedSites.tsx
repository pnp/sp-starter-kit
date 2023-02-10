import * as React from 'react';
import styles from './RecentlyVisitedSites.module.scss';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { uniqBy } from '@microsoft/sp-lodash-subset';
import * as strings from 'RecentlyVisitedSitesWebPartStrings';
import { Link } from '@fluentui/react/lib/Link';
import { IRecentlyVisitedSitesProps, IRecentlyVisitedSitesState, IRecentWebs, IRecentWeb, IWebs } from '.';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

export class RecentlyVisitedSites extends React.Component<IRecentlyVisitedSitesProps, IRecentlyVisitedSitesState> {
  /**
   * Constructor
   * @param props
   */
  constructor(props: IRecentlyVisitedSitesProps) {
    super(props);

    this.state = {
      usedSites: [],
      error: null,
      loading: true
    };
  }

  /**
   * Fetch the recent sites via the Microsoft Graph client
   */
  private _fetchRecentSites() {
    if (this.props.graphClient) {
      this.setState({
        loading: true
      });
      // Calling: v1.0/me/insights/used?$filter=ResourceVisualization/Type eq 'Web'
      this.props.graphClient
      .api("me/insights/used")
      .filter(`ResourceVisualization/Type eq 'Web'`)
      .top(30)
      .get((err: { message: string; }, res: IRecentWebs) => {
        if (err) {
          // Something failed calling the MS Graph
          this.setState({
            error: err.message ? err.message : strings.Error,
            usedSites: [],
            loading: false
          });
          return;
        }

        // Check if a response was retrieved
        if (res && res.value && res.value.length > 0) {
          this._processRecentSites(res.value);
        } else {
          // No sites retrieved
          this.setState({
            loading: false,
            usedSites: []
          });
        }
      });
    }
  }

  /**
   * Processes the retrieved web results from the Microsoft Graph
   * @param recentWebs
   */
  private _processRecentSites(recentWebs: IRecentWeb[]): void {
    // Map the MS Graph result
    const rWebs: IWebs[] = recentWebs.map(w => {
      return {
        id: w.id,
        title: w.resourceVisualization.containerDisplayName,
        path: this._updateSitePath(w.resourceVisualization.containerWebUrl)
      };
    });

    // Only retrieve the unique sites
    const uWeb = uniqBy(rWebs, 'path');

    // Get the latest 10 results
    this.setState({
      usedSites: uWeb.slice(0, 10),
      loading: false
    });
  }

  /**
   * Parse the retrieve URLs to return the site collection URLs
   * @param path
   */
  private _updateSitePath(path: string): string {
    if (path) {
      // Split the site on the sites path
      const pathSplit = path.split("/sites/");
      if (pathSplit.length === 2) {
        const siteUrlPath = pathSplit[1].substring(0, pathSplit[1].indexOf("/"));
        // Concatinate the URL
        return `${pathSplit[0]}/sites/${siteUrlPath}`;
      } else {
        // Return the root site
        const matches = path.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        if (matches && matches.length > 0) {
          return matches[0];
        }
      }
    }
    return path;
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this._fetchRecentSites();
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IRecentlyVisitedSitesProps> {
   
    //
    // supporting different themes for page's section
    //
    const color: string | null = (!!this.props.themeVariant && this.props.themeVariant.semanticColors.bodyText) || null;
    const backgroundColor: string | null = (!!this.props.themeVariant && this.props.themeVariant.semanticColors.bodyBackground) || null;

    return (
      <div className={ styles.recentlyVisitedSites }>
        <WebPartTitle displayMode={this.props.displayMode}
                      title={this.props.title}
                      updateProperty={this.props.updateProperty}
                      themeVariant={this.props.themeVariant} />

        {
          this.state.loading && <Spinner label={strings.Loading} size={SpinnerSize.large} />
        }

        {
          this.state.usedSites && this.state.usedSites.length > 0 ? (
            <div className={styles.list} style={{backgroundColor:backgroundColor}}>
              <ul>
                {
                  this.state.usedSites.map(site => (
                    <li key={site.id} className={styles.site} style={{background:backgroundColor}}>
                      <Link href={site.path} title={site.title} style={{color:color}}>{site.title}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          ) : (
            !this.state.loading && (
              this.state.error ?
                <span className={styles.error}>{this.state.error}</span> :
                <span className={styles.noSites}>{strings.NoRecentSitesMsg}</span>
            )
          )
        }
      </div>
    );
  }
}
