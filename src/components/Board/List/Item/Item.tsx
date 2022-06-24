import React from "react";
import { IListItem } from "../../../../interfaces/IListItem";

import styles from "./Item.module.scss";

interface ItemProps {
  item: IListItem;
  onCompleteHandler?: (id: number) => void;
  onDeleteHandler?: (id: number) => void;
}

export const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.options}>
        <button
          onClick={() => {
            console.log("Complete Item with id " + item.id);
          }}
        >
          Complete
        </button>
        <button
          onClick={() => {
            console.log("Delete Item with id " + item.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
