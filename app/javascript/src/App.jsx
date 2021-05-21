import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { initializeLogger } from "common/logger";
import { either, isEmpty, isNil } from "ramda";
import ShowPoll from "components/Polls/ShowPoll";
import CreatePoll from "components/Polls/CreatePoll";
import EditPoll from "components/Polls/EditPoll";
import Dashboard from "components/Dashboard";
import NavBar from "components/NavBar";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import PageLoader from "components/PageLoader";
import Signup from "components/Authentication/Signup";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import { getFromLocalStorage } from "helpers/storage";

// export const logger = require("js-logger");

// export const initializeLogger = () => {
//   /* eslint no-undef: "off"*/
//   logger.useDefaults();
// };

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    // logger.useDefaults();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} />
      <ToastContainer />
      {isLoggedIn ? (
        <AuthRoutes isLoggedIn={isLoggedIn} />
      ) : (
        <UnAuthRoutes isLoggedIn={isLoggedIn} />
      )}
    </Router>
  );
};

const AuthRoutes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/polls/create" component={CreatePoll} />
      <Route exact path="/polls/:id/show" component={ShowPoll} />
      <Route exact path="/polls/:id/edit" component={EditPoll} />
      <Route exact path="*" component={Dashboard} />
    </Switch>
  );
};

const UnAuthRoutes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="*" privateRoute="/login" />
    </Switch>
  );
};

export default App;
