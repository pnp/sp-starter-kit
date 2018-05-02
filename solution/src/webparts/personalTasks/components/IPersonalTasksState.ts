import { ITask } from "./ITask";

export interface IPersonalTasksState {
  error: string;
  loading: boolean;
  tasks: ITask[];
}