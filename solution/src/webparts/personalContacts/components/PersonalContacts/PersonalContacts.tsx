import * as React from 'react';
import styles from './PersonalContacts.module.scss';
import * as strings from 'PersonalContactsWebPartStrings';
import { IPersonalContactsProps, IPersonalContactsState } from '.';
import { IContact, IContacts } from '..';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { List } from 'office-ui-fabric-react/lib/components/List';
import { Persona, PersonaSize, IPersonaProps } from 'office-ui-fabric-react/lib/components/Persona';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { Person } from '../Person';

export class PersonalContacts extends React.Component<IPersonalContactsProps, IPersonalContactsState> {
  /**
   *
   */
  constructor(props: IPersonalContactsProps) {
    super(props);

    this.state = {
      contacts: [],
      loading: false,
      error: undefined
    };
  }

  /**
   * Fetch the recently used contacts for the user
   */
  private _loadContacts(): void {
    if (!this.props.graphClient) {
      return;
    }

    // update state to indicate loading and remove any previously loaded
    // messages
    this.setState({
      error: null,
      loading: true,
      contacts: []
    });

    this.props.graphClient
      .api("me/contacts")
      .version("v1.0")
      .select("id,displayName,emailAddresses,businessPhones,mobilePhone,homePhones")
      .top(this.props.nrOfContacts || 5)
      .get((err: any, res: IContacts): void => {
        if (err) {
          // Something failed calling the MS Graph
          this.setState({
            error: err.message ? err.message : strings.Error,
            loading: false
          });
          return;
        }

        // Check if a response was retrieved
        if (res && res.value && res.value.length > 0) {
          this.setState({
            contacts: res.value,
            loading: false
          });
        }
        else {
          // No contacts found
          this.setState({
            loading: false
          });
        }
      });
  }

  /**
   * Renders the list cell for the persona's
   */
  private _onRenderCell = (item: IContact, index: number | undefined): JSX.Element => {
    return <Person graphClient={this.props.graphClient} person={item} />;
  }

  /**
   * Renders the secondary field as mail
   */
  private _renderMail = (props: IPersonaProps): JSX.Element => {
    if (props.secondaryText) {
      return <Link href={`mailto:${props.secondaryText}`}>{props.secondaryText}</Link>;
    }

    return <div />;
  }

  /**
   * Renders the tertiary field as mail
   */
  private _renderPhone = (props: IPersonaProps): JSX.Element => {
    if (props.tertiaryText) {
      return <Link href={`tel:${props.tertiaryText}`}>{props.tertiaryText}</Link>;
    }

    return <div />;
  }

  public componentDidMount(): void {
    // load data initially after the component has been instantiated
    this._loadContacts();
  }

  public componentDidUpdate(prevProps: IPersonalContactsProps, prevState: IPersonalContactsState): void {
    // verify if the component should update. Helps avoid unnecessary re-renders
    // when the parent has changed but this component hasn't
    if (prevProps.nrOfContacts !== this.props.nrOfContacts) {
      this._loadContacts();
    }
  }

  public render(): React.ReactElement<IPersonalContactsProps> {
    return (
      <div className={styles.personalContacts}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        {
          this.state.loading &&
          <Spinner label={strings.Loading} size={SpinnerSize.large} />
        }

        {
          this.state.contacts &&
            this.state.contacts.length > 0 ? (
              <div>
                <List items={this.state.contacts}
                  onRenderCell={this._onRenderCell} />
                <Link href='https://outlook.office.com/owa/?path=/people' target='_blank'>{strings.ViewAll}</Link>
              </div>
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
