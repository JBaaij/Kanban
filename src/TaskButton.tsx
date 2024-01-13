import "./TaskButton.css";
import React, { useContext } from "react";
import { AppStateContext } from "./AppStateContext";
interface TaskButtonProps {
  label: string;
  subTaskCount: string;
  onClick: () => void;
  className?: string;
}
const TaskButton = (props: TaskButtonProps) => {
  const { label, subTaskCount, onClick, className } = props;
  const appState = useContext(AppStateContext);
  return (
    <div
      className={
        appState.toggleDarkmode
          ? `task-button-dark ${className || ""}`
          : `task-button-light ${className || ""}`
      }
      onClick={onClick}
    >
      <div>{label}</div>
      <div className="subtaskStyle">{subTaskCount}</div>
    </div>
  );
};

export default TaskButton;
