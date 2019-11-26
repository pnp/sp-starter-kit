export interface IFollowed {
  '@odata.context': string;
  error?: IErrorMessage;
  value: IFollowedResult[];
}

export interface IFollowedResult {
  AccountName?: any;
  ActorType: number;
  CanFollow: boolean;
  ContentUri: string;
  EmailAddress?: any;
  FollowedContentUri?: any;
  Id: string;
  ImageUri?: any;
  IsFollowed: boolean;
  LibraryUri?: any;
  Name: string;
  PersonalSiteUri?: any;
  Status: number;
  StatusText?: any;
  TagGuid: string;
  Title?: any;
  Uri: string;
}

export interface IErrorMessage {
  code: string;
  message: string;
}
