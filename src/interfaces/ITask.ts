export enum Statuses {
  COMPLETE,
  UNCOMPLETE,
}

export interface ITask {
  id: number;
  title: string;
  status: Statuses;
  listId: number;
}
