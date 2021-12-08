import { createStore, combineReducers, applyMiddleware } from "redux";
import { placesReducer } from "./placesReducer";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga";

// Создание store и подключение Saga

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  placesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
