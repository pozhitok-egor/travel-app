import { combineReducers } from "redux";
import { FETCH_COUNTRIES, FETCH_COUNTRY, FETCH_LANGUAGE, FETCH_PLACES, FETCH_WEATHER, FETCH_CURRENCY, LOADER_ACTIVATE, LOADER_DEACTIVATE, SEARCH_COUNTRY, FETCH_RATING } from "./types";

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

function placesReducer(state = null, action) {
  switch (action.type) {
    case FETCH_PLACES:
      return action.payload;
    default: return state;
  }
}

function searchReducer(state = null, action) {
  switch (action.type) {
    case SEARCH_COUNTRY:
      return action.payload;
    default: return state;
  }
}

function weatherReducer(state = null, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return action.payload;
    default: return state;
  }
}

function currencyReducer(state = null, action) {
  switch (action.type) {
    case FETCH_CURRENCY:
      return action.payload;
    default: return state;
  }
}

function languageReducer(state = localStorage.getItem("lang") || "en", action) {
  switch (action.type) {
    case FETCH_LANGUAGE:
      return action.payload;
    default: return state;
  }
}

function ratingsReducer(state = null, action) {
  switch (action.type) {
    case FETCH_RATING:
      return action.payload;
    default: return state;
  }
}

export const rootReducer = combineReducers({
  pageLoader: loaderReducer,
  countries: countriesReducer,
  country: countryReducer,
  search: searchReducer,
  language: languageReducer,
  weather: weatherReducer,
  currency: currencyReducer,
  places: placesReducer,
  ratings: ratingsReducer
})
