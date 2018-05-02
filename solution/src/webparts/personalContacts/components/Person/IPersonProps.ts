import { MSGraphClient } from '@microsoft/sp-client-preview';
import { IContact } from "..";

export interface IPersonProps {
  graphClient: MSGraphClient;
  person: IContact;
}