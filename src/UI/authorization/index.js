import React from 'react'
import { connect } from 'react-redux';
import Container from '../Container';
import Footer from '../Footer';
import Header from '../Header';
import { PageLoader } from '../PageLoader/PageLoader';
import Content from '../Content/Content';
import { fetchUser } from '../../store/actions';
import Registration from './Registration';
import Login from './Login';
import queryString from 'querystring';
import { Redirect } from 'react-router';

const Auth = (props) => {
  const data = queryString.parse(props.location.search.substring(1));
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  const token = data.token || localStorage.getItem('token');
  if ( token && !props.pageLoader && !props.user) {
    props.fetchUser(token);
  }
  return (
    <Container>
      <Header></Header>
        <Content>
          { props.user && !props.pageLoader &&
            <Redirect to='/'/>
          }
          { props.pageLoader &&
            <PageLoader />
          }
          { !props.pageLoader &&
            props.auth === 'login' ?
            <Login error={data.error}/> : !props.pageLoader && <Registration error={data.error}/>
          }
        </Content>
      <Footer />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    pageLoader: state.pageLoader.active,
    lang: state.language,
    user: state.user,
    auth: state.auth
  }
}

const mapDispatchToProps = {
  fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
