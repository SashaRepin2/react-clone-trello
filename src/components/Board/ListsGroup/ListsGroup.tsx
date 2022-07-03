import { Stack, Typography } from "@mui/material";
import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { TaskSlice } from "../../../store/reducers/TaskSlice";
import List from "../List/List";

interface IListsGroup {
  boardId: number;
}

const ListsGroup: React.FC<IListsGroup> = ({ boardId }) => {
  const dispatch = useAppDispatch();
  const { moveTask } = TaskSlice.actions;
  const lists = useAppSelector((state) =>
    state.listReducer.lists.filter((list) => list.boardId === boardId)
  );

  function onDragEndHandler(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination || !boardId) {
      return;
    }

    // from
    const sInd = +source.droppableId;
    // to
    const dInd = +destination.droppableId;

    if (sInd !== dInd) {
      const taskId = +draggableId;
      dispatch(
        moveTask({
          listId: dInd,
          taskId: taskId,
        })
      );
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Stack
        className="asd"
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"stretch"}
        spacing={2}
        sx={{
          margin: "15px 0",
          width: "100%",
          minHeight: "300px",
          overflowX: "auto",
          paddingBottom: "15px",
        }}
      >
        {lists.length ? (
          lists.map((list) => <List key={list.id} list={list} />)
        ) : (
          <Typography
            variant={"h5"}
            sx={{
              color: "#fff",
              margin: "0 auto",
            }}
          >
            Добавьте список
          </Typography>
        )}
      </Stack>
    </DragDropContext>
  );
};

export default React.memo(ListsGroup);
