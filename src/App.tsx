import React from "react";
import { useEffect, useState, useContext } from "react";
import "./App.css";
import ViewTaskPanel from "./ViewTaskPanel";
import ViewAddNewTask from "./ViewAddNewTask";
import ViewAmendPanel from "./ViewAmendPanel";
import ViewAddNewBoard from "./ViewAddNewBoard";
import { AppStateContext } from "./AppStateContext";
import LeftSidebar from "./LeftSidebar";
import TaskBoard from "./TaskBoard";
import UpperContainer from "./UpperContainer";
import ToggleBackSidebar from "./ToggleBackSidebar";

function App() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [toggleBackLeftSidebar, setToggleBaclLeftSidebar] = useState(false);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [showAmendPanel, setShowAmendPanel] = useState(false);
  const [showNewBoardPanel, setShowNewBoardPanel] = useState(false);
  const [countSubTask, setCountSubTask] = useState("");
  const [selectedBoardIndex, setSelectedBoardIndex] = useState<number>(0);
  const appState = useContext(AppStateContext);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchChecked(checked);
    appState.setToggleDarkmode(!appState.toggleDarkmode);
    console.log(` yoyoyo ${appState.toggleDarkmode}`);
  };
  console.log(isSwitchChecked);
  appState.setBoardLength(appState.dataState.boards.length);
  const toggleLeftSidebar = () => {
    setShowLeftSidebar(!showLeftSidebar);
    setToggleBaclLeftSidebar(!toggleBackLeftSidebar);
  };
  const toggleCreatePanel = () => {
    setShowCreatePanel(!showCreatePanel);
  };
  const toggleAmendPanel = () => {
    if (appState.taskTitle) {
      setShowAmendPanel(!showAmendPanel);
      clearNewSubtasks();
    }
  };
  const toggleNewBoardPanel = () => {
    setShowNewBoardPanel(!showNewBoardPanel);
  };
  const clearNewSubtasks = () => {
    appState.setNewSubtasks([]);
  };
  const toggleTaskPanel = () => {
    setShowTaskPanel(!showTaskPanel);
  };
  const addTaskAndTogglePanel = () => {
    setShowCreatePanel(false);
  };
  const deleteTaskAndTogglePanel = () => {
    setShowAmendPanel(false);
    setShowTaskPanel(false);
  };
  const handleBoardClick = (index: number) => {
    setSelectedBoardIndex(index);
    // Rest of your code...
    console.log(showAmendPanel);
  };
  return (
    <div className="container">
      {showLeftSidebar && (
        <LeftSidebar
          onHandleBoardClick={handleBoardClick}
          onToggleNewBoard={toggleNewBoardPanel}
          onToggleLeftSidebar={toggleLeftSidebar}
          onHandleSwitchChange={handleSwitchChange}
          selectedBoardIndex={selectedBoardIndex}
          isSwitchChecked={isSwitchChecked}
        />
      )}
      {toggleBackLeftSidebar && (
        <ToggleBackSidebar onToggleLeftSidebar={toggleLeftSidebar} />
      )}
      <div className="main-content">
        <UpperContainer
          onToggleCreate={toggleCreatePanel}
          onToggleAmend={toggleAmendPanel}
        />
        <TaskBoard onToggleTaskPanel={toggleTaskPanel} />
        <div className={`create-panel ${showCreatePanel ? "show" : ""}`}></div>
        <div>
          <ViewTaskPanel
            className={`${
              appState.toggleDarkmode
                ? "view-task-panel-dark"
                : "view-task-panel-light"
            } ${showTaskPanel ? "show" : ""}`}
            title={appState.taskTitle}
            description={appState.taskDescription}
            count={countSubTask}
            goBackToggle={toggleTaskPanel}
            subtasks={appState.subtasks}
            onSubtaskToggle={(subtaskIndex) => {
              const updatedSubtasks = [...appState.subtasks];
              updatedSubtasks[subtaskIndex].isCompleted =
                !updatedSubtasks[subtaskIndex].isCompleted;
              appState.setSubtasks(updatedSubtasks);
            }}
          />
          <ViewAddNewTask
            className={`${
              appState.toggleDarkmode
                ? "create-panel-dark"
                : "create-panel-light"
            } 
              ${showCreatePanel ? "show" : ""}`}
            panelTitle="Add New Task"
            description={appState.taskDescription}
            onCreateTask={addTaskAndTogglePanel}
            cancelToggle={toggleCreatePanel}
          />
          <ViewAmendPanel
            className={`${
              appState.toggleDarkmode ? "amend-panel-dark" : "amend-panel-light"
            } ${showAmendPanel ? "show" : ""}`}
            panelTitle="Adjust Task"
            description={appState.taskDescription}
            onDeleteTask={deleteTaskAndTogglePanel}
            onDeleteBoard={deleteTaskAndTogglePanel}
            cancelToggle={toggleAmendPanel}
          />
          <ViewAddNewBoard
            panelTitle="Create New Board"
            className={`${
              appState.toggleDarkmode ? "board-panel-dark" : "board-panel-light"
            } ${showNewBoardPanel ? "show" : ""}`}
            description={appState.taskDescription}
            cancelToggle={toggleNewBoardPanel}
            onCreateBoard={() => {
              toggleNewBoardPanel();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
