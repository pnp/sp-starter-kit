import { Providers } from '@microsoft/mgt-spfx';
import { Agenda, MgtTemplateProps } from '@microsoft/mgt-react/dist/es6/spfx';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Link } from '@fluentui/react/lib/Link';
import * as strings from 'PersonalCalendarWebPartStrings';
import * as React from 'react';
import { IPersonalCalendarProps, IPersonalCalendarState } from '.';
import { Event } from '@microsoft/microsoft-graph-types';
import styles from './PersonalCalendar.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import format from 'date-fns/format';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { ActionButton } from '@fluentui/react/lib/Button';
import SimpleCalendar from './SimpleCalendar';
import { findIana } from 'windows-iana';


const EventInfo = (props: MgtTemplateProps) => {
  /**
   * Get user-friendly string that represents the duration of an event
   * < 1h: x minutes
   * >= 1h: 1 hour (y minutes)
   * all day: All day
   */
  const getDuration = (_event: Event): string => {
    if (_event.isAllDay) {
      return strings.AllDay;
    }

    const _startDateTime: Date = new Date(_event.start.dateTime);
    const _endDateTime: Date = new Date(_event.end.dateTime);
    // get duration in minutes
    const _duration: number = Math.round((_endDateTime as any) - (_startDateTime as any)) / (1000 * 60);
    if (_duration <= 0) {
      return '';
    }

    if (_duration < 60) {
      return `${_duration} ${strings.Minutes}`;
    }

    const _hours: number = Math.floor(_duration / 60);
    const _minutes: number = Math.round(_duration % 60);
    let durationString: string = `${_hours} ${_hours > 1 ? strings.Hours : strings.Hour}`;
    if (_minutes > 0) {
      durationString += ` ${_minutes} ${strings.Minutes}`;
    }

    return durationString;
  };

  const event: Event | undefined = props.dataContext ? props.dataContext.event : undefined;

  if (!event) {
    return <div />;
  }

  const startTime: Date = new Date(event.start.dateTime);
  const minutes: number = startTime.getMinutes();

  return <div>
    <Link href={event.webLink} className={styles.meeting} target='_blank'>
      <div className={styles.linkWrapper}>
        <div className={styles.timeDetails}>
          <div className={styles.start}>
            {event.isAllDay ? 'All day' : `${startTime.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`}
          </div>
          <div className={styles.duration}>
            {getDuration(event)}
          </div>
        </div>
        <div className={`${styles.divider} ${event.showAs}`}></div>
        <div style={{ "wordBreak": 'break-word', 'width': '75%' }}>
          <div className={styles.subject}>{event.subject}</div>
          <div className={styles.location}>{event.location.displayName}</div>
        </div>
      </div>
    </Link>
  </div>;

};

const HeaderInfo = (props: MgtTemplateProps) => {
  const day: string | undefined = props.dataContext ? props.dataContext.header : undefined;
  return <div className={styles.meetingDate}>
    {format(new Date(day), 'iiii, MMMM d, yyyy')}
  </div>;
};

const LoadingTemplate = (props: MgtTemplateProps) => {
  return <Spinner label={strings.Loading} size={SpinnerSize.large} />;
};

export default class PersonalCalendar extends React.Component<IPersonalCalendarProps, IPersonalCalendarState> {
  private _interval: number;

  constructor(props: IPersonalCalendarProps) {
    super(props);

    this.state = {
      meetings: [],
      error: undefined,
      loading: false,
      renderedDateTime: new Date()
    };
  }

  private addIcon: IIconProps = { iconName: 'Add' };
  private viewList: IIconProps = { iconName: 'AllApps' };

  /**
   * Get timezone for logged in user
   */
  private _getTimeZone(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      Providers.globalProvider.graph
        // get the mailbox settings
        .api(`me/mailboxSettings`)
        .version("v1.0")
        .get((err: any, res: microsoftgraph.MailboxSettings): void => {
          if (err) {
            console.error("Error:", err)
            return reject(err);
          }
          // else {
          //   console.log("Response:", res)
          // }

          resolve(res?.timeZone);
        });
    });
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
    this._interval = window.setInterval(this._reRender, refreshInterval * 1000 * 60);
    this._reRender();
  }

  public componentDidMount(): void {
    this._setInterval();
    this
      ._getTimeZone()
      .then((_timeZone: string): void => {
        const convertedTimeZone = findIana(_timeZone);
        this.setState({
          timeZone: convertedTimeZone?.length > 1 ? convertedTimeZone[0] : convertedTimeZone[0],
          loading: false
        });
      });
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
  }

  public render(): React.ReactElement<IPersonalCalendarProps> {
    const date: Date = new Date();
    const now: string = date.toISOString();
    // set the date to midnight today to load all upcoming meetings for today
    date.setUTCHours(23);
    date.setUTCMinutes(59);
    date.setUTCSeconds(0);
    date.setDate(date.getDate() + (this.props.daysInAdvance || 0));
    const midnight: string = date.toISOString();

    const varientStyles = {
      "--varientBGColor": this.props.themeVariant.semanticColors.bodyBackground
      , "--varientFontcolor": this.props.themeVariant.semanticColors.bodyText
      , "--varientDividerColor": this.props.themeVariant.isInverted ? this.props.themeVariant.palette.neutralLight : this.props.themeVariant.palette.themePrimary
    } as React.CSSProperties;

    return (
      <div className={styles.personalCalendar} style={varientStyles}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          className={styles.personalCalendarTitle}
          updateProperty={this.props.updateProperty} />

        <ActionButton text={strings.NewMeeting} iconProps={this.addIcon} onClick={this.openNewEvent} />
        <ActionButton text={strings.ViewAll} iconProps={this.viewList} onClick={this.openList} />
        {this.props.showCalendar && <SimpleCalendar />}
        {
          <>
            <div className={styles.list}>
              <Agenda
                groupByDay
                preferredTimezone={this.state.timeZone && this.state.timeZone}
                eventQuery={`me/calendarView?startDateTime=${now}&endDateTime=${midnight}&orderby=start/dateTime&top=${this.props.numMeetings > 0 ? this.props.numMeetings : 100}`}
              >
                <HeaderInfo template='header' />
                <EventInfo template='event' />
                <LoadingTemplate template='loading' />
              </Agenda>
            </div>
            <Link href='https://outlook.office.com/owa/?path=/calendar/view/Day' target='_blank'>{strings.ViewAll}</Link>
          </>
        }
      </div>
    );
  }

  private openNewEvent = () => {
    window.open('https://outlook.office.com/calendar/deeplink/compose', '_blank');
  }

  private openList = () => {
    window.open('https://outlook.office.com/owa/?path=/calendar/view/Day', '_blank');
  }
}
