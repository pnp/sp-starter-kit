export interface ITasks {
  value: ITask[];
}

export interface ITask {
  completedDateTime?: string;
  dueDateTime?: string;
  id: string;
  percentComplete: number;
  title: string;
}