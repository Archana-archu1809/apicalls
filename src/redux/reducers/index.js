import { combineReducers } from "redux";
import delTodo from "./delTodo";
import postTodo from "./postTodo";
import firstReducers from "./todo";
const rootReducers = combineReducers({
  todo: firstReducers,
  postTodo: postTodo,
  delTodo: delTodo,
});
export default rootReducers;
