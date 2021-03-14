import { Redirect, Route, Switch } from 'react-router';
import Main from './UI/main';
import Country from './UI/country';
import Auth from './UI/authorization';
import styled from 'styled-components';
import styles from './styles.css';
import { connect } from 'react-redux';
// import Callback from './UI/authorization/Callback';

const App = ( props ) => {
  console.log('вызов апп');
  return (
    <AppBlock style={styles}>
      <Switch>
        { !props.user && <Redirect exact path='/' to='/auth' /> }
        { props.user && <Route exact path='/' component={Main} /> }
        <Route path='/auth' component={Auth} />
        <Route path='/country/:id' component={Country} />
      </Switch>
    </AppBlock>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(App);

const AppBlock = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  min-height: 100vh;
  background-color: #EFF2F3;
`;
