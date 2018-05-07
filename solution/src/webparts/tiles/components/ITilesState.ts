import { ITileItem } from '.';

export interface ITilesState {
  tiles: ITileItem[];
  loading: boolean;
  error: string;
}
