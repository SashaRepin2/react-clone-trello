import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, Statuses } from "../../interfaces/ITask";

interface ITaskState {
  tasks: ITask[];
}

const initialState: ITaskState = {
  tasks: [],
};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      state.tasks.push(action.payload);
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
