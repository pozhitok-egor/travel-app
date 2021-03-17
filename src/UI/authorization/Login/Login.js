import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setRegistration, setUser } from '../../../store/actions';
import Input from '../../Input';
import { Buttons, Error, Form, Success } from '../Form';
import Button from '../../Button';
import axios from 'axios';
import Social from '../Social';
import { withNamespaces } from 'react-i18next';


const Login = (props) => {
  const [error, setError] = useState(props.error);
  const [success, setSuccess] = useState();

  const loginUser = (e) => {
    e.preventDefault();
    setError();
    setSuccess();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    axios.post('https://rs-school-travel-app.herokuapp.com/user/login', {username, password}, {
      headers: {
        accept: 'application/json'
      }
    })
    .then((res) => {
      setSuccess(res.data.message);
      props.setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
  }

  return (
    <Form onSubmit={loginUser}>
      <h1>{props.t('login')}</h1>
      <Input type='text' name='username' placeholder={props.t('username')} autocomplete='username'/>
      <Input type='password' name='password' placeholder={props.t('password')} autocomplete='current-password'/>
      <Social />
      <Buttons>
        <Button type='submit'>{props.t('login')}</Button>
        <Button type='button' onClick={(e) => props.setRegistration()}>{props.t('registration')}</Button>
      </Buttons>
      { error &&
        <Error>{error}</Error>
      }
      { success &&
        <Success>{success}</Success>
      }
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  setRegistration,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Login))
