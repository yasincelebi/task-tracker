import React from 'react';

import './App.css';

import Header from "./components/Header/Header";
import AddTask from "./components/AddTask/AddTask";
import TaskList from "./components/TaskList/TaskList";
import TasksProvider from "./context/Tasks";

function App() {
    return (
        <TasksProvider>
            <div className="container-sm p-20">
                <Header/>
                <AddTask/>
                <TaskList/>
            </div>
        </TasksProvider>
    );
}

export default App;
