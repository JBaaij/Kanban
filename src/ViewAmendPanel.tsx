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
  onDeleteBoard: () => void;
}

const ViewAmendPanel: React.FC<ViewAmendPanelProps> = (props) => {
  const {
    panelTitle,
    description,
    className,
    subtasks,
    onSubtaskToggle,
    onDeleteBoard,
  } = props;
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

  const deleteTask = () => {
    const { boardNumber, columnIndex, taskIndex } = appState;

    const currentColumn =
      appState.dataState.boards[boardNumber].columns[columnIndex].tasks;
    const removedTask = currentColumn.splice(appState.taskIndex, 1)[0];

    const updatedDataStateCopy = { ...appState.dataState };
    updatedDataStateCopy.boards[boardNumber].columns[columnIndex].tasks =
      currentColumn;

    appState.setDataState(updatedDataStateCopy);
    props.onDeleteTask();
  };
  const deleteSubTask = (subtaskIndex: number) => {
    const updatedSubtasks = appState.subtasks.filter(
      (_, index) => index !== subtaskIndex
    );
    appState.setSubtasks(updatedSubtasks);
  };
  const deleteBoard = () => {
    const currentBoardIndex = appState.boardNumber;
    const updatedBoards = appState.dataState.boards.filter(
      (_board: [], index: number) => index !== currentBoardIndex
    );
    appState.setDataState({ ...appState.dataState, boards: updatedBoards });

    if (updatedBoards.length > 0) {
      appState.setBoardName(updatedBoards[0].name);
    } else {
      appState.setBoardName("");
      appState.setBoardNumber(-1);
    }

    appState.setTaskTitle("");
    props.onDeleteBoard();
  };

  useEffect(() => {}, [appState.subtasks, appState.boardLength]);
  const updateTask = () => {
    const updatedTask = {
      description: appState.newTaskDescription,
      subtasks: [...appState.subtasks, ...appState.newSubtasks],
    };

    const taskToUpdate =
      appState.dataState.boards[appState.boardNumber].columns[
        appState.columnIndex
      ].tasks[appState.taskIndex];

    if (taskToUpdate) {
      taskToUpdate.description = description;

      taskToUpdate.subtasks = updatedTask.subtasks;

      const updatedDataStateCopy = { ...appState.dataState };
      updatedDataStateCopy.boards[appState.boardNumber].columns[
        appState.columnIndex
      ].tasks[appState.taskIndex] = taskToUpdate;

      appState.setDataState(updatedDataStateCopy);

      props.onDeleteTask();
    }
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
            <span>{subtask.title}</span>
            <button
              onClick={() => deleteSubTask(index)}
              id="button-delete-subtask"
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
        <button onClick={addNewSubtask} id="button-add-subtask">
          Add New Subtask
        </button>
      </div>
      <div className="form-section">
        <div className="form-header">Status</div>
        <span className="status-text">{appState.taskStatus}</span>
      </div>
      <div className="form-section">
        <button onClick={updateTask} id="button-update-task">
          Update Task
        </button>
      </div>
      <div className="form-section">
        <button onClick={deleteTask} id="button-delete-task">
          Delete Task
        </button>
      </div>
      <div className="form-section">
        <button onClick={deleteBoard} id="button-update-task">
          Delete Board
        </button>
      </div>
    </div>
  );
};

export default ViewAmendPanel;
