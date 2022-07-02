import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard } from "../../interfaces/IBoard";

interface IBoardState {
  boards: IBoard[];
  isLoading: boolean;
  error: null | string;
}

const initialState: IBoardState = {
  boards: JSON.parse(localStorage.getItem("boards") || "[]"),
  isLoading: false,
  error: null,
};

export const BoardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    /**
     * Добавление новой доски
     * @param state текущее состояние
     * @param action объект - доска
     */
    addBoard(state, action: PayloadAction<{ newBoard?: IBoard }>) {
      const { newBoard } = action.payload;
      if (newBoard) {
        state.boards.push(newBoard);
      } else {
        state.boards.push({
          id: Date.now(),
          title: "New Board",
          created: Date.now(),
        });
      }
    },

    /**
     * Удаление доски
     * @param state  текущее состояние
     * @param action уникальный номер доски
     */
    deleteBoard(state, action: PayloadAction<number>) {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },
  },
});

export default BoardSlice.reducer;
