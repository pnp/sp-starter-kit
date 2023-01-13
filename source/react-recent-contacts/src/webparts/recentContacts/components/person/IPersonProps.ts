import { MSGraphClientV3 } from '@microsoft/sp-http';
import { IContact } from "..";

export interface IPersonProps {
  className: string;
  person: IContact;
  graphClient: MSGraphClientV3;
}
