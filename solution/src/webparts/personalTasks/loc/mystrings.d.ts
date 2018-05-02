declare interface IPersonalTasksWebPartStrings {
  Completed: string;
  Error: string;
  InProgress: string;
  Loading: string;
  NoTasks: string;
  NotStarted: string;
  ShowCompleted: string;
  PropertyPaneDescription: string;
  ViewAll: string;
}

declare module 'PersonalTasksWebPartStrings' {
  const strings: IPersonalTasksWebPartStrings;
  export = strings;
}
