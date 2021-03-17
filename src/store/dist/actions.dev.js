"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loaderActivate = loaderActivate;
exports.loaderDeactivate = loaderDeactivate;
exports.search = search;
exports.fetchLanguage = fetchLanguage;
exports.fetchCountries = fetchCountries;
exports.fetchCountry = fetchCountry;
exports.fetchWeather = fetchWeather;
exports.fetchUser = fetchUser;
exports.authState = authState;
exports.fetchCurrency = fetchCurrency;
exports.setUser = setUser;
exports.signOut = signOut;
exports.setLogin = setLogin;
exports.setRegistration = setRegistration;
exports.fetchRating = fetchRating;
exports.updateRating = updateRating;

var _types = require("./types");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function loaderActivate() {
  return {
    type: _types.LOADER_ACTIVATE
  };
}

function loaderDeactivate() {
  return {
    type: _types.LOADER_DEACTIVATE
  };
}

function search(text) {
  return {
    type: _types.SEARCH_COUNTRY,
    payload: text !== "" ? text : null
  };
}

function fetchLanguage(lang) {
  return {
    type: _types.FETCH_LANGUAGE,
    payload: lang || "en"
  };
}

function fetchCountries() {
  return function _callee(dispatch) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(loaderActivate());

            _axios["default"].get('https://rs-school-travel-app.herokuapp.com/country', {
              headers: {
                accept: 'application/json'
              }
            }).then(function (res) {
              dispatch({
                type: _types.FETCH_COUNTRIES,
                payload: res.data.countries
              });
              dispatch(loaderDeactivate());
            })["catch"](function (err) {
              dispatch({
                type: _types.FETCH_COUNTRIES,
                payload: null
              });
              dispatch(loaderDeactivate());
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}

function fetchCountry(id, lang) {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(loaderActivate());

            _axios["default"].get("https://rs-school-travel-app.herokuapp.com/country/".concat(id), {
              headers: {
                accept: 'application/json'
              }
            }).then(function (res) {
              dispatch(fetchWeather("".concat(res.data.country.capital.en, ", ").concat(res.data.country.ISOCode), lang));
              dispatch(fetchCurrency(res.data.country.currency));
              dispatch({
                type: _types.FETCH_COUNTRY,
                payload: res.data.country
              });
              dispatch({
                type: _types.FETCH_PLACES,
                payload: res.data.places
              });
              dispatch(loaderDeactivate());
            })["catch"](function (err) {
              dispatch({
                type: _types.FETCH_COUNTRY,
                payload: null
              });
              dispatch({
                type: _types.FETCH_PLACES,
                payload: null
              });
              dispatch(loaderDeactivate());
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
}

function fetchWeather(city, lang) {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _axios["default"].get("https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=049d6bfecf5f28f90a2cd75d513cb01f&lang=").concat(lang), {
              headers: {
                accept: 'application/json'
              }
            }).then(function (res) {
              dispatch({
                type: _types.FETCH_WEATHER,
                payload: res.data
              });
            })["catch"](function (err) {
              dispatch({
                type: _types.FETCH_WEATHER,
                payload: null
              });
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
}

function fetchUser(token) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dispatch(authState(true));
            dispatch(loaderActivate());

            _axios["default"].get("https://rs-school-travel-app.herokuapp.com/user/", {
              headers: {
                'accept': 'application/json',
                'Authorization': "Bearer ".concat(token)
              }
            }).then(function (res) {
              dispatch({
                type: _types.FETCH_USER,
                payload: res.data.user
              });
              dispatch(loaderDeactivate());
              dispatch(authState(false));
            })["catch"](function (err) {
              dispatch({
                type: _types.FETCH_USER,
                payload: null
              });
              localStorage.removeItem('token');
              dispatch(loaderDeactivate());
              dispatch(authState(false));
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
}

function authState(state) {
  return {
    type: _types.AUTH_STATE,
    payload: state
  };
}

function fetchCurrency(currency) {
  return function _callee5(dispatch) {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _axios["default"].get("https://api.exchangeratesapi.io/latest?base=".concat(currency), {
              headers: {
                accept: 'application/json'
              }
            }).then(function (res) {
              dispatch({
                type: _types.FETCH_CURRENCY,
                payload: res.data
              });
            })["catch"](function (err) {
              dispatch({
                type: _types.FETCH_CURRENCY,
                payload: err
              });
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
}

function setUser(user) {
  return {
    type: _types.SET_USER,
    payload: user
  };
}

function signOut() {
  localStorage.removeItem('token');
  return {
    type: _types.SIGN_OUT
  };
}

function setLogin() {
  return {
    type: _types.SET_LOGIN
  };
}

function setRegistration() {
  return {
    type: _types.SET_REGISTRATION
  };
}

function fetchRating(id) {
  return function _callee6(dispatch) {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            dispatch(loaderActivate());

            _axios["default"].get("https://rs-school-travel-app.herokuapp.com/rating/".concat(id), {
              headers: {
                accept: 'application/json'
              }
            }).then(function (res) {
              dispatch({
                type: _types.FETCH_RATING,
                payload: res.data.ratings.sort(function (a, b) {
                  return b.rating - a.rating;
                })
              });
              dispatch(loaderDeactivate());
            })["catch"](function (err) {
              dispatch({
                type: _types.FETCH_RATING,
                payload: null
              });
              dispatch(loaderDeactivate());
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  };
}

function updateRating(id, rating) {
  return function _callee7(dispatch) {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _axios["default"].post("https://rs-school-travel-app.herokuapp.com/rating/".concat(id), {
              rating: rating
            }, {
              headers: {
                "Authorization": "Bearer ".concat(localStorage.getItem('token'))
              }
            }).then(function (res) {
              dispatch({
                type: _types.UPDATE_RATING_PLACES,
                payload: {
                  id: id,
                  rating: res.data.placeRating
                }
              });
            })["catch"](function (err) {});

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    });
  };
}