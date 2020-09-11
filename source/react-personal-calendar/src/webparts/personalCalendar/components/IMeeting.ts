export interface IMeetings {
  value: IMeeting[];
}

export interface IMeeting {
  end: IMeetingTime;
  isAllDay: boolean;
  location: {
    displayName: string;
  };
  showAs: string;
  start: IMeetingTime;
  subject: string;
  webLink: string;
}

export interface IMeetingTime {
  dateTime: string;
  timeZone: string;
}