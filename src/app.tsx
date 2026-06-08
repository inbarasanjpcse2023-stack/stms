import { Toaster } from "react-hot-toast";
import { useMemo, useState } from "react";
import { ITaskHomeProps } from "./views/TaskHome/ITaskHomeProps";
import { COMMON_TEXT } from "./helper/constants";
import TaskHome from "./views/TaskHome/TaskHome";
import "./index.css";

const getStoredTasks = (): ITaskHomeProps[] => {
  const stored = localStorage.getItem(COMMON_TEXT.STORAGE_TASK);
  if (stored) return JSON.parse(stored);
  return [
    { id: "1", status: "ADDED", items: [{ id: "t1", name: "Design system audit", priority: "high", dueDate: "2026-06-20" }, { id: "t2", name: "Write release notes", priority: "low", dueDate: "2026-06-28" }] },
    { id: "2", status: "STARTED", items: [{ id: "t3", name: "API integration", priority: "high", dueDate: "2026-06-08" }, { id: "t4", name: "Unit test coverage", priority: "medium", dueDate: "2026-06-18" }] },
    { id: "3", status: "COMPLETED", items: [{ id: "t5", name: "Onboarding docs", priority: "low", dueDate: "2026-05-30" }] },
  ];
};

function App() {
  const [tasks, setTasks] = useState<ITaskHomeProps[]>(useMemo(getStoredTasks, []));
  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ style: { fontFamily: 'var(--font-mono)', fontSize: 13 } }} />
      <TaskHome tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
