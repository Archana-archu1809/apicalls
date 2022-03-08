import * as type from "../types";

export function updateTodo(id, checked) {
  console.log(checked);
  return {
    type: type.UPDATE_TODO_REQUESTED,
    id,
    checked,
  };
}
