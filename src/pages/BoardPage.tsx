import React from "react";
import { useParams } from "react-router-dom";
import { List } from "../components/Board/List/List";
import { IList } from "../interfaces/ILIst";

const listArr: IList[] = [
  { id: 0, title: "list 0", items: [{ id: 0, title: "item 1" }] },
  {
    id: 1,
    title: "list 1",
    items: [
      { id: 0, title: "item 1" },
      { id: 2, title: "item 2" },
    ],
  },
];

export const BoardPage: React.FC = () => {
  let { boardId } = useParams();

  return (
    <React.Fragment>
      <div>BoardPage {boardId}</div>
      <div>
        {listArr.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </div>
    </React.Fragment>
  );
};
