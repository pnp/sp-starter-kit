export interface ILink {
  title: string;
  url: string;
  icon: string;
  group: string;
  target: LinkTarget;
}

export enum LinkTarget {
  parent = "",
  blank = "_blank"
}
