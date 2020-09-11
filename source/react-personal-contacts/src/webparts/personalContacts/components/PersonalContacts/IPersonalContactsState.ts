import { IContact } from '..';

export interface IPersonalContactsState {
  contacts: IContact[];
  error: string;
  loading: boolean;
}
