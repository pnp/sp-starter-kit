import * as React from 'react';
import { groupBy } from '@microsoft/sp-lodash-subset';
import { IMeeting } from '..';
import styles from './MeetingsList.module.scss';
import { Link } from 'office-ui-fabric-react/lib/components/Link';

import format from 'date-fns/format';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import distanceInDays from 'date-fns/differenceInCalendarDays';
import distanceInHours from 'date-fns/differenceInHours';
import distanceInMinutes from 'date-fns/differenceInMinutes';

export interface IMeetingsListProps {
  meetings: IMeeting[];
}

const MeetingsList = (props: IMeetingsListProps): JSX.Element => {

	const meetingsByDay = groupBy(props.meetings, (meeting: IMeeting) => {
		return (new Date(meeting.start.dateTime)).toLocaleDateString('en-US');
	});

	const dates = Object.keys(meetingsByDay);

	const formatDifferenceString = (startDate: Date, endDate: Date) => {

		const days = distanceInDays(endDate, startDate);
		const hours = distanceInHours(endDate, startDate);
		const minutes = distanceInMinutes(endDate, startDate);

		const dateParts: string[] = [];

		if (days > 0) {
			if (days > 1) {
				return days + ' days';
			} else if (days === 1) {
				return days + ' day';
			}
		}

		if (hours > 0) {
			if (minutes > 60 && minutes % 60 > 0) {
				dateParts.push(hours + 'h ');
			} else {
				if (hours > 1) {
					return hours + ' hrs';
				} else if (hours === 1) {
					return hours + ' hr';
				}
			}
		}

		if (minutes > 0) {
			if (dateParts.length > 0) {
				dateParts.push((minutes % 60) + 'm');
			} else {
				dateParts.push((minutes % 60) + ' min');
			}
		}

		return dateParts.join(' ');
	
	};

	return (
		<div className={styles.meetingsList}>
		{dates.map((day, index) => {
			return (
				<div className={styles.meetingWrapper}>
					<div className={styles.meetingDate}>
						{ format(new Date(day), 'iiii, MMMM d, yyyy') }
					</div>
					{meetingsByDay[day].map((meeting) => {
						return (
							<Link href={meeting.webLink} className={styles.meeting} target='_blank'>
								<div className={styles.linkWrapper}>
									<div className={styles.timeDetails}>
										<div className={styles.start}>
											{ meeting.isAllDay ? 'All day' : format(new Date(meeting.start.dateTime), 'p') }
										</div>
										<div className={styles.duration}>
											{ formatDifferenceString(new Date(meeting.start.dateTime), new Date(meeting.end.dateTime))}
										</div>
									</div>
									<div className={`${styles.divider} ${meeting.showAs}`}></div>
									<div>
										<div className={styles.subject}>{meeting.subject}</div>
										<div className={styles.location}>{meeting.location.displayName}</div>
									</div>	
								</div>
							</Link>
						);
					})}
				</div>);
		})
		}
	</div>
	);
};

export default MeetingsList;
