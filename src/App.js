import { Route, Switch } from "react-router";
import Main from "./UI/main";
import Country from "./UI/country";
import Rating from "./UI/rating";
import styled from 'styled-components';
import styles from './styles.css';

function App() {
  return (
    <AppBlock style={styles}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/country/:id" component={Country} />
        <Route path="/rating/:country/:id" component={Rating} />
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
