import * as React from 'react';
import styles from './PersonalEmail.module.scss';
import * as strings from 'PersonalEmailWebPartStrings';
import { IPersonalEmailProps, IPersonalEmailState, IMessage, IMessages } from '.';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { List } from '@fluentui/react/lib/List';
import { Link } from '@fluentui/react/lib/Link';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { ActionButton } from '@fluentui/react/lib/Button';

export class PersonalEmail extends React.Component<IPersonalEmailProps, IPersonalEmailState> {

  protected readonly outlookLink: string = "https://outlook.office.com/owa/";
  protected readonly outlookNewEmailLink: string = "https://outlook.office.com/mail/deeplink/compose";

  constructor(props: IPersonalEmailProps) {
    super(props);

    this.state = {
      messages: [],
      loading: false,
      error: undefined
    };
  }

  private addIcon: IIconProps = { iconName: 'Add' };
  private viewList: IIconProps = { iconName: 'AllApps' };

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
      .select("bodyPreview,receivedDateTime,from,isRead,subject,webLink")
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
    if (item.isRead) {
      styles.message = styles.message + " " + styles.isRead;
    }

    return <Link href={item.webLink} className={styles.message} target='_blank'>
          <div className={styles.from}>{item.from.emailAddress.name || item.from.emailAddress.address}</div>
          <div className={styles.subject}>{item.subject}</div>
          <div className={styles.date}>{(new Date(item.receivedDateTime).toLocaleDateString())}</div>
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
    if (prevProps.nrOfMessages !== this.props.nrOfMessages || prevProps.showInboxOnly !== this.props.showInboxOnly) {
      this._loadMessages();
    }
  }

  public render(): React.ReactElement<IPersonalEmailProps> {
    const varientStyles = {
      "--varientBGColor": this.props.themeVariant.semanticColors.bodyBackground
      , "--varientFontColor": this.props.themeVariant.semanticColors.bodyText
      , "--varientBGHovered": this.props.themeVariant.semanticColors.listItemBackgroundHovered    
    } as React.CSSProperties;

    
    return (
      <div className={styles.personalEmail} style={ varientStyles }>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}               
          updateProperty={this.props.updateProperty} className={styles.title} />
        
        <ActionButton text={strings.NewEmail} iconProps={this.addIcon} onClick={this.openNewEmail} />
        <ActionButton text={strings.ViewAll} iconProps={this.viewList} onClick={this.openList} />
        {
          this.state.loading &&
          <Spinner label={strings.Loading} size={SpinnerSize.large} />
        }
        {
          this.state.messages &&
            this.state.messages.length > 0 ? (
              <div>
                <List items={this.state.messages}
                  onRenderCell={this._onRenderCell} className={styles.list} />
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

  private openNewEmail = () => {
    window.open(this.outlookNewEmailLink, "_blank");
  }

  private openList = () => {
    window.open(this.outlookLink, "_blank");
  }
}
