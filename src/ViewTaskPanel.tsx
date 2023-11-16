import "./ViewTaskPanel.css";

interface ViewTaskPanelProps {
  title: string;
  description?: string;
  className?: string;
  count?: string;
  column?: string;
  subtasks?: { title: string; isCompleted: boolean }[]; // Define the subtasks prop
  onSubtaskToggle?: (index: number) => void; // Corrected prop name
}

const ViewTaskPanel = (props: ViewTaskPanelProps) => {
  const {
    title,
    description,
    className,
    count,
    column,
    subtasks,
    onSubtaskToggle,
  } = props;

  return (
    <div className={`${className || ""}`}>
      <div className="titleStyle">{title}</div>
      <div className="descriptionStyle">{description}</div>
      <div className="countStyle">{count}</div>

      <ul className="checkboxStyle">
        {/* Map over subtasks and render each subtask as a checkbox */}
        {subtasks &&
          subtasks.map((subtask, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={subtask.isCompleted}
                  onChange={() => onSubtaskToggle && onSubtaskToggle(index)}
                />
                {subtask.title}
              </label>
            </li>
          ))}
      </ul>
      <div style={{ fontWeight: "bold" }}>Status</div>

      <div>{column}</div>
    </div>
  );
};

export default ViewTaskPanel;
