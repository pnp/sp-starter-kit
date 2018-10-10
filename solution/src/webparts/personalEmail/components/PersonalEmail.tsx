import * as React from 'react';
import styles from './PersonalEmail.module.scss';
import * as strings from 'PersonalEmailWebPartStrings';
import { IPersonalEmailProps, IPersonalEmailState, IMessage, IMessages } from '.';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { List } from 'office-ui-fabric-react/lib/components/List';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { MSGraphClient } from '@microsoft/sp-client-preview';

export class PersonalEmail extends React.Component<IPersonalEmailProps, IPersonalEmailState> {
  constructor(props: IPersonalEmailProps) {
    super(props);

    this.state = {
      messages: [],
      loading: false,
      error: undefined
    };
  }

  /**
   * Load recent messages for the current user
   */
  private _loadMessages(): void {
    if (!this.props.graphClient) {
      return;
    }

    // update state to indicate loading and remove any previously loaded
    // messages
    this.setState({
      error: null,
      loading: true,
      messages: []
    });

    let graphURI: string = "me/messages";

    if(this.props.showInboxOnly) {
      graphURI = "me/mailFolders/Inbox/messages";
    }

    this.props.graphClient
      .api(graphURI)
      .version("v1.0")
      .select("bodyPreview,receivedDateTime,from,subject,webLink,isRead")
      .top(this.props.nrOfMessages || 5)
      .orderby("receivedDateTime desc")
      .get((err: any, res: IMessages): void => {
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
            messages: res.value,
            loading: false
          });
        }
        else {
          // No messages found
          this.setState({
            loading: false
          });
        }
      });
  }

  /**
   * Render message item
   */
  private _onRenderCell = (item: IMessage, index: number | undefined): JSX.Element => {
    let fromStyle : string = "";
    let subjectStyle : string = "";
    let dateStyle : string = "";
    if (item.isRead) {
      fromStyle = styles.fromRead;
      subjectStyle = styles.subjectRead;
      dateStyle = styles.dateRead;
    }
    else {
      fromStyle = styles.fromUnread;
      subjectStyle = styles.subjectUnread;
      dateStyle = styles.dateUnread;
    }

    return <Link href={item.webLink} className={styles.message} target='_blank'>
          <div className={fromStyle}>{item.from.emailAddress.name || item.from.emailAddress.address}</div>
          <div className={subjectStyle}>{item.subject}</div>
          <div className={dateStyle}>{(new Date(item.receivedDateTime).toLocaleDateString())}</div>
          <div className={styles.preview}>{item.bodyPreview}</div>
      </Link>;
  }

  public componentDidMount(): void {
    // load data initially after the component has been instantiated
    this._loadMessages();
  }

  public componentDidUpdate(prevProps: IPersonalEmailProps, prevState: IPersonalEmailState): void {
    // verify if the component should update. Helps avoid unnecessary re-renders
    // when the parent has changed but this component hasn't
    if (prevProps.nrOfMessages !== this.props.nrOfMessages) {
      this._loadMessages();
    }
  }

  public render(): React.ReactElement<IPersonalEmailProps> {
    return (
      <div className={styles.personalEmail}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} className={styles.title} />
        {
          this.state.loading &&
          <Spinner label={strings.Loading} size={SpinnerSize.large} />
        }

        {
          this.state.messages &&
            this.state.messages.length > 0 ? (
              <div>
                <Link href='https://outlook.office.com/owa/?viewmodel=IMailComposeViewModelFactory' target='_blank' className={styles.newEmail}>{strings.NewEmail}</Link>
                <List items={this.state.messages}
                  onRenderCell={this._onRenderCell} className={styles.list} />
                <Link href='https://outlook.office.com/owa/' target='_blank' className={styles.viewAll}>{strings.ViewAll}</Link>
              </div>
            ) : (
              !this.state.loading && (
                this.state.error ?
                  <span className={styles.error}>{this.state.error}</span> :
                  <span className={styles.noMessages}>{strings.NoMessages}</span>
              )
            )
        }
      </div>
    );
  }
}
