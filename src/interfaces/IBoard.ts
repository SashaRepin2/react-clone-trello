import { IList } from "./ILIst";

export interface IBoard {
  id: number;
  title: string;
  lists: IList[];
}
