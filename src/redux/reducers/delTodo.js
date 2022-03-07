import * as type from "../types";
const initialState = {
  todo: [],
  loading: false,
  error: null,
};
export default function delTodo(state = initialState, action) {
  switch (action.type) {
    case type.DEL_TODO_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.DEL_TODO_SUCCESS:
      const todo1 = todo.filter((todo) => todo._id !== _id);
      return {
        ...state,
        loading: false,
        todo: todo1,
      };
    case type.DEL_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      };

    default:
      return state;
  }
}