import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IFollowedSitesWebPartProps } from "../FollowedSitesWebPart";

export interface IFollowedSitesProps extends IFollowedSitesWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
}

export interface IFollowedSitesState {
  following: IFollowedResult[];
  allFollowing: IFollowedResult[];
  loading: boolean;
}

export interface IFollowed {
  '@odata.context': string;
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
