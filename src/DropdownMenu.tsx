import "./DropdownMenu.css";

interface MenuPanelProps {
  options: Array<{
    label: string;
    onClick: () => void;
  }>;
  className?: string;
}
const MenuPanel = (props: MenuPanelProps) => {
  const { options, className } = props;

  return (
    <div className={className}>
      {options.map((option, index) => (
        <div key={index} className="dropdown-item" onClick={option.onClick}>
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default MenuPanel;
