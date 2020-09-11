import { MSGraphClient } from '@microsoft/sp-http';
import { IContact } from "..";

export interface IPersonProps {
  graphClient: MSGraphClient;
  person: IContact;
}