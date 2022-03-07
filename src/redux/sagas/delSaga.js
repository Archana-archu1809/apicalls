import { call, put, takeEvery } from "redux-saga/effects";

function delSaga(_id) {
  const apiUrl = `https://api-nodejs-todolist.herokuapp.com/task${_id}`;
  return fetch(apiUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("value")}`,
    },
  })
    .then((response) => response.json())

    .catch((error) => {
      throw error;
    });
}
function* delTodo(_id) {
  console.log(_id);
  try {
    const todo = yield call(delSaga, _id);
    console.log(todo);
    yield put({ type: "DEL_TODO_SUCCESS", todo: todo });
  } catch (e) {
    yield put({ type: "DEL_TODO_FAILURE", message: e.message });
  }
}
function* deleteSaga() {
  yield takeEvery("DEL_TODO_REQUESTED", delTodo);
}
export default deleteSaga;
