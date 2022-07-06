import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard } from "../../interfaces/IBoard";

interface IBoardState {
  boards: IBoard[];
}

const initialState: IBoardState = {
  boards: [],
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
    addBoard(state, action: PayloadAction<IBoard>) {
      if (action.payload) {
        state.boards.push(action.payload);
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
