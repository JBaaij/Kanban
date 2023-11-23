import { AppStateContext, AppStateProvider } from "./AppStateContext";
import "./ViewAmendPanel.css";
import { useContext, useEffect } from "react";
interface ViewAmendPanelProps {
  panelTitle: string;
  description?: string;
  className?: string;

  subtasks?: { title: string; isCompleted: boolean }[];
  onSubtaskToggle?: (index: number) => void;
}

const ViewAmendPanel = (props: ViewAmendPanelProps) => {
  const { panelTitle, description, className, subtasks, onSubtaskToggle } =
    props;

  const appState = useContext(AppStateContext);
  // Function to handle adding a new subtask
  const addNewSubtask = () => {
    // Implement the logic to add a new subtask to appState
    // You will need to update appState.subtasks with the new subtask
  };

  // Function to handle creating a new task
  const createNewTask = () => {
    // Implement the logic to create a new task using the form data
    // You can access the form data from appState.taskTitle,
    // appState.taskDescription, appState.taskStatus, and appState.subtasks
  };

  return (
    <div className={`${className || ""}`}>
      <div className="titleStyle">{panelTitle}</div>

      <div className="form-section">
        <div className="form-header">Title</div>
        <input
          type="text"
          value={appState.taskTitle}
          onChange={(e) => appState.setTaskTitle(e.target.value)}
        />
      </div>
      {/* Description */}
      <div className="form-section">
        <div className="form-header">Description</div>
        <textarea
          value={appState.taskDescription}
          onChange={(e) => appState.setTaskDescription(e.target.value)}
        />
      </div>

      {/* Subtasks */}
      <div className="form-section">
        <div className="form-header">Subtasks</div>
        {appState.subtasks.map((subtask, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              onChange={() => {
                // Implement logic to toggle subtask completion
                // You can use onSubtaskToggle or a similar function
              }}
            />
            <input
              type="text"
              value={subtask.title}
              onChange={(e) => {
                // Implement logic to update subtask title
                // You can use onSubtaskToggle or a similar function
              }}
            />
          </div>
        ))}
        <button onClick={addNewSubtask}>Add New Subtask</button>
      </div>

      {/* Status */}
      <div className="form-section">
        <div className="form-header">Status</div>
        <select
          value={appState.taskStatus}
          onChange={(e) => appState.setTaskStatus(e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Create Task Button */}
      <div className="form-section">
        <button onClick={createNewTask}>Create Task</button>
      </div>
    </div>
  );
};

export default ViewAmendPanel;
