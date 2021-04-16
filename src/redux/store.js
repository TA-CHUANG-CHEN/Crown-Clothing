import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; //GUI

import rootReducer from "./root-reducer";

const middlewares = [logger]; //logger is dispatch GUI log in dev.tool

const store = createStore(rootReducer, applyMiddleware(...middlewares));
// 1. store that holds the complete state tree of your app, There should only be a single store in your app.

export default store;
