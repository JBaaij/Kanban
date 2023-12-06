import React from "react";
import "./ToggleBackSidebar.css";
import IconShowSidebar from "./assets/icon-show-sidebar";

interface ToggleBackSidebarProps {
  onToggleLeftSidebar: () => void;
}

const ToggleBackSidebar = ({ onToggleLeftSidebar }: ToggleBackSidebarProps) => {
  return (
    <div onClick={onToggleLeftSidebar} className="toggle-back-sidebar">
      <IconShowSidebar /> &nbsp;&nbsp;&nbsp;Show Sidebar
    </div>
  );
};

export default ToggleBackSidebar;
