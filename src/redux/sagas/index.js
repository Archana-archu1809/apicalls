import { all } from "redux-saga/effects";
import todoSaga from "./todoSaga";
import postSaga from "./postSaga";
function* rootSaga() {
  yield all([todoSaga(), postSaga()]);
}
export default rootSaga;
