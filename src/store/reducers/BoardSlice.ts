import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard } from "../../interfaces/IBoard";
import { IList } from "../../interfaces/ILIst";
import { ITask } from "../../interfaces/ITask";

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
  name: "board",
  initialState,
  reducers: {
    addBoard(state, action: PayloadAction<IBoard>) {
      state.boards.push(action.payload);
    },
    getBoard(state, action: PayloadAction<number>) {
      state.boards.find((item) => item.id === action.payload);
    },
    deleteBoard(state, action: PayloadAction<number>) {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },
    addList(state, action: PayloadAction<{ boardId: number; list: IList }>) {
      const { boardId, list } = action.payload;
      state.boards.find((item) => item.id === boardId)?.lists.push(list);
    },
    deleteList(
      state,
      action: PayloadAction<{ boardId: number; listId: number }>
    ) {
      const { boardId, listId } = action.payload;
      const board = state.boards.find((item) => item.id === boardId);

      if (board) {
        board.lists = board.lists.filter((item) => item.id !== listId);
      }
    },
    addTask(
      state,
      action: PayloadAction<{ boardId: number; listId: number; task: ITask }>
    ) {
      const { boardId, listId, task } = action.payload;
      state.boards
        .find((item) => item.id === boardId)
        ?.lists.find((item) => item.id === listId)
        ?.items.push(task);
    },
  },
});

export default BoardSlice.reducer;
