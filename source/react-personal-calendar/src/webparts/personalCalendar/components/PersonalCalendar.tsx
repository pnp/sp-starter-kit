import * as React from 'react';
import styles from './PersonalCalendar.module.scss';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as strings from 'PersonalCalendarWebPartStrings';
import { IPersonalCalendarProps, IPersonalCalendarState, IMeeting, IMeetings } from '.';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { List } from 'office-ui-fabric-react/lib/components/List';
import { Link } from 'office-ui-fabric-react/lib/components/Link';

export default class PersonalCalendar extends React.Component<IPersonalCalendarProps, IPersonalCalendarState> {
  private _interval: number;

  constructor(props: IPersonalCalendarProps) {
    super(props);

    this.state = {
      meetings: [],
      loading: false,
      error: undefined,
      renderedDateTime: new Date()
    };
  }

  /**
   * Get timezone for logged in user
   */
  private _getTimeZone(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.props.graphClient
        // get the mailbox settings
        .api(`me/mailboxSettings`)
        .version("v1.0")
        .get((err: any, res: microsoftgraph.MailboxSettings): void => {
          resolve(res.timeZone);
        });
    });
  }

  /**
   * Load recent messages for the current user
   */
  private _loadMeetings(): void {
    if (!this.props.graphClient) {
      return;
    }

    // update state to indicate loading and remove any previously loaded
    // meetings
    this.setState({
      error: null,
      loading: true,
      meetings: []
    });

    const date: Date = new Date();
    const now: string = date.toISOString();
    // set the date to midnight today to load all upcoming meetings for today
    date.setUTCHours(23);
    date.setUTCMinutes(59);
    date.setUTCSeconds(0);
    date.setDate(date.getDate() + (this.props.daysInAdvance || 0));
    const midnight: string = date.toISOString();

    this._getTimeZone().then(timeZone => {
      this.props.graphClient
        // get all upcoming meetings for the rest of the day today
        .api(`me/calendar/calendarView?startDateTime=${now}&endDateTime=${midnight}`)
        .version("v1.0")
        .select('subject,start,end,showAs,webLink,location,isAllDay')
        .top(this.props.numMeetings > 0 ? this.props.numMeetings : 100)
        .header("Prefer", "outlook.timezone=" + '"' + timeZone + '"')
        // sort ascending by start time
        .orderby("start/dateTime")
        .get((err: any, res: IMeetings): void => {
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
              meetings: res.value,
              loading: false
            });
          }
          else {
            // No meetings found
            this.setState({
              loading: false
            });
          }
        });
    });
  }

  /**
   * Render meeting item
   */
  private _onRenderCell = (item: IMeeting, index: number | undefined): JSX.Element => {
    const startTime: Date = new Date(item.start.dateTime);
    const minutes: number = startTime.getMinutes();

    return <div className={`${styles.meetingWrapper} ${item.showAs}`}>
      <Link href={item.webLink} className={styles.meeting} target='_blank'>
        <div className={styles.start}>{`${startTime.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`}</div>
        <div className={styles.subject}>{item.subject}</div>
        <div className={styles.duration}>{this._getDuration(item)}</div>
        <div className={styles.location}>{item.location.displayName}</div>
      </Link>
    </div>;
  }

  /**
   * Get user-friendly string that represents the duration of the meeting
   * < 1h: x minutes
   * >= 1h: 1 hour (y minutes)
   * all day: All day
   */
  private _getDuration = (meeting: IMeeting): string => {
    if (meeting.isAllDay) {
      return strings.AllDay;
    }

    const startDateTime: Date = new Date(meeting.start.dateTime);
    const endDateTime: Date = new Date(meeting.end.dateTime);
    // get duration in minutes
    const duration: number = Math.round((endDateTime as any) - (startDateTime as any)) / (1000 * 60);
    if (duration <= 0) {
      return '';
    }

    if (duration < 60) {
      return `${duration} ${strings.Minutes}`;
    }

    const hours: number = Math.floor(duration / 60);
    const minutes: number = Math.round(duration % 60);
    let durationString: string = `${hours} ${hours > 1 ? strings.Hours : strings.Hour}`;
    if (minutes > 0) {
      durationString += ` ${minutes} ${strings.Minutes}`;
    }

    return durationString;
  }

  /**
   * Forces re-render of the component
   */
  private _reRender = (): void => {
    // update the render date to force reloading data and re-rendering
    // the component
    this.setState({ renderedDateTime: new Date() });
  }

  /**
   * Sets interval so that the data in the component is refreshed on the
   * specified cycle
   */
  private _setInterval = (): void => {
    let { refreshInterval } = this.props;
    // set up safe default if the specified interval is not a number
    // or beyond the valid range
    if (isNaN(refreshInterval) || refreshInterval < 0 || refreshInterval > 60) {
      refreshInterval = 5;
    }
    // refresh the component every x minutes
    this._interval = setInterval(this._reRender, refreshInterval * 1000 * 60);
    this._reRender();
  }

  public componentDidMount(): void {
    this._setInterval();
  }

  public componentWillUnmount(): void {
    // remove the interval so that the data won't be reloaded
    clearInterval(this._interval);
  }

  public componentDidUpdate(prevProps: IPersonalCalendarProps, prevState: IPersonalCalendarState): void {
    // if the refresh interval has changed, clear the previous interval
    // and setup new one, which will also automatically re-render the component
    if (prevProps.refreshInterval !== this.props.refreshInterval) {
      clearInterval(this._interval);
      this._setInterval();
      return;
    }

    // reload data on new render interval
    if (prevState.renderedDateTime !== this.state.renderedDateTime) {
      this._loadMeetings();
    }
  }

  public render(): React.ReactElement<IPersonalCalendarProps> {
    return (
      <div className={styles.personalCalendar}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        {
          this.state.loading &&
          <Spinner label={strings.Loading} size={SpinnerSize.large} />
        }

        {
          this.state.meetings &&
            this.state.meetings.length > 0 ? (
              <div>
                <Link href='https://outlook.office.com/owa/?#viewmodel=IComposeCalendarItemViewModelFactory' target='_blank'>{strings.NewMeeting}</Link>
                <List items={this.state.meetings}
                  onRenderCell={this._onRenderCell} className={styles.list} />
                <Link href='https://outlook.office.com/owa/?path=/calendar/view/Day' target='_blank'>{strings.ViewAll}</Link>
              </div>
            ) : (
              !this.state.loading && (
                this.state.error ?
                  <span className={styles.error}>{this.state.error}</span> :
                  <span className={styles.noMeetings}>{strings.NoMeetings}</span>
              )
            )
        }
      </div>
    );
  }
}
