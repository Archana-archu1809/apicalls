import { all } from "redux-saga/effects";
import todoSaga from "./todoSaga";
import postSaga from "./postSaga";
import deleteSaga from "./delSaga";
import updateSaga from "./updateSaga";
function* rootSaga() {
  yield all([todoSaga(), postSaga(), deleteSaga(), updateSaga()]);
}
export default rootSaga;
