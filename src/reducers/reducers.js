const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  filter: "all",
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const newTasksAdd = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: newTasksAdd,
      };
    case "DELETE_TASK":
      const newTasksDelete = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: newTasksDelete,
      };
    case "TOGGLE_TASK":
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return {
        ...state,
        tasks: updatedTasks,
      };
    case "EDIT_TASK":
      const editTasks = state.tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          return { ...task, text: action.payload.newText };
        }
        return task;
      });
      return {
        ...state,
        tasks: editTasks,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
