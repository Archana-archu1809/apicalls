import { combineReducers } from "redux";
import postTodo from "./postTodo";
import firstReducers from "./todo";
const rootReducers = combineReducers({
  todo: firstReducers,
  postTodo: postTodo,
});
export default rootReducers;
