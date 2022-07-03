import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { BoardSlice } from "../../store/reducers/BoardSlice";
import useAppDispatch from "../../hooks/useAppDispatch";

import "./BoardForm.scss";

interface BoardFormProps {
  isExpanded: boolean;
  setIsExpanded: () => void;
}

const BoardForm: React.FC<BoardFormProps> = ({ isExpanded, setIsExpanded }) => {
  const dispatch = useAppDispatch();
  const { addBoard } = BoardSlice.actions;
  const [inputValue, setInputValue] = React.useState<string>("");

  function onSubmitHanlder() {
    if (inputValue) {
      dispatch(
        addBoard({ id: Date.now(), title: inputValue, created: Date.now() })
      );
      setInputValue("");
      setIsExpanded();
    }
  }

  function onCancelHandler() {
    setInputValue("");
    setIsExpanded();
  }

  return (
    <Box className={"board_form"}>
      <Accordion
        expanded={isExpanded}
        onChange={setIsExpanded}
        sx={{ boxShadow: 4 }}
      >
        <AccordionSummary className={"board_form__header"}>
          <AddBoxIcon />
          <Typography variant={"h5"}>Добавить доску</Typography>
        </AccordionSummary>
        <AccordionDetails className={"board_form__body"}>
          <TextField
            value={inputValue}
            placeholder={"Название доски"}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Box className="board_form__options">
            <Button variant="contained" color="error" onClick={onCancelHandler}>
              Отмена
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={onSubmitHanlder}
            >
              Сохранить
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default React.memo(BoardForm);
