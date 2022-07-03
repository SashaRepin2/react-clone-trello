import { SearchOutlined } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

interface ISearchFilter {
  inputValue: string;
  placeholderValue?: string;
  onChangeHandler: (value: string) => void;
}

const SearchFilter: React.FC<ISearchFilter> = ({
  inputValue,
  placeholderValue,
  onChangeHandler,
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px 15px",
      }}
    >
      <TextField
        variant={"outlined"}
        value={inputValue}
        placeholder={placeholderValue || "Введите название доски"}
        onChange={(e) => {
          onChangeHandler(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <IconButton sx={{ pointerEvents: "none" }}>
              <SearchOutlined />
            </IconButton>
          ),
        }}
      />
    </Container>
  );
};

export default React.memo(SearchFilter);
