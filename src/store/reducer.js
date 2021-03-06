import { combineReducers } from "redux";
import { FETCH_COUNTRIES, FETCH_COUNTRY, LOADER_ACTIVATE, LOADER_DEACTIVATE } from "./types";

function countriesReducer(state = null, action) {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return action.payload;
    default: return state;
  }
}

function loaderReducer(state = { active: false }, action) {
  switch (action.type) {
    case LOADER_ACTIVATE:
      return {...state, active: true}
    case LOADER_DEACTIVATE:
      return {...state, active: false}
    default: return state;
  }
}

function countryReducer(state = null, action) {
  switch (action.type) {
    case FETCH_COUNTRY:
      return action.payload;
    default: return state;
  }
}

export const rootReducer = combineReducers({
  pageLoader: loaderReducer,
  countries: countriesReducer,
  country: countryReducer
})
