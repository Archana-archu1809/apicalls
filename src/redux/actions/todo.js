import * as type from "../types";
export function getTodo(todo) {
  return {
    type: type.GET_TODO_REQUESTED,
    payload: todo,
  };
}
