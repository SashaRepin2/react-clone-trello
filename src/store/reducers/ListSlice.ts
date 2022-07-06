import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IList } from "../../interfaces/IList";

interface IListState {
  lists: IList[];
}

const initialState: IListState = {
  lists: [],
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
