import React from "react";
import { Params, useParams } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { ListSlice } from "../store/reducers/ListSlice";

import NotFoundPage from "./NotFoundPage";
import ListsGroup from "../components/Board/ListsGroup/ListsGroup";
import { Box, Container, TextField, Typography } from "@mui/material";

const BoardPage: React.FC = () => {
  const { boardId } = useParams<Params>();
  const { addList } = ListSlice.actions;
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) => {
    if (boardId) {
      return state.boardReducer.boards.find((board) => board.id === +boardId);
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

  return !board ? (
    <NotFoundPage />
  ) : (
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
        <ListsGroup boardId={board.id} />;
      </Container>
    </Container>
  );
};

export default BoardPage;
