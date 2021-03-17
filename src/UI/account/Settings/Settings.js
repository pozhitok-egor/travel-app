import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUser } from '../../../store/actions';
import Input from '../../Input';
import { Avatar, Error, Form, Success,Group } from '../Styled';
import Button from '../../Button';
import axios from 'axios';
import AvatarEdit from 'react-avatar-edit';
import { withNamespaces } from 'react-i18next';

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
}

const Settings = (props, { t }) => {
  const [errorN, setErrorN] = useState(props.error);
  const [successN, setSuccessN] = useState();
  const [errorP, setErrorP] = useState(props.error);
  const [successP, setSuccessP] = useState();
  const [username, setUsername]= useState(props.user.username);
  const [image, setImage]= useState();
  const [errorI, setErrorI] = useState(props.error);

  const updateUserP = (e) => {
    e.preventDefault();
    setErrorP();
    setSuccessP();
    const password = e.target.elements.password.value;
    const repeat = e.target.elements.password_repeat.value;
    if (password === repeat) {
      axios.put('https://rs-school-travel-app.herokuapp.com/user/', { password }, {
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
      setErrorP(props.t('passwords_missmatch'));
    }
  }

  const updateUserN = (e) => {
    e.preventDefault();
    setErrorN();
    setSuccessN();
    const name = username;
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
    } else {
      setErrorN(props.t('newname'));
    }
  }

  const uploadImage = (e) => {
    e.preventDefault();
    if ( image ) {
      const file = dataURLtoFile(image,'avatar.png')
      const formData = new FormData()
      formData.append('avatar', file);
      axios.put('https://rs-school-travel-app.herokuapp.com/user/upload', formData,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(data => {
        window.location = '/account';
      })
      .catch(error => {
        setErrorI(error.response.data.message)
      })
    } else {
      setErrorI(props.t('choosephoto'));
    }
  }

  return (
    <div>
      <Form onSubmit={(e) => uploadImage(e)}>
          <Avatar>
            <AvatarEdit
              width={200}
              height={200}
              cropRadius={100}
              shadingColor = {'rgb(38,35,40)'}
              cropColor = {'rgb(20,127,235)'}
              closeIconColor = {'rgb(20,127,235)'}
              exportAsSquare = {true}
              exportSize = {256}
              onCrop = {(file) => setImage(file)}
              onClose={() => setImage(null)}
              labelStyle = {{fontFamily: 'Balsamiq Sans', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', cursor: 'pointer'}}
              borderStyle= {{border: 'none'}}
              src={`data:image/png;base64,${btoa(String.fromCharCode.apply(null, props.user.image.data.data))}`}
            />
          </Avatar>
          <Button type='submit'>{props.t('upload')}</Button>
          { errorI &&
            <Error>{errorI}</Error>
          }
      </Form>
      <Form onSubmit={updateUserN}>
        <h1>{props.t('сhange_username')}</h1>
        <Group>
          <Input type='text' value={username} onChange={e=>setUsername(e.target.value)} name='username' placeholder={props.t('username')}  autocomplete='username'/>
          <Button type='submit'>{props.t('ok')}</Button>
        </Group>
        { errorN &&
          <Error>{errorN}</Error>
        }
        { successN &&
          <Success>{successN}</Success>
        }
      </Form>
      <Form onSubmit={updateUserP}>
        <h1>{props.t('change_password')}</h1>
        <Input type='password'  name="password" placeholder={props.t('password')}  autocomplete="new-password"/>
        <Input type='password' autocomplete="new-password" name="password_repeat" placeholder={props.t('repeat_password')}/>
          <Button type='submit'>{props.t('confirm')}</Button>
        { errorP &&
          <Error>{errorP}</Error>
        }
        { successP &&
          <Success>{successP}</Success>
        }
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Settings))
