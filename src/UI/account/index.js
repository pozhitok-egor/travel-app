import React from 'react'
import { connect } from 'react-redux';
import Container from '../Container';
import Footer from '../Footer';
import User from '../User'
import Header from '../Header';
import { PageLoader } from '../PageLoader/PageLoader';
import Content from '../Content/Content';
import { fetchUser } from '../../store/actions';
import queryString from 'querystring';
import Settings from './Settings/Settings';
import Select from '../Select';

const Account = (props) => {
  const data = queryString.parse(props.location.search.substring(1));
  if (data.token && !props.auth.state && !props.user) {
    localStorage.setItem('token', data.token);
    props.fetchUser(data.token);
  }
  return (
    <Container>
      <Header><Select /></Header>
        <Content>
          { props.pageLoader &&
            <PageLoader />
          }
          { !props.pageLoader &&
            <Settings />
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
