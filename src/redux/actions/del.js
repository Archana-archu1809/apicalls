import * as type from "../types";
export function deleteTodo(id) {
  console.log(id);
  return {
    type: type.DEL_TODO_REQUESTED,
    id,
  };
}
