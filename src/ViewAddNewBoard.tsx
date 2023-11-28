import { AppStateContext, AppStateProvider } from "./AppStateContext";
import "./ViewAddNewBoard.css";
import { useContext, useEffect } from "react";
interface ViewAddNewBoardProps {
  panelTitle: string;
  description?: string;
  className?: string;
  // onCreateTask: () => void;
}

const ViewAddNewBoard = (props: ViewAddNewBoardProps) => {
  const { panelTitle, description, className } = props;

  const appState = useContext(AppStateContext);

  return (
    <div className={`${className || ""}`}>
      <div className="titleStyle-adjust">{panelTitle}</div>
    </div>
  );
};
export default ViewAddNewBoard;
