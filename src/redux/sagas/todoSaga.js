import { call, put, takeEvery } from "redux-saga/effects";
import * as type from "../types";
const apiurl = "https://api-nodejs-todolist.herokuapp.com/task";
function getApi() {
  return fetch(apiurl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("value")}`,
    },
  })
    .then((res) => res.json())
    .then((error) => {
      throw error;
    });
}
function* fetchTodo(action) {
  try {
    const todo = yield call(getApi);
    yield put({ type: "GET_TODO_SUCCESS", todo: todo });
  } catch (e) {
    yield put({ type: "GET_TODO_FAILURE", message: e.message });
  }
}
function* todoSaga() {
  yield takeEvery("GET_TODO_REQUESTED", fetchTodo);
}
export default todoSaga;
