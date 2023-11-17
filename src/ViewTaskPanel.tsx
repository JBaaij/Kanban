import { AppStateContext } from "./AppStateContext";
import "./ViewTaskPanel.css";
import { useContext } from "react";

interface ViewTaskPanelProps {
  title: string;
  description?: string;
  className?: string;
  count?: string;
  column?: string;
  subtasks?: { title: string; isCompleted: boolean }[];
  onSubtaskToggle?: (index: number) => void;
}

const ViewTaskPanel = (props: ViewTaskPanelProps) => {
  const { title, description, className, count, subtasks, onSubtaskToggle } =
    props;

  const appState = useContext(AppStateContext);

  // Function to update appState.taskStatus based on subtasks' completion status
  const updateTaskStatus = () => {
    const allCompleted = subtasks?.every((subtask) => subtask.isCompleted);
    const noneCompleted = subtasks?.every((subtask) => !subtask.isCompleted);
    if (allCompleted && appState.taskStatus !== "Done") {
      appState.setTaskStatus("Done");
      return;
    }
    if (noneCompleted && appState.taskStatus !== "Todo") {
      appState.setTaskStatus("Todo");
      return;
    }
    if (appState.taskStatus !== "Doing") {
      appState.setTaskStatus("Doing");
      return;
    }
  };
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
                    updateTaskStatus(); // Call the function when a subtask is toggled
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
