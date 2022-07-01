import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/BoardSlice";
import listReducer from "./reducers/ListSlice";
import taskReducer from "./reducers/TaskSlice";

const rootReducer = combineReducers({
  boardReducer,
  listReducer,
  taskReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
