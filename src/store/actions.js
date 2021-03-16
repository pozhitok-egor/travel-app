import { FETCH_COUNTRIES, FETCH_COUNTRY, FETCH_LANGUAGE, LOADER_ACTIVATE, LOADER_DEACTIVATE, SEARCH_COUNTRY, FETCH_WEATHER, FETCH_CURRENCY, FETCH_PLACES, SIGN_OUT, SET_LOGIN, SET_REGISTRATION, FETCH_USER, SET_USER, AUTH_STATE, UPDATE_RATING_PLACES, FETCH_RATING } from "./types";
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

export function fetchCountry(id, lang) {
  return async dispatch => {
    dispatch(loaderActivate());
    axios.get(`https://rs-school-travel-app.herokuapp.com/country/${id}`,{
    headers: {
      accept: 'application/json'
    }
    }).then((res) => {
      dispatch(fetchWeather(`${res.data.country.capital.en}, ${res.data.country.ISOCode}`, lang));
      dispatch(fetchCurrency(res.data.country.currency));
      dispatch({type: FETCH_COUNTRY, payload: res.data.country});
      dispatch({type: FETCH_PLACES, payload: res.data.places})
      dispatch(loaderDeactivate());
    }).catch((err) => {
      dispatch({type: FETCH_COUNTRY, payload: null});
      dispatch({type: FETCH_PLACES, payload: null});
      dispatch(loaderDeactivate());
    })
  }
}

export function fetchWeather(city, lang) {
  return async dispatch => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=049d6bfecf5f28f90a2cd75d513cb01f&lang=${lang}`,{
    headers: {
      accept: 'application/json'
    }
    }).then((res) => {
      dispatch({type: FETCH_WEATHER, payload: res.data});
    }).catch((err) => {
      dispatch({type: FETCH_WEATHER, payload: null});
    })
  }
}

export function fetchUser(token) {
  return async dispatch => {
    dispatch(authState(true));
    dispatch(loaderActivate());
    axios.get(`https://rs-school-travel-app.herokuapp.com/user/`,{
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    }).then((res) => {
      dispatch({type: FETCH_USER, payload: res.data.user});
      dispatch(loaderDeactivate());
      dispatch(authState(false));
    }).catch((err) => {
      dispatch({type: FETCH_USER, payload: null});
      localStorage.removeItem('token');
      dispatch(loaderDeactivate());
      dispatch(authState(false));
    })
  }
}

export function authState(state) {
  return {
    type: AUTH_STATE,
    payload: state,
  }
}

export function fetchCurrency(currency) {
  return async dispatch => {
    axios.get(`https://api.exchangeratesapi.io/latest?base=${currency}`,{
    headers: {
      accept: 'application/json'
    }
    }).then((res) => {
      dispatch({type: FETCH_CURRENCY, payload: res.data});
    }).catch((err) => {
      dispatch({type: FETCH_CURRENCY, payload: err});
    })
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  }
}

export function signOut() {
  localStorage.removeItem('token');
  return {
    type: SIGN_OUT,
  }
}

export function setLogin() {
  return {
    type: SET_LOGIN,
  }
}

export function setRegistration() {
  return {
    type: SET_REGISTRATION,
  }
}

export function fetchRating(id) {
  return async dispatch => {
    dispatch(loaderActivate());
    axios.get(`https://rs-school-travel-app.herokuapp.com/rating/${id}`,{
    headers: {
      accept: 'application/json'
    }
    }).then((res) => {
      dispatch({type: FETCH_RATING, payload: res.data.ratings.sort((a, b) => b.rating - a.rating)});
      dispatch(loaderDeactivate());
    }).catch((err) => {
      dispatch({type: FETCH_RATING, payload: null});
      dispatch(loaderDeactivate());
    })
  }
}

export function updateRating(id,rating) {
  return async dispatch => {
    axios.post(`https://rs-school-travel-app.herokuapp.com/rating/${id}`,{
      rating: rating
    },{
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }}     
    ).then((res) => {
      dispatch({type: UPDATE_RATING_PLACES, payload: {id: id, rating: res.data.placeRating}});
    }).catch((err) => {
    })
  }
}
