// Reducer для хранения и операций с данными о точках маршрута

/*  
    Default состояние : 
    places - объект с информацией о точках маршрута, ключ - id точки
    placeIds - массив с информацией о порядке следования точек маршрута, 
                состоит из id точек
*/

const defaultState = {
  places: {},
  placeIds: [],
};

export const ADD_PLACE = "ADD_PLACE";
export const GET_ADDRESS_FROM_COORDS = "GET_ADDRESS_FROM_COORDS";
export const SET_PLACEIDS = "SET_PLACEIDS";
export const REMOVE_PLACE = "REMOVE_PLACE";
export const UPDATE_PLACE = "UPDATE_PLACE";

export const placesReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Добавить точку маршрута

    case ADD_PLACE:
      const { id } = action.payload;
      const clonePlaces = { ...state.places };
      clonePlaces[id] = action.payload;
      return {
        ...state,
        places: { ...clonePlaces },
        placeIds: [...state.placeIds, id],
      };

    // Установить новый порядок точек маршрута

    case SET_PLACEIDS:
      return {
        ...state,
        placeIds: [...action.payload],
      };

    // Удалить точку маргрута

    case REMOVE_PLACE:
      const newPlaceIds = state.placeIds.filter(
        (placeId) => placeId !== action.payload
      );
      const newPlaces = Object.assign({}, state.places);
      delete newPlaces[action.payload];
      return {
        ...state,
        places: newPlaces,
        placeIds: newPlaceIds,
      };

    // Обновить информацию о точке маршрута

    case UPDATE_PLACE:
      // Так как получение адреса из координат занимает время,
      // информацию об адресе нужно внести в уже созданный объект точки

      const updatedPlaces = {
        ...state.places,
        [action.payload.id]: {
          ...state.places[action.payload.id],
          ...action.payload,
        },
      };
      return {
        ...state,
        places: updatedPlaces,
      };
    default:
      return state;
  }
};

// Actions для комфортной работы с reducer

export const addPlaceAction = (payload) => ({ type: ADD_PLACE, payload });
export const getAddressFromCoordsAction = (payload) => ({
  type: GET_ADDRESS_FROM_COORDS,
  payload,
});
export const setPlaceIdsAction = (payload) => ({ type: SET_PLACEIDS, payload });
export const removePlaceAction = (payload) => ({ type: REMOVE_PLACE, payload });
export const updatePlaceAction = (payload) => ({ type: UPDATE_PLACE, payload });
