import React from "react";
import { useState, useContext } from "react";
import "./App.css";
import jsonData from "../src/data.json";
import LabelButton from "./LabelButton";
import TaskButton from "./TaskButton";
import ViewTaskPanel from "./ViewTaskPanel";
import ViewAddNewTask from "./ViewAddNewTask";
import ViewAmendPanel from "./ViewAmendPanel";
import { AppStateContext } from "./AppStateContext";

function App() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [showAmendPanel, setShowAmendPanel] = useState(false);
  const [countSubTask, setCountSubTask] = useState("");
  const appState = useContext(AppStateContext);

  appState.setBoardLength(jsonData.boards.length);
  const toggleLeftSidebar = () => {
    setShowLeftSidebar(!showLeftSidebar);
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

  return (
    <div className="container">
      {showLeftSidebar && (
        <div className="left-sidebar">
          {/* Title and buttons */}
          <div className="title">Kanban</div>
          <div className="allboards">ALL BOARDS ({appState.boardLength})</div>
          {appState.dataState.boards.map((board: any, index: number) => (
            <LabelButton
              key={index}
              label={appState.dataState.boards[index].name}
              onClick={() => {
                appState.setBoardName(appState.dataState.boards[index].name);
                appState.setBoardNumber(index);
              }}
            />
          ))}
          <button onClick={toggleLeftSidebar} id="button-hide-sidebar">
            Hide Sidebar
          </button>
        </div>
      )}

      <div className="main-content">
        {/* Upper container */}
        <div>
          <div className="upper-container">
            <span>{appState.boardName}</span>
            <button
              onClick={toggleCreatePanel}
              id="first-button-uppercontainer"
            >
              +Add New Task
            </button>
            <button onClick={toggleAmendPanel} id="button-uppercontainer">
              Adjust Task
            </button>
          </div>
          {/* Middle container with 3 columns */}
          <div className="middle-container">
            {/* 3 columns */}
            <div className="column">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TODO
            </div>
            <div className="column">
              {" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOING
            </div>
            <div className="column">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DONE
            </div>
            <div className="right-sidebar">
              <div></div>
            </div>
            {appState.dataState.boards[appState.boardNumber].columns.map(
              (column: any, columnIndex: number) => (
                <div className="column" key={columnIndex}>
                  {column.tasks.map((task: any, index: number) => (
                    <TaskButton
                      key={index}
                      label={task.title}
                      subTaskCount={`${
                        task.subtasks.filter(
                          (subtask: any) => subtask.isCompleted
                        ).length
                      } of ${task.subtasks.length} subtasks`}
                      onClick={() => {
                        toggleTaskPanel();
                        appState.setTaskTitle(task.title);
                        appState.setTaskIndex(index);
                        appState.setTaskDescription(task.description);
                        appState.setSubtasks([...task.subtasks]);
                        appState.setTaskStatus(column.name);
                        appState.setColumnIndex(columnIndex);
                        console.log(columnIndex);
                        setCountSubTask(
                          `subtasks (${
                            task.subtasks.filter(
                              (subtask: any) => subtask.isCompleted
                            ).length
                          } of ${task.subtasks.length}) `
                        );
                      }}
                    />
                  ))}
                </div>
              )
            )}

            <div className="right-sidebar"></div>
            <div
              className={`create-panel ${showCreatePanel ? "show" : ""}`}
            ></div>
            <div>
              <ViewTaskPanel
                className={`view-task-panel ${showTaskPanel ? "show" : ""}`}
                title={appState.taskTitle}
                description={appState.taskDescription}
                count={countSubTask}
                subtasks={appState.subtasks}
                onSubtaskToggle={(subtaskIndex) => {
                  // Toggle the completion status of the subtask
                  const updatedSubtasks = [...appState.subtasks];
                  updatedSubtasks[subtaskIndex].isCompleted =
                    !updatedSubtasks[subtaskIndex].isCompleted;
                  appState.setSubtasks(updatedSubtasks);
                }}
              />
              <ViewAddNewTask
                className={`create-panel ${showCreatePanel ? "show" : ""}`}
                panelTitle="Add New Task"
                description={appState.taskDescription}
                onCreateTask={addTaskAndTogglePanel}
              />
              <ViewAmendPanel
                className={`amend-panel ${showAmendPanel ? "show" : ""}`}
                panelTitle="Adjust Task"
                description={appState.taskDescription}
                onDeleteTask={deleteTaskAndTogglePanel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
