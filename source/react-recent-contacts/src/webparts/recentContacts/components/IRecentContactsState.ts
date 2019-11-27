import { IContact } from '.';

export interface IRecentContactsState {
  recentContacts: IContact[];
  error: string;
  loading: boolean;
}
