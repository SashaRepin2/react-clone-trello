import { InputBase } from "@mui/material";
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
        paddingTop: "15px",
      }}
    >
      <InputBase
        value={inputValue}
        placeholder={placeholderValue || "Введите название доски"}
        onChange={(e) => {
          onChangeHandler(e.target.value);
        }}
        sx={{
          input: {
            bgcolor: "#fff",
            borderRadius: "15px",
            padding: "5px",
            color: "#57327e",
            fontSize: "bold",
          },
        }}
      />
    </Container>
  );
};

export default React.memo(SearchFilter);
