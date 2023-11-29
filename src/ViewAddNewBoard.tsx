import "./ViewAddNewBoard.css";
import React, { useState, useContext } from "react";
import { AppStateContext } from "./AppStateContext";

interface ViewAddNewBoardProps {
  panelTitle: string;
  description?: string;
  className?: string;
  onCreateBoard: () => void;
}

const ViewAddNewBoard = (props: ViewAddNewBoardProps) => {
  const appState = useContext(AppStateContext);

  const { panelTitle, className } = props;
  const [newBoardName, setNewBoardName] = useState(""); // State for input value
  const createNewBoard = (boardName: string) => {
    // Create a new board object
    const newBoard = {
      name: boardName,
      columns: [
        {
          name: "Todo",
          tasks: [],
        },
        {
          name: "Doing",
          tasks: [],
        },
        {
          name: "Done",
          tasks: [],
        },
      ],
    };
    const updatedDataStateCopy = {
      ...appState.dataState,
      boards: [...appState.dataState.boards, newBoard],
    };

    appState.setDataState(updatedDataStateCopy);
    /*
    appState.setBoardNumber(appState.dataState.boards.length);
    appState.setBoardName(boardName);
    */
    props.onCreateBoard();
  };

  const handleNewBoardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBoardName.length >= 3) {
      console.log("Creating a new board with name:", newBoardName);

      createNewBoard(newBoardName);

      setNewBoardName("");
    }
  };

  return (
    <div className={`board-panel ${className || ""}`}>
      <div className="titleStyle">{panelTitle}</div>
      <form onSubmit={handleNewBoardSubmit}>
        <input
          type="text"
          placeholder="Enter New Board Name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          className="input-box-name"
        />
        <button type="submit" id="button-board-name">
          Submit Board Name
        </button>
      </form>
    </div>
  );
};

export default ViewAddNewBoard;
