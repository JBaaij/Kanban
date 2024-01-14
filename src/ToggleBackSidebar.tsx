import React from "react";
import "./ToggleBackSidebar.css";
import IconShowSidebar from "./assets/icon-show-sidebar";
import { AppStateContext } from "./AppStateContext";
import { useContext } from "react";
interface ToggleBackSidebarProps {
  onToggleLeftSidebar: () => void;
}

const ToggleBackSidebar = ({ onToggleLeftSidebar }: ToggleBackSidebarProps) => {
  const appState = useContext(AppStateContext);
  return (
    <div
      onClick={onToggleLeftSidebar}
      className={
        appState.toggleDarkmode
          ? "toggle-back-sidebar-dark"
          : "toggle-back-sidebar-light"
      }
    >
      <IconShowSidebar /> &nbsp;&nbsp;&nbsp;Show Sidebar
    </div>
  );
};

export default ToggleBackSidebar;
