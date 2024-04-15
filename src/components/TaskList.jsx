import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  setFilter,
  toggleTask,
  editTask,
} from "../actions/actions";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [active, setActive] = useState("all");

  const filteredTasks = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleTask = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  const handleEditTask = (taskId, text) => {
    setEditTaskId(taskId);
    setEditText(text);
  };

  const handleSaveEdit = (taskId) => {
    dispatch(editTask(taskId, editText));
    setEditTaskId(null);
    setEditText("");
  };

  return (
    <div className="tasks_list_container">
      <div className="task_filter_btns">
        <button
          className={`filter_btn ${active === "all" ? "active_btn" : ""}`}
          onClick={() => {
            dispatch(setFilter("all"));
            setActive("all");
          }}
        >
          All
        </button>
        <button
          className={`filter_btn ${active === "completed" ? "active_btn" : ""}`}
          onClick={() => {
            dispatch(setFilter("completed"));
            setActive("completed");
          }}
        >
          Completed
        </button>
        <button
          className={`filter_btn ${
            active === "incomplete" ? "active_btn" : ""
          }`}
          onClick={() => {
            dispatch(setFilter("incomplete"));
            setActive("incomplete");
          }}
        >
          Incomplete
        </button>
      </div>
      <ul className="tasks">
        {filteredTasks().map((task) => (
          <li key={task.id} className="task_list">
            {editTaskId === task.id ? (
              <div className="edit_task">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="input"
                />
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className="btn "
                >
                  +
                </button>
              </div>
            ) : (
              <div>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                  className="task"
                >
                  {task.text}
                </span>
                <div className="options">
                  <button
                    className="btn edit"
                    onClick={() => handleEditTask(task.id, task.text)}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="btn"
                  >
                    {task.completed ? "✖️" : "✔️"}
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
