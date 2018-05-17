import { ILink } from "./ILink";

export interface ILinksState {
  groups: { [group: string]: ILink[]; };
}
