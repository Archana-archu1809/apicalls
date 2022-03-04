import { call, put, takeEvery } from "redux-saga/effects";
const apiUrl = "https://api-nodejs-todolist.herokuapp.com/task";
function postApi(data) {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("value")}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())

    .catch((error) => {
      throw error;
    });
}
function* fetchTodo(data) {
  try {
    const todo = yield call(postApi, data);
    console.log(todo);
    yield put({ type: "ADD_TODO_SUCCESS", todo: todo });
  } catch (e) {
    yield put({ type: "ADD_TODO_FAILURE", message: e.message });
  }
}
function* postSaga() {
  yield takeEvery("ADD_TODO_REQUESTED", fetchTodo);
}
export default postSaga;
