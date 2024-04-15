export const addTask = (task) => {
  return {
    type: "ADD_TASK",
    payload: task,
  };
};

export const deleteTask = (taskId) => {
  return {
    type: "DELETE_TASK",
    payload: taskId,
  };
};

export const toggleTask = (taskId) => {
  return {
    type: "TOGGLE_TASK",
    payload: taskId,
  };
};

export const editTask = (taskId, newText) => {
  return {
    type: "EDIT_TASK",
    payload: { taskId, newText },
  };
};

export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};
