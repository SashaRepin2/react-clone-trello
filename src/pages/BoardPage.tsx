import React from "react";
import { Params, useParams } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { ListSlice } from "../store/reducers/ListSlice";

import {
  Box,
  Container,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotFoundPage from "./NotFoundPage";
import ListsGroup from "../components/Board/ListsGroup/ListsGroup";

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

  function onAddListHandler() {
    if (board && inputValue)
      dispatch(
        addList({
          id: Date.now(),
          title: inputValue,
          boardId: board.id,
        })
      );
    setInputValue("");
  }

  return !board ? (
    <NotFoundPage />
  ) : (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
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
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
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
          <InputBase
            value={inputValue}
            placeholder={"Название списка"}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            sx={{ input: { color: "#fff" } }}
          />
          <IconButton
            onClick={onAddListHandler}
            sx={{
              color: "#8458b3",
              bgcolor: "#D0BDF4",
              "&:hover": { bgcolor: "#6d28b8" },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#D0BDF4",
          borderRadius: "10px",
          boxShadow: 3,
          padding: "15px 0",
        }}
      >
        <ListsGroup boardId={board.id} />
      </Container>
    </Container>
  );
};

export default BoardPage;
