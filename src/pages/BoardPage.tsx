import React from "react";
import { Params, useParams } from "react-router-dom";

import List from "../components/Board/List/List";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { BoardSlice } from "../store/reducers/BoardSlice";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import NotFoundPage from "./NotFoundPage";

const BoardPage: React.FC = () => {
  const { boardId } = useParams<Params>();
  const { addList, moveTask } = BoardSlice.actions;

  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => {
    if (boardId) {
      return state.boardReducer.boards.find((item) => item.id === +boardId);
    }
  });

  const [inputValue, setInputValue] = React.useState<string>("");

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") {
      if (board)
        dispatch(
          addList({
            boardId: board.id,
            list: { id: Date.now(), title: inputValue, items: [] },
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
          fromListId: sInd,
          toListId: dInd,
          taskId: taskId,
          boardId: +boardId,
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
            {board.lists.map((list) => (
              <List key={list.id} list={list} boardId={board.id} />
            ))}
          </Stack>
        </DragDropContext>
      </Container>
    </Container>
  );
};

export default BoardPage;
