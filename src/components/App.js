import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import QuestionDetails from "./QuestionDetails";
import Leaderboard from "./LeaderBoard";
import Navbar from "./NavBar";
import Login from "./Login";
import Logout from "./Logout";
import LoadingBar from "react-redux-loading";
import NotFound from "./NotFound";
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar className="loading" />
          <Navbar />
          <Switch>
            <PrivateRoute
              path="/"
              exact
              component={Dashboard}
              authedUser={authedUser}
            />

            <Route path="/login" component={Login} />

            <PrivateRoute
              path="/add"
              component={NewQuestion}
              authedUser={authedUser}
            />
            <PrivateRoute
              path="/leaderboard"
              component={Leaderboard}
              authedUser={authedUser}
            />
            <PrivateRoute
              path="/questions/:id"
              component={QuestionDetails}
              authedUser={authedUser}
            />
            <PrivateRoute
              path="/logout"
              component={Logout}
              authedUser={authedUser}
            />
            >
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}
/////////////////////
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const { authedUser } = { ...rest };

        return typeof authedUser === "string" && authedUser.length > 0 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

////////////////////
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(App);
