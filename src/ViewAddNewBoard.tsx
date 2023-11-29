import "./ViewAddNewBoard.css";
import React, { useState } from "react";

interface ViewAddNewBoardProps {
  panelTitle: string;
  description?: string;
  className?: string;
}

const ViewAddNewBoard = (props: ViewAddNewBoardProps) => {
  const { panelTitle, className } = props;
  const [newBoardName, setNewBoardName] = useState(""); // State for input value

  const handleNewBoardSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle creating a new board (you can add your logic here)
    console.log("Creating a new board with name:", newBoardName);

    // Reset the input value
    setNewBoardName("");
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
