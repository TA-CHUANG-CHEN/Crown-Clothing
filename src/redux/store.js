import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger"; //GUI

import rootReducer from "./root-reducer";

const middlewares = [logger]; //logger is dispatch GUI log in dev.tool

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// 1. store that holds the complete state tree of your app, There should only be a single store in your app.
export const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistStore };

// eslint-disable-next-line import/no-anonymous-default-export
