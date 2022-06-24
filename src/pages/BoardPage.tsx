import React from "react";
import { useParams } from "react-router-dom";

import { List } from "../components/Board/List/List";
import { IList } from "../interfaces/ILIst";

export const BoardPage: React.FC = () => {
  let { boardId } = useParams();

  return (
    <React.Fragment>
      <div>BoardPage {boardId}</div>
      <div></div>
    </React.Fragment>
  );
};
