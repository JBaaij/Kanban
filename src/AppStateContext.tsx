import { createContext, FC, ReactNode, useState } from "react";
import jsonData from "../src/data.json";
interface AppStateContext {
  boardName: string;
  setBoardName: (name: string) => void;
  boardNumber: number;
  setBoardNumber: (number: number) => void;
  columnIndex: number;
  setColumnIndex: (number: number) => void;
  newColumnIndex: number;
  setNewColumnIndex: (number: number) => void;
  boardLength: number;
  setBoardLength: (number: number) => void;
  taskTitle: string;
  setTaskTitle: (title: string) => void;
  countSubTask: string;
  setCountSubTask: (title: string) => void;
  taskIndex: number;
  setTaskIndex: (number: number) => void;
  subtaskIndex: number;
  setSubtaskIndex: (number: number) => void;
  taskDescription: string;
  setTaskDescription: (description: string) => void;
  subtasks: { title: string; isCompleted: boolean }[];
  setSubtasks: (subtasks: { title: string; isCompleted: boolean }[]) => void;
  taskStatus: string;
  setTaskStatus: (status: string) => void;
  dataState: any;
  setDataState: (data: any) => void;
  isCompleted: boolean;
  setIsCompleted: (value: boolean) => void;
}

const AppStateContext = createContext<AppStateContext>({
  boardName: "Platform Launch",
  setBoardName: () => {},
  boardNumber: 0,
  setBoardNumber: () => {},
  columnIndex: 0,
  setColumnIndex: () => {},
  newColumnIndex: 0,
  setNewColumnIndex: () => {},
  boardLength: 0,
  setBoardLength: () => {},
  taskTitle: "",
  setTaskTitle: () => {},
  countSubTask: "",
  setCountSubTask: () => {},
  taskIndex: 0,
  setTaskIndex: () => {},
  subtaskIndex: 0,
  setSubtaskIndex: () => {},
  taskDescription: "",
  setTaskDescription: () => {},
  subtasks: [],
  setSubtasks: () => {},
  taskStatus: "",
  setTaskStatus: () => {},
  dataState: null,
  setDataState: () => {},
  isCompleted: false,
  setIsCompleted: () => {},
});

const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [boardName, setBoardName] = useState("Platform Launch");
  const [boardNumber, setBoardNumber] = useState(0);
  const [columnIndex, setColumnIndex] = useState(5);
  const [newColumnIndex, setNewColumnIndex] = useState(5);
  const [boardLength, setBoardLength] = useState(3);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskIndex, setTaskIndex] = useState(0);
  const [subtaskIndex, setSubtaskIndex] = useState(0);
  const [taskDescription, setTaskDescription] = useState("");
  const [subtasks, setSubtasks] = useState<
    { title: string; isCompleted: boolean }[]
  >([]);
  const [taskStatus, setTaskStatus] = useState("");
  const [dataState, setDataState] = useState(jsonData);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [countSubTask, setCountSubTask] = useState("");
  return (
    <AppStateContext.Provider
      value={{
        boardName,
        setBoardName,
        boardNumber,
        setBoardNumber,
        columnIndex,
        setColumnIndex,
        newColumnIndex,
        setNewColumnIndex,
        boardLength,
        setBoardLength,
        taskTitle,
        setTaskTitle,
        taskIndex,
        setTaskIndex,
        subtaskIndex,
        setSubtaskIndex,
        taskDescription,
        setTaskDescription,
        subtasks,
        setSubtasks,
        taskStatus,
        setTaskStatus,
        dataState,
        setDataState,
        isCompleted,
        setIsCompleted,
        countSubTask,
        setCountSubTask,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
