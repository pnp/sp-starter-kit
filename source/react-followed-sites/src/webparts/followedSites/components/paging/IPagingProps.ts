import { IFollowedResult } from "..";

export interface IPagingProps {
  allItems: IFollowedResult[];
  nrOfItems: number;

  fUpdateItems: (pagedItems: IFollowedResult[]) => void;
}
