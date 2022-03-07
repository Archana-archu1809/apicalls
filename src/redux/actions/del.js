import * as type from "../types";
export function deleteTodo(_id) {
  console.log(_id);
  return {
    type: type.DEL_TODO_REQUESTED,
    _id,
  };
}
