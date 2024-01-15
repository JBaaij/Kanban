import React, { useEffect, useContext } from "react";
import "./TaskBoard.css";
import { AppStateContext } from "./AppStateContext";
import TaskButton from "./TaskButton";

interface TaskBoardProps {
  onToggleTaskPanel: () => void;
}

const TaskBoard = ({ onToggleTaskPanel }: TaskBoardProps) => {
  const appState = useContext(AppStateContext);

  return (
    <div
      className={
        appState.toggleDarkmode
          ? "middle-container-dark"
          : "middle-container-light"
      }
    >
      <div className="column">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TODO</div>
      <div className="column">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOING</div>
      <div className="column">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DONE</div>

      {/* Dynamic columns from AppStateContext */}
      <div className="right-sidebar"></div>
      {appState.dataState.boards[appState.boardNumber].columns.map(
        (column: any, columnIndex: number) => (
          <div className="column" key={columnIndex}>
            {column.tasks.map((task: any, index: number) => (
              <TaskButton
                key={index}
                label={task.title}
                subTaskCount={`${
                  task.subtasks.filter((subtask: any) => subtask.isCompleted)
                    .length
                } of ${task.subtasks.length} subtasks`}
                onClick={() => {
                  onToggleTaskPanel();
                  appState.setTaskTitle(task.title);
                  appState.setTaskIndex(index);
                  appState.setTaskDescription(task.description);
                  appState.setSubtasks([...task.subtasks]);
                  appState.setTaskStatus(column.name);
                  appState.setColumnIndex(columnIndex);
                  console.log(columnIndex); // Consider removing console logs in production
                }}
              />
            ))}
          </div>
        )
      )}

      <div className="right-sidebar"></div>
    </div>
  );
};

export default TaskBoard;
