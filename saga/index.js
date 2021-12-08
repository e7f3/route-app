import { all } from "redux-saga/effects";
import { mapWatcher } from "./mapSaga";

export function* rootWatcher() {
  yield all([mapWatcher()]);
}
