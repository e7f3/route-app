import { createStore, combineReducers, applyMiddleware } from "redux";
import { placesReducer } from "./placesReducer";
import { routeReducer } from "./routeReducer";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga";

// Создание store и подключение Saga

const sagaMiddleware = createSagaMiddleware();

// Создание rootReducer

const rootReducer = combineReducers({
  placesReducer,
  routeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
