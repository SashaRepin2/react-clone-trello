import React from "react";
import { IList } from "../../../interfaces/ILIst";
import { Item } from "./Item/Item";

import styles from "./List.module.scss";

interface ListProps {
  list: IList;
  onDeleteHandler?: (id: number) => void;
}

export const List: React.FC<ListProps> = ({ list }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{list.title}</div>
        <div className={styles.options}>
          <button
            onClick={() => {
              console.log("Delete List with id" + list.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className={styles.items}>
        {list.items.map((listItem) => (
          <Item key={listItem.id} item={listItem} />
        ))}
      </div>
    </div>
  );
};
