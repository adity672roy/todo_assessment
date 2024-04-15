import React from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import './App.css'

const App = () => {
  return (
    <div className="App">
      <h1 className="navbar">Todo App</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default App;
