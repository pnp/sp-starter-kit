declare interface IPersonalTasksWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  AllowEditingPropertyLabel: string;
  DataSourcePropertyLabel: string;
  DataSourcePlanner: string;
  DataSourceToDo: string;
  HideHeaderPropertyLabel: string;
  InitialId: string;
  InitialBucketId: string;
  TargetId: string;
  TargetBucketId: string;
  WebPartTitlePlaceholder: string;
  WebPartTitleLabel: string;
}

declare module 'PersonalTasksWebPartStrings' {
  const strings: IPersonalTasksWebPartStrings;
  export = strings;
}
