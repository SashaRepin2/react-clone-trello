import { Container } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import { ITask } from "../../../../interfaces/ITask";
import { BoardSlice } from "../../../../store/reducers/BoardSlice";

import styles from "./Task.module.scss";

interface ItemProps {
  index: number;
  item: ITask;
}

const Task: React.FC<ItemProps> = ({ item, index }) => {
  const dispatch = useAppDispatch();
  const {} = BoardSlice.actions;

  function onCompleteHandler() {}

  function onDeleteHandler() {}

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
        </Container>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
