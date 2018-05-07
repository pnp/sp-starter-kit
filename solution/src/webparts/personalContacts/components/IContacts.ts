export interface IContacts {
  value?: IContact[];
}

export interface IContact {
  id: string;
  displayName: string;
  homePhones?: string[];
  mobilePhone?: string;
  businessPhones?: string[];
  emailAddresses: {
    name: string;
    address: string;
  }[];
}