import * as React from 'react';
import styles from './SimpleCalendar.module.scss';
import startOfWeek from 'date-fns/startOfWeek';
import addDays from 'date-fns/addDays';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import isToday from 'date-fns/isToday';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';


function SimpleCalendar () {
	const today = new Date();
	const startDate = startOfWeek(today);
	const endDate = addDays(startDate, 13);


	return (
		<div className={styles.calendarContainer}>
			<div className={`${styles.day} ${styles.weekend}`}>S</div>
			<div className={styles.day}>M</div>
			<div className={styles.day}>T</div>
			<div className={styles.day}>W</div>
			<div className={styles.day}>T</div>
			<div className={styles.day}>F</div>
			<div className={`${styles.day} ${styles.weekend}`}>S</div>
			{eachDayOfInterval({start: startDate, end: endDate}).map((date: any, index: any) => {
				const isFirstOfMonth = getDate(date) === 1;
				const isPast = differenceInCalendarDays(today, date) > 0;
				return (
					<div key={index} className={`${styles.dayContainer} ${isPast ? styles.past : ''}`}>
						<div className={`${styles.dayWrapper} ${isToday(date) ? styles.today : ''}`}>
							{isFirstOfMonth && <div className={styles.monthText}>{format(date, 'MMM')}</div>}
							<div className={styles.day}>{format(date, 'd')}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default SimpleCalendar;
