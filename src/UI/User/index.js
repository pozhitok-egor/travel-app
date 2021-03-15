import React from 'react'
import { connect } from 'react-redux';
import { signOut } from '../../store/actions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const User = (props) => {
  return (
    <UserBlock>
      <Buttons>
        <Link to='/'><Button onClick={() => props.signOut()}>Sign Out</Button></Link>
        <Link to='/account'>
          <Button>Account</Button>
        </Link>
      </Buttons>
      <Avatar src={`data:image/png;base64,${btoa(String.fromCharCode.apply(null, props.user.image.data.data))}`} alt="avatar"/>
      {props.username}
    </UserBlock>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

const UserBlock = styled.div`
  display: flex;
  gap: 10px;
`;

const Avatar = styled.img`
  cursor: none;
  width: 70px;
  height: 70px;
  border-radius: 50px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  background: #147FEB;
  color: #EFF2F3;
  border: none;
`;
