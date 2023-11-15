import "./LabelButton.css";

interface LabelButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}
const LabelButton = (props: LabelButtonProps) => {
  const { label, onClick, className } = props;
  return (
    <div className={`label-button ${className || ""}`} onClick={onClick}>
      {label}
    </div>
  );
};

export default LabelButton;
