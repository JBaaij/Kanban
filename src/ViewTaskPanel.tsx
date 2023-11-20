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
  useEffect(() => {
    appState.setDataState((prevDataState: any) => {
      const updatedDataState = { ...prevDataState };
      const { boardNumber, columnIndex, taskIndex, subtaskIndex } = appState;

      console.log(appState.isCompleted);
      console.log(appState.taskStatus);
      // Toggle the isCompleted property of the specific subtask
      updatedDataState.boards[boardNumber].columns[columnIndex].tasks[
        taskIndex
      ].subtasks[subtaskIndex].isCompleted =
        !prevDataState.boards[boardNumber].columns[columnIndex].tasks[taskIndex]
          .subtasks[subtaskIndex].isCompleted;

      return updatedDataState;
    });
    console.log(appState.dataState);
  }, [appState.isCompleted, appState.subtaskIndex]);
  /*
  useEffect(() => {
    appState.setDataState((prevDataState: any) => {
      const updatedDataState = { ...prevDataState };
      const { boardNumber, columnIndex, taskIndex } = appState;

      console.log(appState.taskStatus);
      // Find the current column of the task
      const currentColumn =
        updatedDataState.boards[boardNumber].columns[columnIndex];
      console.log(currentColumn);
      // Remove the task from the current column
      const removedTask = currentColumn.tasks.splice(taskIndex, 1)[0];

      // Add the task to the target column
      const targetColumnData =
        updatedDataState.boards[boardNumber].columns[appState.newColumnIndex];
      if (targetColumnData) {
        targetColumnData.tasks.push(removedTask);
      }

      return updatedDataState;
    });
  }, [appState.newColumnIndex]);
*/
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
                    if (allCompleted && appState.taskStatus !== "Done") {
                      appState.setTaskStatus("Done");
                      appState.setNewColumnIndex(2);
                    } else if (
                      noneCompleted &&
                      appState.taskStatus !== "Todo"
                    ) {
                      appState.setTaskStatus("Todo");
                      appState.setNewColumnIndex(0);
                    } else if (appState.taskStatus !== "Doing") {
                      appState.setTaskStatus("Doing");
                      appState.setNewColumnIndex(1);
                    }
                    appState.setIsCompleted(subtask.isCompleted);
                    appState.setSubtaskIndex(index);
                    //const updatedSubtasks = [...appState.subtasks];
                    //console.log(index);
                    //console.log(subtask.isCompleted);
                    //console.log(subtask);
                    const subtaskIndex = index; // Add this line to get the correct index
                    //console.log(appState.taskStatus);
                    //console.log(appState.isCompleted);
                    /*
                    console.log(
                      appState.dataState.boards[appState.boardNumber].name
                    );
                    console.log(subtask.isCompleted);
                  changeDataSet(subtask.isCompleted);
                  */
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
