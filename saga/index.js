import { all } from "redux-saga/effects";
import { mapWatcher } from "./mapSaga";

// Организация работы с Saga

export function* rootWatcher() {
  yield all([mapWatcher()]);
}
