import React from "react";
import { Board } from "../components/Board/Board";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { BoardSlice } from "../store/reducers/BoardSlice";

export const HomePage: React.FC = () => {
  const { boards } = useAppSelector((state) => state.boardReducer);
  const { addBoard } = BoardSlice.actions;
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = React.useState<string>("");
  function onKeyDownHanlder(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log("Key: " + event.code);

    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      dispatch(addBoard({ id: Date.now(), title: inputValue, lists: [] }));
      setInputValue("");
      console.log(boards);
    }
  }

  return (
    <React.Fragment>
      <div>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={onKeyDownHanlder}
        />
      </div>
      <div>
        <div>Title</div>
        <div>
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
