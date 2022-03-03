import { combineReducers } from "redux";
import firstReducers from "./todo";
const rootReducers = combineReducers({
  todo: firstReducers,
});
export default rootReducers;
