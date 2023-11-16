import "./TaskButton.css";

interface TaskButtonProps {
  label: string;
  subTask: string;
  onClick: () => void;
  className?: string;
}
const TaskButton = (props: TaskButtonProps) => {
  const { label, subTask, onClick, className } = props;
  return (
    <div className={`task-button ${className || ""}`} onClick={onClick}>
      <div>{label}</div>
      <div className="subtaskStyle">{subTask}</div>
    </div>
  );
};

export default TaskButton;
