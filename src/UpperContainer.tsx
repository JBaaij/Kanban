import React, { useEffect, useState, useContext, useRef } from "react";
import "./UpperContainer.css";
import { AppStateContext } from "./AppStateContext";
import IconMenu from "./assets/icon-vertical-ellipsis";
import MenuPanel from "./DropdownMenu"; // Updated import
import jsonData from "../src/data.json";

interface UpperContainerProps {
  onToggleCreate: () => void;
  onToggleAmend: () => void;
}

const UpperContainer = ({
  onToggleCreate,
  onToggleAmend,
}: UpperContainerProps) => {
  const appState = useContext(AppStateContext);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const toggleDropdownMenu = () => {
    setShowDropdownMenu((prevShowDropdownMenu) => !prevShowDropdownMenu);
  };

  const closeDropdownMenu = () => {
    setShowDropdownMenu(false);
  };
  useEffect(() => {
    console.log("jabba");
    const handleMouseDownOutside = (event: MouseEvent) => {
      const dropdownMenu = document.querySelector(".dropdown-menu");

      if (
        dropdownMenu &&
        !dropdownMenu.contains(event.target as Node) &&
        !(event.target as HTMLElement).classList.contains("test-button")
      ) {
        closeDropdownMenu();
      }
    };

    // Attach the event listener when the dropdown should be shown
    if (showDropdownMenu) {
      document.addEventListener("mousedown", handleMouseDownOutside);
    } else {
      // Remove the event listener when the dropdown should be hidden
      document.removeEventListener("mousedown", handleMouseDownOutside);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleMouseDownOutside);
    };
  }, [showDropdownMenu]);

  const menuOptions = [
    {
      label: "Get dataset:",
      onClick: () => {
        console.log(
          "Get initial dataset"
        ); /* /* Functionality for getting initial dataset */
      },
    },
    {
      label: "\u00A0\u00A0\u00A0Get initial dataset",

      onClick: () => {
        appState.setDataState(jsonData);
        console.log(
          "Get initial dataset"
        ); /* /* Functionality for getting initial dataset */
        closeDropdownMenu(); // Close the dropdown after clicking
      },
    },
    {
      label: "\u00A0\u00A0\u00A0Get saved Kanban boards",

      onClick: () => {
        getKanbanBoardsFromLocal();
        closeDropdownMenu(); // Close the dropdown after clicking
      },
    },
    {
      label: "Save Kanban boards",
      onClick: () => {
        saveKanbanBoardsToLocal();

        console.log("Save"); /* Functionality for saving dataset */
        closeDropdownMenu(); // Close the dropdown after clicking
      },
    },
    {
      label: "Delete saved Kanban boards",
      onClick: () => {
        deleteSavedKanbanBoards();
        closeDropdownMenu(); // Close the dropdown after clicking
      },
    },
    {
      label: "Delete current board",
      onClick: () => {
        console.log("elete current board");
        deleteCurrentBoard();
        /* Functionality for deleting the board */
        closeDropdownMenu(); // Close the dropdown after clicking
      },
    },
  ];
  const deleteCurrentBoard = () => {
    console.log("jabba");
    const currentBoardIndex = appState.boardNumber;
    const updatedBoards = appState.dataState.boards.filter(
      (_board: [], index: number) => index !== currentBoardIndex
    );
    appState.setDataState({
      ...appState.dataState,
      boards: updatedBoards,
    });

    if (updatedBoards.length > 0) {
      appState.setBoardName(updatedBoards[0].name);
    } else {
      appState.setBoardName("");
      appState.setBoardNumber(-1);
    }

    appState.setTaskTitle("");
  };
  const saveKanbanBoardsToLocal = () => {
    const kanbanData = {
      boards: appState.dataState.boards, // Assuming this is where your Kanban data is stored
    };
    const jsonData = JSON.stringify(kanbanData);
    localStorage.setItem("kanbanData", jsonData);
  };
  const getKanbanBoardsFromLocal = () => {
    const jsonData = localStorage.getItem("kanbanData");
    if (jsonData) {
      const kanbanData = JSON.parse(jsonData);
      // Update your app state with the retrieved data
      appState.setDataState(kanbanData);
    }
  };
  const deleteSavedKanbanBoards = () => {
    localStorage.removeItem("kanbanData");
    console.log("Saved Kanban boards deleted");
  };

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
        <button
          onClick={toggleDropdownMenu}
          id={
            appState.toggleDarkmode ? "background-menu-dark" : "lightbackground"
          }
          className="test-button"
        >
          <IconMenu />
        </button>
      </div>
      <MenuPanel
        className={`dropdown-menu ${showDropdownMenu ? "show" : ""}`}
        options={menuOptions}
      />
    </div>
  );
};

export default UpperContainer;
