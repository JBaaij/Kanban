import "./TaskButton.css";

interface TaskButtonProps {
  label: string;
  subTaskCount: string;
  onClick: () => void;
  className?: string;
}
const TaskButton = (props: TaskButtonProps) => {
  const { label, subTaskCount, onClick, className } = props;
  return (
    <div className={`task-button ${className || ""}`} onClick={onClick}>
      <div>{label}</div>
      <div className="subtaskStyle">{subTaskCount}</div>
    </div>
  );
};

export default TaskButton;
