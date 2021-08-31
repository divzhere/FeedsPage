import { Route, Redirect, Switch } from "react-router";
import Feed from "./components/Feed/Feed";
import "./styles/main.scss";
export default function App() {
  return (
    <>
      <Switch>
        <Route path="/feed" component={Feed} />
        <Route path="/">
          <Redirect to="/feed" />
        </Route>
      </Switch>
    </>
  );
}
