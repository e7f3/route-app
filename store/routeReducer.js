// Reducer для хранения и операций с данными о режимах маршрута

/*  
    Default состояние : 
    routeMode - режим отображения маршрута
    travelMode - режим построения маршрута
*/

const defaultState = {
  routeMode: "POLYLINE",
  travelMode: "DRIVING",
};

export const TOGGLE_ROUTE_MODE = "TOGGLE_ROUTE_MODE";
export const CHANGE_TRAVEL_MODE = "CHANGE_TRAVEL_MODE";

export const routeReducer = (state = defaultState, action) => {
  switch (action.type) {

    // Переключить режим отображения маршрута
    case TOGGLE_ROUTE_MODE:
      const newMode =
        state.routeMode === "POLYLINE" ? "DIRECTIONS" : "POLYLINE";
      return {
        ...state,
        routeMode: newMode,
      };

    // Изменить режим построения маршрута
    case CHANGE_TRAVEL_MODE:
      return {
        ...state,
        travelMode: action.payload,
      };
    default:
      return state;
  }
};

// Actions для комфортной работы с reducer

export const ToggleRouteModeAction = () => ({ type: TOGGLE_ROUTE_MODE });
export const ChangeTravelModeAction = (payload) => ({
  type: CHANGE_TRAVEL_MODE,
  payload,
});
