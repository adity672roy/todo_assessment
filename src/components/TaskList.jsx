import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // add the tasks to the localstorage so that tasks are not lost on page reload.
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = () => {
    // this function will filter the tasks as complete and incompleted
    switch (filter) {
      case "completed":
        // if the task is complete it will mark as completed
        return tasks.filter((task) => task.completed);
      case "incomplete":
        // if the task is not complete it will mark as incompleted, there will be line trough the task
        return tasks.filter((task) => !task.completed);
      default:
        // this will show all the completed and incompleted taska
        return tasks;
    }
  };

  const handleDeleteTask = (taskId) => {
    // this function will dispatch the delete function with the id of the task and then it will go to actions check what function needs to be done then find the reducers and apply the relevent functions and then update the state
    dispatch(deleteTask(taskId));
  };

  const handleToggleTask = (taskId) => {
    // this function will dispatch the toggle function with the id of the task and then it will go to actions check what function needs to be done then find the reducers and apply the relevent functions and then update the state .
    //  this will update the task as completed and incompleted
    dispatch(toggleTask(taskId));
  };

  const handleEditTask = (taskId, text) => {
    // this function used to modify the task it will take that task id and edit the task
    setEditTaskId(taskId);
    // this set the text as the updated task
    setEditText(text);
  };

  const handleSaveEdit = (taskId) => {
    // this function will dispatch the edit or modify function with the id of the task and then it will go to actions check what function needs to be done then find the reducers and apply the relevent functions and then update the state .
    //  this will modify the tasks and set the task as the edit task
    dispatch(editTask(taskId, editText));
    setEditTaskId(null);
    // this will set the edit text as the blank string. this will remove all the text from the input field
    setEditText("");
  };

  return (
    <div className="tasks_list_container">
      <div className="task_filter_btns">
        {/* this button shows all the tasks (completed or incompleted) */}
        <button
          className={`filter_btn ${active === "all" ? "active_btn" : ""}`}
          onClick={() => {
            dispatch(setFilter("all"));
            setActive("all");
          }}
        >
          All
        </button>
        {/* this button shows completed tasks */}
        <button
          className={`filter_btn ${active === "completed" ? "active_btn" : ""}`}
          onClick={() => {
            dispatch(setFilter("completed"));
            setActive("completed");
          }}
        >
          Completed
        </button>
        {/* this button shows incompleted tasks */}
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
            {/* on click of ✏️ an input field and a add button will show up, where we can edit the tasks using the task id else the list will show */}
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
                  ➕
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
                  {/* this button will modify the task */}
                  <button
                    className="btn edit"
                    onClick={() => handleEditTask(task.id, task.text)}
                  >
                    ✏️
                  </button>
                  {/* this button will mark the task as completed and incompletd */}
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="btn"
                  >
                    {task.completed ? "✖️" : "✔️"}
                  </button>
                  {/* this button will delete the task */}
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
