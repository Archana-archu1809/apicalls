import * as type from "../types";
export function postTodo(data) {
  console.log(data);
  return {
    type: type.ADD_TODO_REQUESTED,
    data,
  };
}
