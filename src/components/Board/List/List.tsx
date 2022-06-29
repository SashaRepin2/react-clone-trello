import React from "react";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task/Task";

import { BoardSlice } from "../../../store/reducers/BoardSlice";
import useAppDispatch from "../../../hooks/useAppDispatch";

import { IList } from "../../../interfaces/ILIst";
import { Statuses } from "../../../interfaces/ITask";

interface ListProps {
  boardId: number;
  list: IList;
  onDeleteHandler?: (id: number) => void;
}

const List: React.FC<ListProps> = ({ list, boardId }) => {
  const dispatch = useAppDispatch();
  const { addTask, deleteTask, completeTask } = BoardSlice.actions;
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
        setInputValue("");
      }
    }
  }

  function DeleteTask(taskId: number) {
    dispatch(deleteTask({ boardId: boardId, listId: list.id, taskId: taskId }));
  }

  function CompleteTask(taskId: number) {
    dispatch(
      completeTask({
        boardId: boardId,
        listId: list.id,
        taskId: taskId,
      })
    );
  }

  return (
    <Container
      disableGutters={true}
      sx={{
        bgcolor: "#8458b3",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          bgcolor: "#400085",
          padding: "10px 5px",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Typography variant={"h6"} sx={{ color: "#fff" }}>
          {list.title}
        </Typography>
        <TextField
          value={inputValue}
          placeholder={"Название задания"}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDownHandler}
          sx={{ input: { color: "#fff" } }}
        />
      </Box>
      <Droppable droppableId={list.id.toString()}>
        {(provided, snapshot) => (
          <Stack
            sx={{
              height: "100%",
              minHeight: "500px",
              minWidth: "300px",
              padding: "15px 10px",
            }}
            direction={"column"}
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.items.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onCompleteHandler={CompleteTask}
                onDeleteHandler={DeleteTask}
              />
            ))}
          </Stack>
        )}
      </Droppable>
    </Container>
  );
};

export default React.memo(List);
