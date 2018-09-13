import * as React from 'react';
import styles from './RecentContacts.module.scss';
import { IRecentContactsProps, IRecentContactsState, IContacts, IContact } from '.';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { MSGraphClient } from "@microsoft/sp-http";
import * as strings from 'RecentContactsWebPartStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { List } from 'office-ui-fabric-react/lib/components/List';
import { Person } from './person';

export class RecentContacts extends React.Component<IRecentContactsProps, IRecentContactsState> {
  constructor(props: IRecentContactsProps) {
    super(props);

    this.state = {
      recentContacts: [],
      error: null,
      loading: true
    };
  }

  /**
   * Fetch the recently used contacts for the user
   */
  private _fetchRecentContacts(): void {
    if (this.props.graphClient) {
      this.setState({
        error: null,
        loading: true
      });

      this.props.graphClient
        .api("me/people")
        .version("v1.0")
        .select("id,displayName,scoredEmailAddresses,phones,personType")
        .top(this.props.nrOfContacts || 5)
        .get((err, res: IContacts) => {
          if (err) {
            // Something failed calling the MS Graph
            this.setState({
              error: err.message ? err.message : strings.Error,
              recentContacts: [],
              loading: false
            });
            return;
          }

          // Check if a response was retrieved
          if (res && res.value && res.value.length > 0) {
            this._processContactResults(res.value);
          } else {
            // No documents retrieved
            this.setState({
              recentContacts: [],
              loading: false
            });
          }
        });
    }
  }

  /**
   * Process the retrieved MS Graph Contacts
   * @param contacts
   */
  private _processContactResults(contacts: IContact[]): void {
    this.setState({
      recentContacts: contacts,
      loading: false
    });
  }

  /**
   * Renders the list cell for the persona's
   */
  private _onRenderCell = (item: IContact, index: number | undefined): JSX.Element => {
    return <Person className={styles.persona} person={item} graphClient={this.props.graphClient} />;
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this._fetchRecentContacts();
  }

  /**
   * componentDidUpdate lifecycle hook
   */
  public componentDidUpdate(prevProps: IRecentContactsProps, prevState: IRecentContactsState): void {
    if (prevProps.nrOfContacts !== this.props.nrOfContacts) {
      this._fetchRecentContacts();
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IRecentContactsProps> {
    return (
      <div className={styles.recentContacts}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />

        {
          this.state.loading && <Spinner label={strings.Loading} size={SpinnerSize.large} />
        }

        {
          this.state.recentContacts && this.state.recentContacts.length > 0 ? (
            <List items={this.state.recentContacts}
              renderedWindowsAhead={4}
              onRenderCell={this._onRenderCell} />
          ) : (
              !this.state.loading && (
                this.state.error ?
                  <span className={styles.error}>{this.state.error}</span> :
                  <span className={styles.noContacts}>{strings.NoContacts}</span>
              )
            )
        }
      </div>
    );
  }
}
