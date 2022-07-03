import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import { Board, BoardForm, SearchFilter } from "../components";
import useAppSelector from "../hooks/useAppSelector";
import { IBoard } from "../interfaces/IBoard";
import useDebounce from "../hooks/useDebounce";

const HomePage: React.FC = () => {
  const { boards } = useAppSelector((state) => state.boardReducer);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [filteredBoards, setFilteredBoards] = React.useState<IBoard[]>(boards);
  const [filterValue, setFilterValue] = React.useState<string>("");
  const debouncedValue = useDebounce(filterValue, 500);

  const handleExpanded = React.useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  function onChangeFilterValue(value: string) {
    setFilterValue(value);
  }

  React.useEffect(() => {
    setFilteredBoards(
      boards.filter((board) =>
        board.title.toLocaleLowerCase().includes(debouncedValue)
      )
    );
  }, [debouncedValue, boards]);

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
        <SearchFilter
          inputValue={filterValue}
          onChangeHandler={onChangeFilterValue}
        />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
          sx={{ padding: "15px 0" }}
        >
          {filteredBoards.length ? (
            filteredBoards.map((board) => (
              <Board key={board.id} board={board} />
            ))
          ) : (
            <Typography
              variant={"h5"}
              sx={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Ничего не найдено
            </Typography>
          )}
        </Stack>
      </Container>
    </Container>
  );
};

export default HomePage;
