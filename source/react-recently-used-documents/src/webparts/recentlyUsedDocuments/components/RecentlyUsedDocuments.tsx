import * as React from 'react';
import styles from './RecentlyUsedDocuments.module.scss';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import * as strings from 'RecentlyUsedDocumentsWebPartStrings';
import { List } from '@fluentui/react/lib/List';
import { DocumentCard, DocumentCardActivity, DocumentCardPreview, DocumentCardTitle, IDocumentCardPreviewProps } from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import { DocumentCardType } from '@fluentui/react/lib/DocumentCard';
import { IRecentlyUsedDocumentsProps, IRecentlyUsedDocumentsState, IRecentDocuments, IRecentDocument, BrandIcons } from '.';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

export default class RecentlyUsedDocuments extends React.Component<IRecentlyUsedDocumentsProps, IRecentlyUsedDocumentsState> {
  private _excludeTypes: string[] = ["Web", "spsite", "Folder", "Archive", "Image", "Other"];

  constructor(props: IRecentlyUsedDocumentsProps) {
    super(props);

    this.state = {
      recentDocs: [],
      error: null,
      loading: true
    };
  }

  /**
   * Fetch the recent documents via the Microsoft Graph client
   */
  private _fetchRecentDocuments() {
    if (this.props.graphClient) {
      this.setState({
        loading: true,
        error: null
      });

      const filter = this._excludeTypes.map(type => `resourceVisualization/type ne '${type}'`).join(' and ');

      this.props.graphClient
      .api("me/insights/used")
      .filter(`resourceVisualization/containerType eq 'Site' and ${filter}`)
      .get((err: { message: string; }, res: IRecentDocuments) => {
        if (err) {
          // Something failed calling the MS Graph
          this.setState({
            error: err.message ? err.message : strings.Error,
            recentDocs: [],
            loading: false
          });
          return;
        }

        // Check if a response was retrieved
        if (res && res.value && res.value.length > 0) {
          console.log(res.value);
          this._processRecentDocuments(res.value);
        } else {
          // No documents retrieved
          this.setState({
            recentDocs: [],
            loading: false
          });
        }
      });
    }
  }

  /**
   * Processes the retrieved document results from the Microsoft Graph
   * @param recentWebs
   */
  private _processRecentDocuments(recentDocs: IRecentDocument[]): void {
    // Return the sorted and sliced array
    this.setState({
      recentDocs: recentDocs.sort(this._sortByDate).slice(0, this.props.nrOfItems ? this.props.nrOfItems : 10),
      loading: false
    });
  }

  /**
   * Sort the array by the last accessed date
   */
  private _sortByDate = (a: IRecentDocument, b: IRecentDocument): number => {
    const aDate = new Date(a.lastUsed.lastAccessedDateTime);
    const bDate = new Date(b.lastUsed.lastAccessedDateTime);
    return this._getTime(bDate) - this._getTime(aDate);
  }

  /**
   * Convert the date to a number
   * @param date
   */
  private _getTime(date?: Date) {
    return date !== null ? date.getTime() : 0;
  }

  /**
   * Renders the list cell
   */
  private _onRenderCell = (item: IRecentDocument, index: number | undefined): JSX.Element => {
    // Create the preview image properties
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          name: item.resourceVisualization.title,
          url: item.resourceReference.webUrl,
          previewImageSrc: item.resourceVisualization.previewImageUrl,
          iconSrc: BrandIcons[item.resourceVisualization.type],
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        }
      ],
    };

    // Return a document card for the retrieved item
    return (
      <div className={styles.document}>
        <DocumentCard onClickHref={item.resourceReference.webUrl}
                      type={DocumentCardType.compact}>
          <div className={styles.documentPreview}>
            <DocumentCardPreview  {...previewProps} />
          </div>
          <div className={styles.documentDetails}>
            <DocumentCardTitle title={item.resourceVisualization.title}
                               shouldTruncate={true} />
            <DocumentCardActivity activity={`${strings.LastUsedMsg} ${this._relativeDate(item.lastUsed.lastAccessedDateTime)}`}
                                  people={[{
                                    name: this.props.context.pageContext.user.displayName,
                                    profileImageSrc: `/_layouts/15/userphoto.aspx?size=S&username=${this.props.context.pageContext.user.loginName}`
                                  }]} />
          </div>
        </DocumentCard>
      </div>
    );
  }

  /**
   * Returns the relative date for the document activity
   */
  private _relativeDate(crntDate: string): string {
    const date = new Date(crntDate);
    const diff = (((new Date()).getTime() - date.getTime()) / 1000);
    const day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0) {
      return;
    }

    return day_diff === 0 && (
           diff < 60 && strings.DateJustNow ||
           diff < 120 && strings.DateMinute ||
           diff < 3600 && `${Math.floor( diff / 60 )} ${strings.DateMinutesAgo}` ||
           diff < 7200 && strings.DateHour ||
           diff < 86400 && `${Math.floor( diff / 3600 )} ${strings.DateHoursAgo}`) ||
           day_diff == 1 && strings.DateDay ||
           day_diff <= 30 && `${day_diff} ${strings.DateDaysAgo}` ||
           day_diff > 30 && `${Math.ceil(day_diff / 7)} ${strings.DateWeeksAgo}`;
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this._fetchRecentDocuments();
  }

  /**
   * componentDidUpdate lifecycle hook
   */
  public componentDidUpdate(prevProps: IRecentlyUsedDocumentsProps, prevState: IRecentlyUsedDocumentsState): void {
    if (prevProps.nrOfItems !== this.props.nrOfItems) {
      this._fetchRecentDocuments();
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IRecentlyUsedDocumentsProps> {
    return (
      <div className={styles.recentlyUsedDocuments}>
        <WebPartTitle displayMode={this.props.displayMode}
                      title={this.props.title}
                      updateProperty={this.props.updateProperty} />

        {
          this.state.loading && <Spinner label={strings.Loading} size={SpinnerSize.large} />
        }

        {
          this.state.recentDocs && this.state.recentDocs.length > 0 ? (
            <List items={this.state.recentDocs}
                  renderedWindowsAhead={4}
                  onRenderCell={this._onRenderCell} />
          ) : (
            !this.state.loading && (
              this.state.error ?
                <span className={styles.error}>{this.state.error}</span> :
                <span className={styles.noDocs}>{strings.NoRecentDocuments}</span>
            )
          )
        }
      </div>
    );
  }
}