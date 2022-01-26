import React, {
    createContext,
    ReactNode, useEffect,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export const TasksContext = createContext({
    items: [],
    setItems: (a: any) => {},
    localTasks: [],
});
export interface ITask {
    id: number;
    name: string;
    priority: any
}

export enum TaskPriority {
    Trivial = "Trivial",
    Regular = "Regular",
    Urgent = "Urgent",
}
const tasks: ITask[] =[
    {
        id: 1,
        name: "Task 1",
        priority: TaskPriority.Regular,
    },
    {
        id: 2,
        name: "Task 2",
        priority: TaskPriority.Urgent,
    },
    {
        id: 3,
        name: "Task 3",
        priority: TaskPriority.Trivial,
    },
]
const TasksProvider = ({ children }: { children?: ReactNode }) => {
    const [items, setItems] = React.useState<ITask[]>([]);
    const [localTasks,setLocalTasks] = useLocalStorage<ITask[]>("tasks",[]);

    // set initial value
    useEffect((): void => {
        setItems(localTasks || tasks);
    }, [tasks]);

    // set value to local storage on every change
    useEffect(() => {
        setLocalTasks(items);

    }, [items])



    return (
        // @ts-ignore
        <TasksContext.Provider value={{ items, setItems, localTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;

