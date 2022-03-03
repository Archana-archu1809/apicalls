import * as type from "../types";
const initialState = {
  todo: [],
  loading: false,
  error: null,
};
export default function todo(state = initialState, action) {
  switch (action.type) {
    case type.GET_TODO_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todo: action.todo,
      };
    case type.GET_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
