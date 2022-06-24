import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard } from "../../interfaces/IBoard";

interface BoardState {
  boards: IBoard[];
  isLoading: boolean;
  error: null | string;
}

const initialState: BoardState = {
  boards: [],
  isLoading: false,
  error: null,
};

export const BoardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard(state, action: PayloadAction<IBoard>) {
      state.boards.push(action.payload);
    },
  },
});

export default BoardSlice.reducer;
