import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { parseCookies } from "nookies";

import "./App.css";
import Account from "./pages/Account/Account";
import DisplayLatex from "./pages/AddQuestion/AddQuestion";
import DisplayPaper from "./pages/DisplayPaper/DisplayPaper";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Login from "./pages/Login/Login";
import Nav from "./Layout/Nav/Nav";
import SetPaper from "./pages/SetPaper/SetPaper";
import SignUp from "./pages/SignUp/SignUp";
import SavedPaper from "./components/SavedPaper/SavedPaper";
import { useStateValue } from "./Context/StateProvider";
import AddQuestion from "./pages/AddQuestion/AddQuestion";
import AddTopic from "./pages/AddTopic/AddTopic";

function App() {
  const cookie = parseCookies();
  const user1 = cookie.user ? JSON.parse(cookie.user) : null;
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user1 !== null) {
      dispatch({
        type: "SET_USER",
        user: user1,
      });
    }
  }, []);

  return (
    <Router>
      <div className="app">
        {!user ? (
          <Switch>
            <Route path="/signup">
              <Nav />
              <SignUp />
            </Route>
            <Route path="/forgotpassword">
              <Nav />
              <ForgotPassword />
            </Route>
            <Route path="/">
              <Nav />
              <Login />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/savedPaper">
              <Nav />
              <SavedPaper />
            </Route>
            <Route path="/displayPaper">
              <Nav />
              <DisplayPaper />
            </Route>
            {user !== null && user1.role === "admin" && (
              <Route path="/addTopic">
                <Nav />
                <AddTopic />
              </Route>
            )}
            {user !== null && user1.role === "admin" && (
              <Route path="/addQuestion">
                <Nav />
                <AddQuestion />
              </Route>
            )}
            <Route path="/account">
              <Nav />
              <Account />
            </Route>
            <Route path="/">
              <Nav />
              <SetPaper />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
