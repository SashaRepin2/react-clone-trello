import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IList } from "../../interfaces/IList";

interface IListState {
  lists: IList[];
  isLoading: boolean;
  error: null | string;
}

const initialState: IListState = {
  lists: JSON.parse(localStorage.getItem("lists") || "[]"),
  isLoading: false,
  error: null,
};

export const ListSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList(state, action: PayloadAction<IList>) {
      state.lists.push(action.payload);
    },
    deleteList(state, action: PayloadAction<number>) {
      state.lists = state.lists.filter((item) => item.id !== action.payload);
    },
  },
});

export default ListSlice.reducer;
