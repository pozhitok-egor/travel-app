import axios from 'axios';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setLogin, setUser } from '../../../store/actions';
import Button from '../../Button';
import Input from '../../Input';
import { Buttons, Form, Error, Success } from '../Form';
import Social from '../Social';
import { withNamespaces } from 'react-i18next';



const Registration = (props) => {
  const [error, setError] = useState(props.error);
  const [success, setSuccess] = useState();

  const registerUser = (e) => {
    setError();
    setSuccess();
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const repeat = e.target.elements.password_repeat.value;
    if (password === repeat) {
      axios.post('https://rs-school-travel-app.herokuapp.com/user/register', {username, password}, {
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
    } else {
      setError(props.t('password_missmach'))
    }

  }

  return (
    <Form onSubmit={registerUser} type="registration">
      <h1>{props.t('registration')}</h1>
      <Input type='text' name="username" placeholder={props.t('username')}/>
      <Input type='password' name="password" placeholder={props.t('password')} autocomplete="new-password"/>
      <Input type='password' name="password_repeat" placeholder={props.t('repeat_password')} autocomplete="new-password"/>
      <Social />
      <Buttons>
        <Button type='submit'>{props.t('registration')}</Button>
        <Button type='button' onClick={(e) => props.setLogin()}>{props.t('login')}</Button>
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
  setLogin,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Registration))
