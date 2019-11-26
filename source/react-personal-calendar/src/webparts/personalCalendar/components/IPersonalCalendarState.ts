import { IMeeting } from '.';

export interface IPersonalCalendarState {
  error: string;
  loading: boolean;
  meetings: IMeeting[];
  renderedDateTime: Date;
}