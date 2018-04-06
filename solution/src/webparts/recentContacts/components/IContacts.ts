export interface IContacts {
  '@odata.context': string;
  value: IContact[];
}

export interface IContact {
  '@odata.etag': string;
  id: string;
  displayName: string;
  homePhones: string[];
  mobilePhone?: string;
  businessPhones: string[];
  emailAddresses: EmailAddress[];
}

export interface EmailAddress {
  name: string;
  address: string;
}
