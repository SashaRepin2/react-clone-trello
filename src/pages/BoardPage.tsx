import React from "react";
import { Params, useParams } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { ListSlice } from "../store/reducers/ListSlice";
import { TaskSlice } from "../store/reducers/TaskSlice";

import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import NotFoundPage from "./NotFoundPage";
import List from "../components/Board/List/List";

const BoardPage: React.FC = () => {
  const { boardId } = useParams<Params>();
  const { addList } = ListSlice.actions;
  const { moveTask } = TaskSlice.actions;
  const dispatch = useAppDispatch();

  const lists = useAppSelector((state) => {
    if (boardId) {
      return state.listReducer.lists.filter(
        (list) => list.boardId === +boardId
      );
    }
  });

  const [inputValue, setInputValue] = React.useState<string>("");

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") {
      if (board)
        dispatch(
          addList({
            id: Date.now(),
            title: inputValue,
            boardId: board.id,
          })
        );
      setInputValue("");
    }
  }

  function onDragEndHandler(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination || !boardId) {
      return;
    }

    // from
    const sInd = +source.droppableId;
    // to
    const dInd = +destination.droppableId;

    if (sInd !== dInd) {
      const taskId = +draggableId;
      dispatch(
        moveTask({
          listId: dInd,
          taskId: taskId,
        })
      );
    }
  }

  if (!board) {
    return <NotFoundPage />;
  }

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "min-content",
        gridTemplateRows: "min-content 9fr",
        gridGap: "50px",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            color: "#fff",
            bgcolor: "#8458b3",
            borderRadius: "10px",
            padding: "15px 20px",
          }}
        >
          {`Доска: ${board.title}`}
        </Typography>
        <Box
          sx={{
            color: "#fff",
            bgcolor: "#8458b3",
            borderRadius: "10px",
            padding: "15px 20px",
            marginLeft: "15px",
          }}
        >
          <TextField
            value={inputValue}
            placeholder={"Название списка"}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={onKeyDownHandler}
            sx={{ input: { color: "#fff" } }}
          />
        </Box>
      </Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#D0BDF4",
          borderRadius: "10px",
          minWidth: "300px",
          boxShadow: 3,
          padding: "15px 0",
        }}
      >
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            sx={{
              overflow: "hidden",
              margin: "15px 0",
              overflowX: "auto",
              minHeight: "200px",
              paddingBottom: "10px",
            }}
          >
            {lists.map((list) => (
              <List key={list.id} list={list} boardId={board.id} />
            ))}
          </Stack>
        </DragDropContext>
      </Container>
    </Container>
  );
};

export default BoardPage;
