import { call, put, takeEvery } from "redux-saga/effects";
function editSaga({ id, checked }) {
  const apiUrl = `https://api-nodejs-todolist.herokuapp.com/task/${id}`;
  let data = { completed: checked };
  return fetch(apiUrl, {
    method: "PUT",
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
function* updateTodo(id, data) {
  try {
    const todo = yield call(editSaga, id, data);
    yield put({ type: "UPDATE_TODO_SUCCESS", todo: todo });
  } catch (e) {
    yield put({ type: "UPDATE_TODO_FAILURE", message: e.message });
  }
}
function* updateSaga() {
  yield takeEvery("UPDATE_TODO_REQUESTED", updateTodo);
}
export default updateSaga;
