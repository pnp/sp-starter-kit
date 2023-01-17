import * as React from 'react';
import styles from './FollowedSites.module.scss';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { SortOrder } from '../FollowedSitesWebPart';
import { Link } from '@fluentui/react/lib/Link';
import { TextField } from '@fluentui/react/lib/TextField';
import { IFollowedSitesProps, IFollowedSitesState, IFollowedResult, IFollowed } from '.';
import { Paging } from './paging';
import { Spinner, SpinnerSize } from '@fluentui/react/lib//Spinner';
import { SpStarterKitSharedLibrary, LocaleKeys } from '@starter-kit/shared-library';

export default class FollowedSites extends React.Component<IFollowedSitesProps, IFollowedSitesState> {
  private _allFollowing: IFollowedResult[] = [];

  constructor(props: IFollowedSitesProps) {
    super(props);

    this.state = {
      following: null,
      allFollowing: [],
      loading: true,
      error: null
    };
  }

  /**
   * Retrieves all the current user its followed sites
   */
  private _fetchFollowedSites(): void {
    this.setState({
      loading: true,
      error: null
    });

    // Types 4 === sites
    const apiUrl = `${this.props.context.pageContext.web.absoluteUrl}/_api/social.following/my/followed(types=4)`;
    this.props.context.spHttpClient.fetch(apiUrl, SPHttpClient.configurations.v1, {
      method: "GET"
    })
    .then((data: SPHttpClientResponse) => data.json())
    .then((data: IFollowed) => {
      // Check if data was retrieved
      if (data && data.value) {
        let fSites = data.value;
        // Check if items need to be sorted by their name
        if (this.props.sortOrder && this.props.sortOrder === SortOrder.name) {
          fSites = fSites.sort(this._sortByName);
        } else {
          // Last added item is last in the list, so we use reverse to turn it around
          fSites = data.value.reverse();
        }

        // Locally store the followed site results
        this._allFollowing = [...fSites];

        // Pass sites to trigger state update
        this._updateFollowingSites(fSites);
      }

      // Check if an error occured
      if (data && data.error) {
        // Error occured while fetching personal sites
        this.setState({
          loading: false,
          error: SpStarterKitSharedLibrary.getLocale(LocaleKeys.SitesLoadingError)
        });
      }
    })
    .catch((err) => {
      this.setState({
        loading: false,
        error: SpStarterKitSharedLibrary.getLocale(LocaleKeys.SitesLoadingError)
      });
    });
  }

  /**
   * Updates the current following site state
   */
  private _updateFollowingSites = (fSites: IFollowedResult[]): void => {
    const allSites = [...fSites];
    // Check if the array has to be limited
    if (this.props.nrOfItems) {
      fSites = fSites.slice(0, this.props.nrOfItems);
    }

    this.setState({
      following: fSites,
      allFollowing: allSites,
      loading: false
    });
  }

  /**
   * Sort array by their name
   * @param a First item
   * @param b Second item
   */
  private _sortByName(a: IFollowedResult, b: IFollowedResult): number {
    if(a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
    if(a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
    return 0;
  }

  /**
   * Update the current site results array
   */
  private _updatePagedItems = (pagedItems: IFollowedResult[]): void => {
    if (pagedItems) {
      this.setState({
        following: pagedItems
      });
    }
  }

  private _onFilterChanged = (event: React.FormEvent<HTMLElement>, val?: string) => {
    // Check if a value was provided
    if (val) {
      const allSites = [...this._allFollowing];
      const filteredItems = allSites.filter(f => f.Name.toLowerCase().indexOf(val.toLowerCase()) !== -1);
      this._updateFollowingSites(filteredItems);
    } else {
      this._updateFollowingSites(this._allFollowing);
    }
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this._fetchFollowedSites();
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IFollowedSitesProps, prevState: IFollowedSitesState): void {
    if (this.props.nrOfItems !== prevProps.nrOfItems ||
        this.props.sortOrder !== prevProps.sortOrder) {
      this._fetchFollowedSites();
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IFollowedSitesProps> {
    return (
      <div className={styles.followedSites}>
        <WebPartTitle displayMode={this.props.displayMode}
                      title={this.props.title}
                      updateProperty={this.props.updateProperty} />

        {
          this.state.loading && (
            <Spinner label={SpStarterKitSharedLibrary.getLocale(LocaleKeys.SitesLoading)} size={SpinnerSize.large} />
          )
        }

        {
          this.state.following ? (
            <div className={styles.list}>
              <div className={styles.filter}>
                <TextField placeholder={SpStarterKitSharedLibrary.getLocale(LocaleKeys.SitesFilterLabel)}
                           iconProps={{ iconName: 'Filter' }}
                           underlined
                           onChange={this._onFilterChanged} />
              </div>

              <ul>
                {
                  this.state.following.length > 0 ? (
                    this.state.following.map(follow => (
                      <li key={follow.Id} className={styles.site}>
                        <Link href={follow.Uri} title={follow.Name}>{follow.Name}</Link>
                      </li>
                    ))
                  ) : (
                    <li className={styles.site}>{SpStarterKitSharedLibrary.getLocale(LocaleKeys.NoFollowSitesFoundMsg)}</li>
                  )
                }
              </ul>

              <Paging allItems={this.state.allFollowing}
                      nrOfItems={this.props.nrOfItems}
                      fUpdateItems={this._updatePagedItems} />
            </div>
          ) : (
            !this.state.loading && (
              this.state.error ?
                <span className={styles.error}>{this.state.error}</span> :
                <span className={styles.noSites}>{SpStarterKitSharedLibrary.getLocale(LocaleKeys.NoFollowedSitesMsg)}</span>
            )
          )
        }
      </div>
    );
  }
}


