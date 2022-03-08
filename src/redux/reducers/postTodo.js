import * as type from "../types";
const initialState = {
  todo: [],
  loading: false,
  error: null,
};
export default function postTodo(state = initialState, action) {
  switch (action.type) {
    case type.ADD_TODO_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todo: action.todo,
      };
    case type.ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.DEL_TODO_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.DEL_TODO_SUCCESS:
      const todo = state.todo;
      const newState = todo.filter((todo) => todo.id !== action.id);
      return {
        loading: false,
        newState,
      };
    case type.DEL_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.UPDATE_TODO_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todo: action.todo,
      };
    case type.UPDATE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
