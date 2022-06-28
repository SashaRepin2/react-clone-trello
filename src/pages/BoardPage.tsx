import React from "react";
import { Params, useParams } from "react-router-dom";

import List from "../components/Board/List/List";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { BoardSlice } from "../store/reducers/BoardSlice";
import { DragDropContext } from "react-beautiful-dnd";

import NotFoundPage from "./NotFoundPage";

const BoardPage: React.FC = () => {
  const { boardId } = useParams<Params>();
  const { addList } = BoardSlice.actions;

  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => {
    if (boardId) {
      return state.boardReducer.boards.find((item) => item.id === +boardId);
    }
    return null;
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
    }
  }

  function onDragEndHandler() {}

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
            color: "#fff",
            bgcolor: "#8458b3",
            borderRadius: "10px",
            padding: "15px 20px",
          }}
        >
          {`Доска: ${board.title}`}
        </Typography>
        <TextField
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={onKeyDownHandler}
        />
      </Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#D0BDF4",
          borderRadius: "10px",
          minWidth: "300px",
        }}
      >
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            sx={{
              padding: "15px 0",
              overflowX: "auto",
              minHeight: "200px",
              bgcolor: "steelblue",
            }}
          >
            {board.lists.map((list, index) => (
              <List key={list.id} list={list} boardId={board.id} />
            ))}
          </Stack>
        </DragDropContext>
      </Container>
    </Container>
  );
};

export default BoardPage;
