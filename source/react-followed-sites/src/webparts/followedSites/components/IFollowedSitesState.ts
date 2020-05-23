import { IFollowedResult } from "./IFollowedResult";

export interface IFollowedSitesState {
  following: IFollowedResult[];
  allFollowing: IFollowedResult[];
  loading: boolean;
  error: string;
}
