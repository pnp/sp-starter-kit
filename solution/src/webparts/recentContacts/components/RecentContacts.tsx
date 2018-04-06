import * as React from 'react';
import styles from './RecentContacts.module.scss';
import { IRecentContactsProps, IRecentContactsState, IContacts, IContact } from '.';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { MSGraphClient } from "@microsoft/sp-client-preview";
import * as strings from 'RecentContactsWebPartStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { List } from 'office-ui-fabric-react/lib/components/List';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/components/Persona';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { Link } from 'office-ui-fabric-react/lib/components/Link';

export class RecentContacts extends React.Component<IRecentContactsProps, IRecentContactsState> {
  private _graphClient: MSGraphClient = null;

  constructor(props: IRecentContactsProps) {
    super(props);

    this._graphClient = this.props.context.serviceScope.consume(
      MSGraphClient.serviceKey
    );

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
    if (this._graphClient) {
      this.setState({
        error: null,
        loading: true
      });

      this._graphClient
      .api("me/contacts")
      .version("v1.0")
      .select("id,displayName,emailAddresses,businessPhones,mobilePhone,homePhones")
      .top(this.props.nrOfContacts || 5)
      .orderby("lastModifiedDateTime desc")
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
    let phoneNr: string = null;
    if (item.businessPhones && item.businessPhones.length > 0) {
      phoneNr = item.businessPhones[0];
    } else if (item.mobilePhone) {
      phoneNr = item.mobilePhone;
    } else if (item.homePhones && item.homePhones.length > 0) {
      phoneNr = item.homePhones[0];
    }

    return <Persona className={styles.persona}
                    primaryText={item.displayName}
                    secondaryText={(item.emailAddresses && item.emailAddresses.length > 0) && item.emailAddresses[0].address}
                    onRenderSecondaryText={this._renderMail}
                    tertiaryText={phoneNr}
                    onRenderTertiaryText={this._renderPhone}
                    size={PersonaSize.size72} />;
  }

  /**
   * Renders the secondary field as mail
   */
  private _renderMail = (props: IPersonaProps) => {
    if (props.secondaryText) {
      return <Link href={`mailto:${props.secondaryText}`}>{props.secondaryText}</Link>;
    }

    return <div />;
  }

  /**
   * Renders the tertiary field as mail
   */
  private _renderPhone = (props: IPersonaProps) => {
    if (props.tertiaryText) {
      return <Link href={`tel:${props.tertiaryText}`}>{props.tertiaryText}</Link>;
    }

    return <div />;
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
