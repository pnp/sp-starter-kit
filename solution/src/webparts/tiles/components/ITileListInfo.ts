export interface ITileListInfo {
  error?: any;
  Row: ITileItem[];
  FirstRow: number;
  FolderPermissions: string;
  LastRow: number;
  RowLimit: number;
  FilterLink: string;
  ForceNoHierarchy: string;
  HierarchyHasIndention: string;
}

export interface ITileItem {
  ID: string;
  PermMask: string;
  FSObjType: string;
  ContentTypeId: string;
  FileRef: string;
  ItemChildCount: string;
  FolderChildCount: string;
  SMTotalSize: string;
  Title: string;
  PnPDescription: string;
  PnPIconName: string;
  PnPUrl: string;
  PnPUrlTarget: string;
}
