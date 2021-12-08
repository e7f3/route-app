import { call, put, takeEvery } from "redux-saga/effects";
import { GET_ADDRESS_FROM_COORDS, updatePlaceAction } from "../store/placesReducer";
import axios from "axios";

const fetchAddress = (params) =>
  axios
    .post("/api/map/decodeCoords", { lat: params.lat, lng: params.lng })
    .then((res) => res);

function* getPlaceAddress(action) {
  const res = yield call(fetchAddress, action.payload);
  yield put(
    updatePlaceAction({
      ...action.payload,
      address: {
        formattedAddress: res.data?.formattedAddress,
        addressComponents: res.data?.addressComponents,
      },
    })
  );
}

export function* mapWatcher() {
  yield takeEvery(GET_ADDRESS_FROM_COORDS, getPlaceAddress);
}
