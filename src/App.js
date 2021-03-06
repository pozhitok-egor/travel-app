import { Route, Switch } from "react-router";
import Main from "./UI/Main";
import Country from "./UI/Country";
import styled from 'styled-components';
import styles from './styles.css';

function App() {
  return (
    <AppBlock style={styles}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/country/:id" component={Country} />
      </Switch>
    </AppBlock>
  );
}

export default App;

const AppBlock = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  min-height: 100vh;
  background-color: #EFF2F3;
`;
