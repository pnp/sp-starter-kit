import { IFollowedResult } from ".";

export interface IFollowedSitesState {
  following: IFollowedResult[];
  allFollowing: IFollowedResult[];
  loading: boolean;
  error: string;
}
