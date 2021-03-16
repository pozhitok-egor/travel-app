import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUser,updateUserImg } from '../../../store/actions';
import Input from '../../Input';
import { AvatarS, Error, Form, Success, InputFile,Label,Group } from '../Styled';
import Button from '../../Button';
import axios from 'axios';


const Settings = (props) => {
  console.log(props.error)
  const [errorN, setErrorN] = useState(props.error);
  const [successN, setSuccessN] = useState();
  const [errorP, setErrorP] = useState(props.error);
  const [successP, setSuccessP] = useState();
  const [username, setUsername]= useState(props.user.username)

  const updateUserP = (e) => {
    e.preventDefault();
    setErrorP();
    setSuccessP();
    const password = e.target.elements.password.value;
    const repeat = e.target.elements.password_repeat.value;
    if (password === repeat) {
    axios.put('https://rs-school-travel-app.herokuapp.com/user/', {password}, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      setSuccessP(res.data.message);
      props.setUser(res.data.user);
    })
    .catch((error) => {
        setErrorP(error.response.data.message);
    });
    } else {
      setErrorP("Passwords don't match!");
      }
  }

  const updateUserN = (e) => {
    e.preventDefault();
    setErrorN();
    setSuccessN();
    const name = username;
    console.log()
    if(name !== props.user.username) {
    axios.put('https://rs-school-travel-app.herokuapp.com/user/', {username:name}, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      setSuccessN(res.data.message);
      props.setUser(res.data.user);
    })
    .catch((error) => {
      setErrorN(error.response.data.message);
    });
    }
  }



  
  const uploadImage = (e) => {
    console.log(e)
    props.updateUserImg(e.target.files[0])
    // const f= new FileReader();
    // f.onload = ()=> {
    //   console.log(f.result)
    //   props.updateUserImg(f.result)
    // }
    // f.readAsDataURL(e.target.files[0])
  }

  return (
    <Form onSubmit={updateUserP}>
    <Label>
    <div>
        <img src={`data:image/png;base64,${btoa(String.fromCharCode.apply(null, props.user.image.data.data))}`} alt="Preview" />
    </div>
        <InputFile type="file" onChange={(e)=>uploadImage(e)} />
        <AvatarS src={`data:image/png;base64,${btoa(String.fromCharCode.apply(null, props.user.image.data.data))}`} alt=""/>
    </Label>
    <h1>Change username</h1>
    <Group>
      <Input type='text' value={username} onChange={e=>setUsername(e.target.value)} name='username' placeholder='username' autocomplete='username'/>
      <Button onClick={updateUserN}>Ok</Button>
    </Group>
      { errorN &&
        <Error>{errorN}</Error>
      }
      { successN &&
        <Success>{successN}</Success>
      }
      <h1>Change password</h1>
      <Input type='password'  name="password" placeholder="password" autocomplete="new-password"/>
      <Input type='password' autocomplete="new-password" name="password_repeat" placeholder="repeat password"/>
        <Button type='submit'>Confirm</Button>
      { errorP &&
        <Error>{errorP}</Error>
      }
      { successP &&
        <Success>{successP}</Success>
      }
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,    
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser,
  updateUserImg
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
