import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav/Nav";
import Login from "./Login/Login";
import "./App.css";
import SetPaper from "./SetPaper/SetPaper";
import DisplayPaper from "./DisplayPaper/DisplayPaper";
import SignUp from "./SignUp/SignUp";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Account from "./Account/Account";
import SavedPaper from "./Account/SavedPaper/SavedPaper";
import { parseCookies } from "nookies";
import { useStateValue } from "./Context/StateProvider";
import Home from "./Home/Home";
import DisplayLatex from "./DisplayLatex/DisplayLatex";

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
            {/* <Route path="/signin">
              <Nav />
              <Login />
            </Route> */}
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
            {/* <Route path="/setpaper">
              <Nav />
              <SetPaper />
            </Route> */}
            <Route path="/savedPaper">
              <Nav />
              <SavedPaper />
            </Route>
            <Route path="/displayPaper">
              <Nav />
              <DisplayPaper />
            </Route>
            {user !== null && user1.role == "admin" && (
              <Route path="/addQuestion">
                <Nav />
                <DisplayLatex />
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
