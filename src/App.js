import { Redirect, Route, Switch } from 'react-router';
import Main from './UI/main';
import Country from './UI/country';
import Auth from './UI/authorization';
import Rating from "./UI/rating";
import styled from 'styled-components';
import styles from './styles.css';
import { connect } from 'react-redux';
import { fetchUser } from './store/actions';
import Account from './UI/account';

const App = ( props ) => {
  const token = localStorage.getItem('token');
  if ( token && !props.auth.state && !props.user) {
    props.fetchUser(token);
  }
  return (
    <AppBlock style={styles}>
      <Switch>
        { !props.user && <Redirect exact path='/' to='/auth' /> }
        { props.user && !props.auth.state && <Route exact path='/' component={Main} /> }
        { props.user && !props.auth.state && <Route path='/country/:id' component={Country} />}
        { props.user && !props.auth.state && <Route path="/rating/:country/:id" component={Rating} />}
        <Route path='/auth' component={Auth} />
        <Route path='/account' component={Account} />
      </Switch>
    </AppBlock>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth
  }
}

const mapDispatchToProps = {
  fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const AppBlock = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  min-height: 100vh;
  background-color: #EFF2F3;
`;
