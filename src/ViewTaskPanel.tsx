import { AppStateContext, AppStateProvider } from "./AppStateContext";
import "./ViewTaskPanel.css";
import { useContext, useEffect } from "react";

interface ViewTaskPanelProps {
  title: string;
  description?: string;
  className?: string;
  count?: string;
  subtasks?: { title: string; isCompleted: boolean }[];
  onSubtaskToggle?: (index: number) => void;
  goBackToggle: () => void;
}

const ViewTaskPanel = (props: ViewTaskPanelProps) => {
  const {
    title,
    description,
    className,
    count,
    subtasks,
    onSubtaskToggle,
    goBackToggle,
  } = props;

  const appState = useContext(AppStateContext);

  useEffect(() => {
    const { boardNumber, columnIndex, taskIndex } = appState;

    if (appState.columnIndex !== appState.newColumnIndex) {
      const currentColumn =
        appState.dataState.boards[boardNumber].columns[columnIndex].tasks;

      // To remove the task from the current column, you can use the splice method

      const removedTask = currentColumn.splice(appState.taskIndex, 1)[0];

      // Add the task to the target column at the beginning
      const targetColumnData =
        appState.dataState.boards[boardNumber].columns[appState.newColumnIndex];
      if (targetColumnData) {
        targetColumnData.tasks.unshift(removedTask); // Use unshift() to add at the beginning
        appState.setColumnIndex(appState.newColumnIndex);
        appState.setTaskIndex(0);

        const updatedDataStateCopy = { ...appState.dataState };

        updatedDataStateCopy.boards[boardNumber].columns[columnIndex].tasks =
          currentColumn;
        updatedDataStateCopy.boards[boardNumber].columns[
          appState.newColumnIndex
        ].tasks = targetColumnData.tasks;

        appState.setDataState(updatedDataStateCopy);
      }
    }
  }, [appState.newColumnIndex]);

  return (
    <div className={`${className || ""}`}>
      <div className="titleStyle">{title}</div>
      <div className="descriptionStyle" style={{ color: "white" }}>
        {description}
      </div>

      <div className="countStyle">{count}</div>

      <ul
        className="checkboxStyle"
        id={appState.toggleDarkmode ? "darkbackground" : "lightbackground"}
      >
        {subtasks &&
          subtasks.map((subtask, index) => (
            <li
              key={index}
              className={subtask.isCompleted ? "completed-subtask" : ""}
            >
              <label>
                <input
                  type="checkbox"
                  checked={subtask.isCompleted}
                  onChange={() => {
                    onSubtaskToggle && onSubtaskToggle(index);
                    // Update taskStatus and data state when a subtask is toggled

                    const allCompleted = subtasks.every(
                      (subtask) => subtask.isCompleted
                    );
                    const noneCompleted = subtasks.every(
                      (subtask) => !subtask.isCompleted
                    );
                    if (allCompleted) {
                      appState.setTaskStatus("Done");
                      appState.setNewColumnIndex(2);
                    } else if (noneCompleted) {
                      appState.setTaskStatus("Todo");
                      appState.setNewColumnIndex(0);
                    } else {
                      appState.setTaskStatus("Doing");
                      appState.setNewColumnIndex(1);
                    }
                    //appState.setIsCompleted(subtask.isCompleted);

                    appState.setSubtaskIndex(index);
                  }}
                />
                {subtask.title}
              </label>
            </li>
          ))}
      </ul>
      <div style={{ fontWeight: "bold" }}>Status</div>
      <div>{appState.taskStatus}</div>
      <span>
        <button onClick={goBackToggle} id="goback-button">
          Return
        </button>
      </span>
    </div>
  );
};

export default ViewTaskPanel;
