import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import useAppDispatch from "../../hooks/useAppDispatch";

import { IBoard } from "../../interfaces/IBoard";
import { BoardSlice } from "../../store/reducers/BoardSlice";

interface BoardProps {
  board: IBoard;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const dispatch = useAppDispatch();
  const { deleteBoard } = BoardSlice.actions;

  function onDeleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(deleteBoard(board.id));
  }

  return (
    <Link to={`/boards/${board.id}`} style={{ textDecoration: "none" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#8458b3;",
          borderRadius: "10px",
          "&:hover": {
            bgcolor: "#57327e",
          },
        }}
      >
        <Typography variant={"h6"} sx={{ color: "#fff" }}>
          {board.title.length > 15
            ? board.title.slice(0, 15) + "..."
            : board.title}
        </Typography>
        <Box>
          <IconButton onClick={onDeleteHandler}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Container>
    </Link>
  );
};

export default React.memo(Board);
