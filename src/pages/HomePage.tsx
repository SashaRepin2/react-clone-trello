import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import { Board, BoardForm } from "../components";
import useAppSelector from "../hooks/useAppSelector";

const HomePage: React.FC = () => {
  const { boards } = useAppSelector((state) => state.boardReducer);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const handleExpanded = React.useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "minmax(512px, min-content)",
        gridGap: "50px",
        justifyContent: "space-around",
      }}
    >
      <Container>
        <BoardForm isExpanded={isExpanded} setIsExpanded={handleExpanded} />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#D0BDF4",
          borderRadius: "10px",
          minWidth: "300px",
          boxShadow: 4,
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
          sx={{ padding: "15px 0" }}
        >
          {boards.length ? (
            boards.map((board) => <Board key={board.id} board={board} />)
          ) : (
            <Typography
              variant={"h5"}
              sx={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Добавьте новую доску
            </Typography>
          )}
        </Stack>
      </Container>
    </Container>
  );
};

export default HomePage;
