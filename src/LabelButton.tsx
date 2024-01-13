import "./LabelButton.css";
import IconBoard from "./assets/icon-board";
import IconCircle from "./assets/circle";

interface LabelButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  isSelected?: boolean;
  index?: number;
}
const LabelButton = (props: LabelButtonProps) => {
  const { label, onClick, className, isSelected, index } = props;
  return (
    <div
      className={`label-button ${className || ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={() => onClick()} // Pass the index as an argument
    >
      <IconBoard fill="grey" />
      &nbsp;&nbsp;&nbsp;&nbsp;
      {label}
    </div>
  );
};

export default LabelButton;
