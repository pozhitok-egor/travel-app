import { Route, Switch } from "react-router";
import { Main } from "./UI/main";
import { Country } from "./UI/country";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/country/:id" component={Country} />
    </Switch>
  );
}

export default App;
