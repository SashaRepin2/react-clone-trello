import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IList } from "../../interfaces/ILIst";

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
    addList(state, action: PayloadAction<{ newList: IList }>) {
      const { newList } = action.payload;
      state.lists.push(newList);
    },
    deleteList(state, action: PayloadAction<number>) {
      state.lists = state.lists.filter((item) => item.id !== action.payload);
    },
  },
});

export default ListSlice.reducer;
