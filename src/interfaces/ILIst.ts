import { IListItem } from "./IListItem";

export interface IList {
  id: number;
  title: string;
  items: IListItem[];
}
