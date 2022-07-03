import React from "react";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";

import useAppDispatch from "../../../hooks/useAppDispatch";

import { IList } from "../../../interfaces/IList";
import { Statuses } from "../../../interfaces/ITask";
import { TaskSlice } from "../../../store/reducers/TaskSlice";
import Task from "./Task/Task";
import useAppSelector from "../../../hooks/useAppSelector";

interface ListProps {
  list: IList;
  onDeleteHandler?: (id: number) => void;
}

const List: React.FC<ListProps> = ({ list }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) =>
    state.taskReducer.tasks.filter((task) => task.listId === list.id)
  );
  const { addTask, deleteTask, changeStatus } = TaskSlice.actions;
  const [inputValue, setInputValue] = React.useState<string>("");

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") {
      if (inputValue) {
        dispatch(
          addTask({
            id: Date.now(),
            title: inputValue,
            listId: list.id,
            status: Statuses.UNCOMPLETE,
          })
        );
        setInputValue("");
      }
    }
  }

  function CompleteTask(taskId: number) {
    dispatch(changeStatus({ taskId: taskId, newStatus: Statuses.COMPLETE }));
  }

  function DeleteTask(taskId: number) {
    dispatch(deleteTask(taskId));
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
            {tasks.map((task, index) => (
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
