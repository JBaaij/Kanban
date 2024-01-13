import React, { useContext } from "react";
import "./UpperContainer.css";
import { AppStateContext } from "./AppStateContext";

interface UpperContainerProps {
  onToggleCreate: () => void;
  onToggleAmend: () => void;
}

const UpperContainer = ({
  onToggleCreate,
  onToggleAmend,
}: UpperContainerProps) => {
  const appState = useContext(AppStateContext);

  return (
    <div
      className={
        appState.toggleDarkmode
          ? "upper-container-dark"
          : "upper-container-light"
      }
    >
      <span>{appState.boardName}</span>
      <div id="button-container">
        <button onClick={onToggleCreate} id="first-button-uppercontainer">
          +Add New Task
        </button>
        <button onClick={onToggleAmend} id="button-uppercontainer">
          Adjust Task
        </button>
      </div>
    </div>
  );
};

export default UpperContainer;
