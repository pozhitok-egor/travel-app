import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'querystring';

const Callback = (props) => {
  const data = queryString.parse(props.location.search.substring(1));
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return <Redirect to="/"/>
}


export default Callback;