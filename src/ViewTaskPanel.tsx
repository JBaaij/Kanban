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
}

const ViewTaskPanel = (props: ViewTaskPanelProps) => {
  const { title, description, className, count, subtasks, onSubtaskToggle } =
    props;

  const appState = useContext(AppStateContext);
  //

  useEffect(() => {
    console.log("check 1");
    appState.setDataState((prevDataState: any) => {
      const updatedDataState = { ...prevDataState };
      const { boardNumber, columnIndex, taskIndex, subtaskIndex } = appState;
      // Toggle the isCompleted property of the specific subtask
      updatedDataState.boards[boardNumber].columns[columnIndex].tasks[
        taskIndex
      ].subtasks[subtaskIndex].isCompleted =
        !prevDataState.boards[boardNumber].columns[columnIndex].tasks[taskIndex]
          .subtasks[subtaskIndex].isCompleted;
      return updatedDataState;
    });
  }, [appState.isCompleted, appState.subtaskIndex]);

  useEffect(() => {
    console.log("check 2");

    const { boardNumber, columnIndex, taskIndex } = appState;

    if (appState.columnIndex !== appState.newColumnIndex) {
      const currentColumn =
        appState.dataState.boards[boardNumber].columns[columnIndex].tasks;
      console.log(
        appState.dataState.boards[boardNumber].columns[columnIndex].tasks[
          taskIndex
        ].title
      );
      console.log(taskIndex);

      // To remove the task from the current column, you can use the splice method
      const removedTask = currentColumn.splice(taskIndex, 1)[0];
      console.log(removedTask);

      // Add the task to the target column at the beginning
      const targetColumnData =
        appState.dataState.boards[boardNumber].columns[appState.newColumnIndex];
      if (targetColumnData) {
        targetColumnData.tasks.unshift(removedTask); // Use unshift() to add at the beginning
        appState.setColumnIndex(appState.newColumnIndex);
      }
    }
  }, [appState.newColumnIndex, appState.taskIndex]);

  return (
    <div className={`${className || ""}`}>
      <div className="titleStyle">{title}</div>
      <div className="descriptionStyle">{description}</div>
      <div className="countStyle">{count}</div>

      <ul className="checkboxStyle">
        {subtasks &&
          subtasks.map((subtask, index) => (
            <li key={index}>
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
                    appState.setIsCompleted(subtask.isCompleted);
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
    </div>
  );
};

export default ViewTaskPanel;
