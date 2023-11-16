import React from "react";
import { useState } from "react";
import "./App.css";
import jsonData from "../src/data.json";
import LabelButton from "./LabelButton";
import TaskButton from "./TaskButton";
import ViewTaskPanel from "./ViewTaskPanel";
function App() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [boardName, setBoardName] = useState("Platform Launch");
  const [boardNumber, setBoardNumber] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subtasks, setSubtasks] = useState<
    { title: string; isCompleted: boolean }[]
  >([]);
  const [countSubTask, setCountSubTask] = useState("");
  const [statusName, setStatusName] = useState("");

  // ...

  const toggleLeftSidebar = () => {
    setShowLeftSidebar(!showLeftSidebar);
  };
  const toggleCreatePanel = () => {
    setShowCreatePanel(!showCreatePanel);
  };
  const toggleTaskPanel = () => {
    setShowTaskPanel(!showTaskPanel);
  };

  return (
    <div className="container">
      {showLeftSidebar && (
        <div className="left-sidebar">
          {/* Title and buttons */}
          <div className="title">Title</div>
          <LabelButton
            label={"Platform Launch"}
            onClick={() => {
              setBoardName("Platform Launch");
              setBoardNumber(0);
            }}
          />
          <LabelButton
            label={"Marketing Plan"}
            onClick={() => {
              setBoardName("Marketing Plan");
              setBoardNumber(1);
            }}
          />
          <LabelButton
            label={"Roadmap"}
            onClick={() => {
              setBoardName("Roadmap");
              setBoardNumber(2);
            }}
          />

          <button onClick={toggleLeftSidebar}>Remove Left Sidebar</button>
        </div>
      )}

      <div className="main-content">
        {/* Upper container */}
        <div>
          <div className="upper-container">
            <span>{boardName}</span>
            <button onClick={toggleCreatePanel}>Open/Close Panel</button>
          </div>
          {/* Middle container with 3 columns */}
          <div className="middle-container">
            {/* 3 columns */}
            <div className="column">todo</div>
            <div className="column">doing</div>
            <div className="column">done</div>
            <div className="right-sidebar">
              <div></div>
            </div>
            <div className="column">
              {jsonData.boards[boardNumber].columns[0].tasks.map(
                (task, index) => (
                  <TaskButton
                    key={index}
                    label={task.title}
                    subTask={`${
                      task.subtasks.filter((subtask) => subtask.isCompleted)
                        .length
                    } of ${task.subtasks.length} subtasks`}
                    onClick={() => {
                      toggleTaskPanel();
                      setTaskTitle(task.title);
                      setTaskDescription(task.description);
                      setSubtasks([...task.subtasks]);
                      setStatusName(
                        jsonData.boards[boardNumber].columns[0].name
                      );
                      setCountSubTask(
                        `subtasks (${
                          task.subtasks.filter((subtask) => subtask.isCompleted)
                            .length
                        } of ${task.subtasks.length}) `
                      );

                      // Add your button click logic here
                    }}
                  />
                )
              )}
            </div>
            <div className="column">
              {jsonData.boards[boardNumber].columns[1].tasks.map(
                (task, index) => (
                  <TaskButton
                    key={index}
                    label={task.title}
                    subTask={`${
                      task.subtasks.filter((subtask) => subtask.isCompleted)
                        .length
                    } of ${task.subtasks.length} subtasks`}
                    onClick={() => {
                      toggleTaskPanel();
                      setTaskTitle(task.title);
                      setTaskDescription(task.description);
                      setSubtasks([...task.subtasks]);
                      setStatusName(
                        jsonData.boards[boardNumber].columns[1].name
                      );
                      setCountSubTask(
                        `subtasks (${
                          task.subtasks.filter((subtask) => subtask.isCompleted)
                            .length
                        } of ${task.subtasks.length}) `
                      );
                      // Add your button click logic here
                    }}
                  />
                )
              )}
            </div>
            <div className="column">
              {jsonData.boards[boardNumber].columns[2].tasks.map(
                (task, index) => (
                  <TaskButton
                    key={index}
                    label={task.title}
                    subTask={`${
                      task.subtasks.filter((subtask) => subtask.isCompleted)
                        .length
                    } of ${task.subtasks.length} subtasks`}
                    onClick={() => {
                      toggleTaskPanel();
                      setTaskTitle(task.title);
                      setTaskDescription(task.description);
                      setSubtasks([...task.subtasks]);
                      setStatusName(
                        jsonData.boards[boardNumber].columns[2].name
                      );
                      setCountSubTask(
                        `subtasks (${
                          task.subtasks.filter((subtask) => subtask.isCompleted)
                            .length
                        } of ${task.subtasks.length}) `
                      );
                      // Add your button click logic here
                    }}
                  />
                )
              )}
            </div>
            <div className="right-sidebar">
              <button>Button 4</button>
            </div>
            <div
              className={`create-panel ${showCreatePanel ? "show" : ""}`}
            ></div>
            <div>
              <ViewTaskPanel
                className={`view-task-panel ${showTaskPanel ? "show" : ""}`}
                title={taskTitle}
                description={taskDescription}
                count={countSubTask}
                column={statusName}
                subtasks={subtasks}
                onSubtaskToggle={(subtaskIndex) => {
                  // Toggle the completion status of the subtask
                  const updatedSubtasks = [...subtasks];
                  updatedSubtasks[subtaskIndex].isCompleted =
                    !updatedSubtasks[subtaskIndex].isCompleted;
                  setSubtasks(updatedSubtasks);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
