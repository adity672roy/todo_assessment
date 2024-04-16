// to add the task
export const addTask = (task) => {
  return {
    type: "ADD_TASK",
    payload: task,
  };
};

// to delete the task 
export const deleteTask = (taskId) => {
  return {
    type: "DELETE_TASK",
    payload: taskId,
  };
};

// to toggle the task as completed and incomplated
export const toggleTask = (taskId) => {
  return {
    type: "TOGGLE_TASK",
    payload: taskId,
  };
};

// to edit or modify the task
export const editTask = (taskId, newText) => {
  return {
    type: "EDIT_TASK",
    payload: { taskId, newText },
  };
};

// to filter the task as all, completed and incompleted
export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};
