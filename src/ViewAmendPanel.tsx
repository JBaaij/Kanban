import { AppStateContext, AppStateProvider } from "./AppStateContext";
import "./ViewAmendPanel.css";
import { useContext, useEffect } from "react";

interface ViewAmendPanelProps {
  panelTitle: string;
  description?: string;
  className?: string;
  onDeleteTask: () => void;
  subtasks?: { title: string; isCompleted: boolean }[];
  onSubtaskToggle?: (index: number) => void;
}

const ViewAmendPanel: React.FC<ViewAmendPanelProps> = (props) => {
  const { panelTitle, description, className, subtasks, onSubtaskToggle } =
    props;
  const appState = useContext(AppStateContext);

  // Function to handle adding a new subtask
  const addNewSubtask = () => {
    const updatedSubtasks = [
      ...appState.newSubtasks,
      { title: "", isCompleted: false },
    ];
    appState.setNewSubtasks(updatedSubtasks);
  };

  // Function to handle creating a new task
  const updateTask = () => {
    const updatedTask = {
      description: appState.newTaskDescription,
      status: appState.newTaskStatus,
      subtasks: appState.newSubtasks,
    };

    props.onDeleteTask();
  };
  const updateNewSubtaskTitle = (index: number, title: string) => {
    const updatedSubtasks = [...appState.newSubtasks];
    updatedSubtasks[index].title = title;
    appState.setNewSubtasks(updatedSubtasks);
  };

  const toggleNewSubtaskCompletion = (index: number) => {
    const updatedSubtasks = [...appState.newSubtasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;
    appState.setNewSubtasks(updatedSubtasks);
  };

  // Function to delete a task
  const deleteTask = () => {
    const { boardNumber, columnIndex, taskIndex } = appState;

    const currentColumn =
      appState.dataState.boards[boardNumber].columns[columnIndex].tasks;
    const removedTask = currentColumn.splice(appState.taskIndex, 1)[0];

    const updatedDataStateCopy = { ...appState.dataState };
    // Update dataState in the copy
    updatedDataStateCopy.boards[boardNumber].columns[columnIndex].tasks =
      currentColumn;

    // Update dataState in the context
    appState.setDataState(updatedDataStateCopy);
    props.onDeleteTask();
  };
  const deleteSubTask = (subtaskIndex: number) => {
    const updatedSubtasks = appState.subtasks.filter(
      (_, index) => index !== subtaskIndex
    );
    appState.setSubtasks(updatedSubtasks);
  };

  return (
    <div className={`${className || ""}`}>
      <div className="titleStyle-adjust">{panelTitle}</div>

      <div className="form-section">
        <div className="form-header-adjust">{appState.taskTitle}</div>
      </div>

      {/* Description */}
      <div className="form-section">
        <div className="form-header">Description</div>
        <textarea
          value={appState.taskDescription}
          onChange={(e) => appState.setTaskDescription(e.target.value)}
          className="description-box"
        />
      </div>

      {/* Subtasks */}
      <div className="form-section">
        <div className="form-header">Subtasks</div>
        {appState.subtasks.map((subtask, index) => (
          <div key={index} className="button-delete-subtask-container">
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              disabled // Disable the checkbox
            />
            <span>{subtask.title}</span> {/* Render the title as text */}
            <button
              onClick={() => deleteSubTask(index)}
              className="button-delete-subtask"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="form-section">
        {appState.newSubtasks.map((subtask, index) => (
          <div key={index}>
            <input
              type="text"
              value={subtask.title}
              onChange={(e) => updateNewSubtaskTitle(index, e.target.value)}
              className="subtask-box"
            />
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              onChange={() => toggleNewSubtaskCompletion(index)}
            />
          </div>
        ))}
        <button onClick={addNewSubtask}>Add New Subtask</button>
      </div>

      {/* Status */}
      <div className="form-section">
        <div className="form-header">Status</div>
        <span className="status-text">{appState.taskStatus}</span>
      </div>

      {/* Create Task Button */}
      <div className="form-section">
        <button onClick={updateTask}>Update Task</button>
      </div>
      <div className="form-section">
        <button onClick={deleteTask}>Delete Task</button>
      </div>
    </div>
  );
};

export default ViewAmendPanel;
