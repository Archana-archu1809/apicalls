import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./reducers/index";
import rootSaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();
const store = compose(applyMiddleware(sagaMiddleware))(createStore)(
  rootReducers
);
sagaMiddleware.run(rootSaga);
export default store;
