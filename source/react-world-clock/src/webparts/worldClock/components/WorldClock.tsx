import * as React from 'react';
import styles from './WorldClock.module.scss';
import { IWorldClockProps } from './IWorldClockProps';

// import strings from localized resources
import * as strings from 'WorldClockWebPartStrings';

// import additional controls/components
import { Clock } from './Clock';
import * as timeZones from './Timezones';

export default class WorldClock extends React.Component < IWorldClockProps, {} > {

  public render(): React.ReactElement<IWorldClockProps> {
    return (
      <div className={styles.worldTime}>
        <div className={styles.container}>
          <div className={styles.description}>{(this.props.description) ? this.props.description : strings.LocalTimeDescription}</div>
          <Clock timeZoneOffset={this.convertTimeZoneIdToOffset(this.props.timeZoneOffset)} />
        </div>
      </div>
    );
  }

  // this method determines the minutes offset of the selected time zone
  private convertTimeZoneIdToOffset(id: number): number {
  
    let result: number = 0;

    const matchingItems: timeZones.ITimeZone[] = timeZones.TimeZones.zones.filter((e: timeZones.ITimeZone, i: number) => {
      return(e.id === id);
    });

    if (matchingItems && matchingItems.length > 0) {
      result = matchingItems[0].offsetMinutes;
    }

    return(result);
  }
}
