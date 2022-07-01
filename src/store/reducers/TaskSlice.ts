import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { ITask, Statuses } from "../../interfaces/ITask";

interface ITaskState {
  tasks: ITask[];
  isLoading: boolean;
  error: null | string;
}

const initialState: ITaskState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  isLoading: false,
  error: null,
};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ newTask: ITask }>) {
      const { newTask } = action.payload;
      state.tasks.push(newTask);
    },
    changeStatus(
      state,
      action: PayloadAction<{
        taskId: number;
        newStatus: Statuses;
      }>
    ) {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = newStatus;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    moveTask(
      state,
      action: PayloadAction<{
        taskId: number;
        listId: number;
      }>
    ) {
      const { taskId, listId } = action.payload;

      const task = state.tasks.find((task) => task.id === taskId);

      if (task) {
        task.listId = listId;
      }
    },
  },
});

export default TaskSlice.reducer;
