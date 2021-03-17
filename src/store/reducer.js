import { combineReducers } from "redux";
import { FETCH_COUNTRIES, FETCH_COUNTRY, FETCH_LANGUAGE, LOADER_ACTIVATE, LOADER_DEACTIVATE, SEARCH_COUNTRY, FETCH_WEATHER, FETCH_CURRENCY, FETCH_PLACES, SIGN_OUT, SET_LOGIN, SET_REGISTRATION, FETCH_USER, SET_USER, AUTH_STATE, UPDATE_RATING_PLACES, FETCH_RATING } from "./types";

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
    case UPDATE_RATING_PLACES:
      return state.map(el=> el._id === action.payload.id ? {...el, rating : action.payload.rating} : el)
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

function languageReducer(state = localStorage.getItem("lang") || "ru", action) {
  switch (action.type) {
    case FETCH_LANGUAGE:
      return action.payload;
    default: return state;
  }
}

function userReducer(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case SET_USER:
      return action.payload;
    case SIGN_OUT:
      return null;
    default: return state;
  }
}

function authReducer(state = { state: false, page: 'login'}, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {...state, page: 'login'};
    case SET_REGISTRATION:
      return {...state, page: 'registration'};
    case AUTH_STATE:
      return {...state, state: action.payload};
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
  ratings: ratingsReducer,
  places: placesReducer,
  auth: authReducer,
  user: userReducer,
  currency: currencyReducer
})
