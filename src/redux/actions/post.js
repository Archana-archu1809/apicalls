import * as type from "../types";
export  function posttodo(data) {
  return {
    type: type.ADD_TODO_REQUESTED,
    payload: data,
  };
}
