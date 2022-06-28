import React from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import Task from "./Task/Task";

import { IList } from "../../../interfaces/ILIst";
import styles from "./List.module.scss";
import { BoardSlice } from "../../../store/reducers/BoardSlice";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { Droppable } from "react-beautiful-dnd";
import { Statuses } from "../../../interfaces/ITask";

interface ListProps {
  boardId: number;
  list: IList;
  onDeleteHandler?: (id: number) => void;
}

const List: React.FC<ListProps> = ({ list, boardId }) => {
  const dispatch = useAppDispatch();
  const { addTask } = BoardSlice.actions;

  const [inputValue, setInputValue] = React.useState<string>("");

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") {
      if (inputValue) {
        dispatch(
          addTask({
            boardId: boardId,
            listId: list.id,
            task: {
              id: Date.now(),
              title: inputValue,
              status: Statuses.UNCOMPLETE,
            },
          })
        );
      }
    }
  }

  return (
    <Droppable droppableId={list.id.toString()}>
      {(provided, snapshot) => (
        <Container
          className={styles.container}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Box className={styles.header}>
            <Typography variant={"caption"}>{list.title}</Typography>
          </Box>
          <Box>
            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeyDownHandler}
            />
          </Box>
          <div className={styles.items}>
            {list.items.map((listItem, index) => (
              <Task key={listItem.id} item={listItem} index={index} />
            ))}
          </div>
        </Container>
      )}
    </Droppable>
  );
};

export default React.memo(List);
