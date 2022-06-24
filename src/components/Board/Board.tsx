import React from "react";
import { IBoard } from "../../interfaces/IBoard";
import styles from "./Board.module.scss";

interface BoardProps {
  board: IBoard;
}

export const Board: React.FC<BoardProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}></div>
    </div>
  );
};
