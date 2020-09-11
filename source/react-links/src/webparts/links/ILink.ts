export interface ILink {
  title: string;
  url: string;
  icon: string;
  group: string;
  target: LinkTarget;
}

export interface IGroupData {
  title: string;
}

export enum LinkTarget {
  parent = '',
  blank = '_blank'
}
