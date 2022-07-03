import { Box, Container, IconButton } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask, Statuses } from "../../../../interfaces/ITask";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

interface ItemProps {
  index: number;
  task: ITask;
  onCompleteHandler: (taskId: number) => void;
  onDeleteHandler: (taskId: number) => void;
}

const Task: React.FC<ItemProps> = ({
  index,
  task,
  onCompleteHandler,
  onDeleteHandler,
}) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "10px",
            padding: "5px",
            bgcolor: task.status === Statuses.COMPLETE ? "green" : "#fff",
          }}
        >
          <Box>{task.title}</Box>
          <Box>
            <IconButton
              onClick={() => {
                onCompleteHandler(task.id);
              }}
            >
              {task.status === Statuses.COMPLETE ? (
                <CloseIcon />
              ) : (
                <CheckIcon />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                onDeleteHandler(task.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Container>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
