import axios from 'axios';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setLogin, setUser } from '../../../store/actions';
import Button from '../../Button';
import Input from '../../Input';
import { Buttons, Form, Error, Success } from '../Form';
import Social from '../Social';



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
      setError("Passwords don't match!")
    }

  }

  return (
    <Form onSubmit={registerUser} type="registration">
      <h1>Registration</h1>
      <Input type='text' name="username" placeholder="username"/>
      <Input type='password' name="password" placeholder="password" autocomplete="new-password"/>
      <Input type='password' autocomplete="new-password" name="password_repeat" placeholder="repeat password"/>
      <Social />
      <Buttons>
        <Button type='submit'>Register</Button>
        <Button type='button' onClick={(e) => props.setLogin()}>Login</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
