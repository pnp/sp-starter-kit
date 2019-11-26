import { IFollowedResult } from "../IFollowedResult";

export interface IPagingProps {
  allItems: IFollowedResult[];
  nrOfItems: number;

  fUpdateItems: (pagedItems: IFollowedResult[]) => void;
}
