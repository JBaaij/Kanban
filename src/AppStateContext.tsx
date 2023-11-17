import { createContext, FC, ReactNode, useState } from "react";
import jsonData from "../src/data.json";
interface AppStateContext {
  boardName: string;
  setBoardName: (name: string) => void;
  boardNumber: number;
  setBoardNumber: (number: number) => void;
  boardLength: number;
  setBoardLength: (number: number) => void;
  taskTitle: string;
  setTaskTitle: (title: string) => void;
  taskDescription: string;
  setTaskDescription: (description: string) => void;
  subtasks: { title: string; isCompleted: boolean }[];
  setSubtasks: (subtasks: { title: string; isCompleted: boolean }[]) => void;
  taskStatus: string;
  setTaskStatus: (status: string) => void;
  dataState: any;
  setDataState: (data: any) => void;
}

const AppStateContext = createContext<AppStateContext>({
  boardName: "Platform Launch",
  setBoardName: () => {},
  boardNumber: 0,
  setBoardNumber: () => {},
  boardLength: 0,
  setBoardLength: () => {},
  taskTitle: "",
  setTaskTitle: () => {},
  taskDescription: "",
  setTaskDescription: () => {},
  subtasks: [],
  setSubtasks: () => {},
  taskStatus: "",
  setTaskStatus: () => {},
  dataState: null,
  setDataState: () => {},
});

const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [boardName, setBoardName] = useState("Platform Launch");
  const [boardNumber, setBoardNumber] = useState(0);
  const [boardLength, setBoardLength] = useState(3);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subtasks, setSubtasks] = useState<
    { title: string; isCompleted: boolean }[]
  >([]);
  const [taskStatus, setTaskStatus] = useState("");
  const [dataState, setDataState] = useState(jsonData);

  return (
    <AppStateContext.Provider
      value={{
        boardName,
        setBoardName,
        boardNumber,
        setBoardNumber,
        boardLength,
        setBoardLength,
        taskTitle,
        setTaskTitle,
        taskDescription,
        setTaskDescription,
        subtasks,
        setSubtasks,
        taskStatus,
        setTaskStatus,
        dataState,
        setDataState,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
