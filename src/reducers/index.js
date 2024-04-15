import { combineReducers } from "redux";
import taskReducer from "./reducers";

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export default rootReducer;
