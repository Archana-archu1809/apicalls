import { all } from "redux-saga/effects";
import todoSaga from "./todoSaga";
import postSaga from "./postSaga";
import deleteSaga from "./delSaga";
function* rootSaga() {
  yield all([todoSaga(), postSaga(), deleteSaga()]);
}
export default rootSaga;
