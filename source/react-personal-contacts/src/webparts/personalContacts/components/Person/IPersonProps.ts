import { MSGraphClientV3 } from '@microsoft/sp-http';
import { IContact } from "..";

export interface IPersonProps {
  graphClient: MSGraphClientV3;
  person: IContact;
}