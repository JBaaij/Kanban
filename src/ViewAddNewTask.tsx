import { AppStateContext, AppStateProvider } from "./AppStateContext";
import "./ViewAddNewTask.css";
import { useContext, useEffect } from "react";
interface ViewAddNewTaskProps {
  panelTitle: string;
  description?: string;
  className?: string;
  onCreateTask: () => void;
  subtasks?: { title: string; isCompleted: boolean }[];
  onSubtaskToggle?: (index: number) => void;
}

const ViewAddNewTask = (props: ViewAddNewTaskProps) => {
  const { panelTitle, description, className, subtasks, onSubtaskToggle } =
    props;

  const appState = useContext(AppStateContext);

  const addNewSubtask = () => {
    const updatedSubtasks = [
      ...appState.newSubtasks,
      { title: "", isCompleted: false },
    ];
    appState.setNewSubtasks(updatedSubtasks);
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

  const createNewTask = () => {
    // Create a new task object using the form data
    if (appState.newTaskTitle.length >= 3) {
      const newTask = {
        title: appState.newTaskTitle,
        description: appState.newTaskDescription,
        status: appState.newTaskStatus,
        subtasks: appState.newSubtasks,
      };

      // Map the newTaskStatus to the columnIndex based on status values
      let columnIndex;

      switch (appState.newTaskStatus) {
        case "Todo":
          columnIndex = 0;
          break;
        case "Doing":
          columnIndex = 1;
          break;
        case "Done":
          columnIndex = 2;
          break;
        default:
          console.error(`Invalid task status: ${appState.newTaskStatus}`);
          // Set the default value to "Todo" if the status is invalid
          appState.setNewTaskStatus("Todo");
          columnIndex = 0;
          break;
      }

      console.log(`new taskstatus ${appState.newTaskStatus}`);
      console.log(`columnIndex ${columnIndex}`);

      const board = appState.dataState.boards[appState.boardNumber];
      console.log(`check 1 ${appState.boardNumber}`);

      appState.dataState.boards[appState.boardNumber].columns[
        columnIndex
      ].tasks.unshift(newTask);

      console.log(appState.dataState);

      appState.setNewTaskTitle("");
      appState.setNewTaskDescription("");
      appState.setNewTaskStatus("Todo");
      appState.setNewSubtasks([]);
      props.onCreateTask();
    }
  };
  return (
    <div className={`${className || ""}`}>
      <div className="titleStyle">{panelTitle}</div>

      <div className="form-section">
        <div className="form-header">Title</div>
        <input
          type="text"
          value={appState.newTaskTitle}
          onChange={(e) => appState.setNewTaskTitle(e.target.value)}
          className="input-box"
        />
      </div>
      {/* Description */}
      <div className="form-section">
        <div className="form-header">Description</div>
        <textarea
          value={appState.newTaskDescription}
          onChange={(e) => appState.setNewTaskDescription(e.target.value)}
          className="description-box"
        />
      </div>
      {/* Subtasks */}
      <div className="form-section">
        <div className="form-header">Subtasks</div>
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
        <button onClick={addNewSubtask} id="button-add-new-subtask">
          +Add New Subtask
        </button>
      </div>

      {/* Status */}
      <div className="form-section">
        <div className="form-header">Status</div>
        <select
          value={appState.newTaskStatus}
          onChange={(e) => appState.setNewTaskStatus(e.target.value)}
          className="status-box"
        >
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Create Task Button */}
      <div className="form-section">
        <button onClick={createNewTask} id="button-create-task">
          Create Task
        </button>
      </div>
    </div>
  );
};

export default ViewAddNewTask;
