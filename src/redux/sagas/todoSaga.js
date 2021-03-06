import { call, put, takeEvery } from "redux-saga/effects";

const apiUrl = "https://api-nodejs-todolist.herokuapp.com/task";
function getApi() {
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("value")}`,
    },
  })
    .then((response) => response.json())

    .catch((error) => {
      throw error;
    });
}
function* fetchTodo(action) {
  try {
    const todo = yield call(getApi);

    yield put({ type: "GET_TODO_SUCCESS", todo: todo.data });
  } catch (e) {
    yield put({ type: "GET_TODO_FAILURE", message: e.message });
  }
}
function* todoSaga() {
  yield takeEvery("GET_TODO_REQUESTED", fetchTodo);
}
export default todoSaga;
