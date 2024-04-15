import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions/actions";

const TaskInput = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      dispatch(addTask({ id: Date.now(), text: taskText }));
      setTaskText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="task_input">
      <input
        type="text"
        placeholder="enter task"
        value={taskText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="input"
      />
      <button onClick={handleAddTask} className="btn"> ➕ </button>
    </div>
  );
};

export default TaskInput;
