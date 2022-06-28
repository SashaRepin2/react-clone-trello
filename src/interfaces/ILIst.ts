import { ITask } from "./ITask";

export interface IList {
  id: number;
  title: string;
  items: ITask[];
}
