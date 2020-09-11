export interface IContacts {
  '@odata.context': string;
  value: IContact[];
}

export interface IContact {
  '@odata.etag': string;
  id: string;
  displayName: string;
  phones: Phone[];
  scoredEmailAddresses: ScoredEmailAddress[];
  personType: PersonType;
}

export interface ScoredEmailAddress {
  address: string;
  relevanceScore: number;
  selectionLikelihood: string;
}

export interface Phone {
  type: string;
  number: string;
}

export interface PersonType {
  class: string;
  subclass: string;
}
