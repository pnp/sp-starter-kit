import { IWebs } from ".";

export interface IRecentlyVisitedSitesState {
  usedSites: IWebs[];
  error: string;
  loading: boolean;
}

