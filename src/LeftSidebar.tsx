import React, { useContext } from "react";
import "./LeftSidebar.css";
import LightTheme from "./assets/icon-light-theme";
import DarkTheme from "./assets/icon-dark-theme";
import IconHideSidebar from "./assets/icon-hide-sidebar";
import LabelButton from "./LabelButton";
import SwitchButton from "./ColorModeSwitch";
import IconLogoLight from "./assets/logo-light";
import IconLogoDark from "./assets/logo-dark";
import { AppStateContext } from "./AppStateContext";

interface LeftSidebarProps {
  onHandleBoardClick: (index: number) => void;
  onToggleNewBoard: () => void;
  onToggleLeftSidebar: () => void;
  onHandleSwitchChange: (checked: boolean) => void;
  selectedBoardIndex: number; // Optional, only if it's not part of AppStateContext
  isSwitchChecked: boolean; // Optional, only if it's not part of AppStateContext
}

const LeftSidebar = (props: LeftSidebarProps) => {
  const {
    onHandleBoardClick,
    onToggleNewBoard,
    onToggleLeftSidebar,
    onHandleSwitchChange,
    selectedBoardIndex, // Now taken from props
    isSwitchChecked, // Now taken from props
  } = props;

  const appState = useContext(AppStateContext);

  return (
    <div
      className={isSwitchChecked ? "left-sidebar-dark" : "left-sidebar-light"}
    >
      {/* Title and buttons */}
      <div className="title">
        {isSwitchChecked ? <IconLogoLight /> : <IconLogoDark />}
      </div>
      <div className="boardnames">
        <div className={isSwitchChecked ? "allboards-dark" : "allboards-light"}>
          ALL BOARDS ({appState.boardLength})
        </div>

        {appState.dataState.boards.map((board: any, index: number) => (
          <LabelButton
            key={index}
            label={board.name}
            onClick={() => {
              onHandleBoardClick(index);
              appState.setBoardName(board.name);
              appState.setBoardNumber(index);
            }}
            isSelected={selectedBoardIndex === index} // Using selectedBoardIndex directly
          />
        ))}
        <LabelButton
          onClick={onToggleNewBoard}
          label={"+Create New Board"}
          className="button-create-new-board"
        />
      </div>
      <div id={isSwitchChecked ? "button-switch-dark" : "button-switch-light"}>
        <LightTheme width={20} height={20} />
        <SwitchButton
          onChange={onHandleSwitchChange}
          checked={isSwitchChecked}
        />
        <DarkTheme width={20} height={20} />
      </div>
      <button
        onClick={onToggleLeftSidebar}
        id={
          isSwitchChecked
            ? "button-hide-sidebar-dark"
            : "button-hide-sidebar-light"
        }
      >
        <IconHideSidebar /> &nbsp;&nbsp;&nbsp;Hide Sidebar
      </button>
    </div>
  );
};

export default LeftSidebar;
