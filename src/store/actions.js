import { FETCH_COUNTRIES, FETCH_COUNTRY, LOADER_ACTIVATE, LOADER_DEACTIVATE } from "./types";
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

export function fetchCountries() {
  return async dispatch => {
    dispatch(loaderActivate());
    axios.get('https://travel-app-demo.herokuapp.com/countries/',{
    headers: {
      accept: 'application/json'
    }
    }).then((res) => {
      dispatch({type: FETCH_COUNTRIES, payload: res.data});
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
    axios.get(`https://travel-app-demo.herokuapp.com/countries/${id}`,{
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
