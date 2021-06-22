import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger"; //GUI
import rootReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root.saga";

// const middlewares = [thunk]; middlewares intercept data between action && reducer
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger); //logger is dispatch GUI log in dev.tool
}
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

// 1. store that holds the complete state tree of your app, There should only be a single store in your app.
export const persistor = persistStore(store); //store all state in local storage

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistStore };

// eslint-disable-next-line import/no-anonymous-default-export
