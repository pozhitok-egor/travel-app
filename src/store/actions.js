import { FETCH_COUNTRIES, FETCH_COUNTRY, FETCH_LANGUAGE, LOADER_ACTIVATE, LOADER_DEACTIVATE, SEARCH_COUNTRY } from "./types";
import axios from "axios";

export function loaderActivate() {
  return {
    type: LOADER_ACTIVATE
  }
}

export function loaderDeactivate() {
  return {
    type: LOADER_DEACTIVATE
  }
}

export function search(text) {
  return {
    type: SEARCH_COUNTRY,
    payload: text !== "" ? text : null
  }
}

export function fetchLanguage(lang) {
  return {
    type: FETCH_LANGUAGE,
    payload: lang || "en",
  }
}

export function fetchCountries() {
  return async dispatch => {
    dispatch(loaderActivate());
    axios.get('https://rs-school-travel-app.herokuapp.com/country',{
    headers: {
      accept: 'application/json'
    }
    }).then((res) => {
      dispatch({type: FETCH_COUNTRIES, payload: res.data.countries});
      dispatch(loaderDeactivate());
    }).catch((err) => {
      dispatch({type: FETCH_COUNTRIES, payload: null});
      dispatch(loaderDeactivate());
    })
  }
}

export function fetchCountry(id) {
  return async dispatch => {
    dispatch(loaderActivate());
    axios.get(`https://rs-school-travel-app.herokuapp.com/country/${id}`,{
    headers: {
      accept: 'application/json'
    }
    }).then((res) => {
      dispatch({type: FETCH_COUNTRY, payload: res.data});
      dispatch(loaderDeactivate());
    }).catch((err) => {
      dispatch({type: FETCH_COUNTRY, payload: null});
      dispatch(loaderDeactivate());
    })
  }
}
