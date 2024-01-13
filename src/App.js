import React from "react";
import './App.css';
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import SignUpIntro from "./components/SignUpIntro/SignUpIntro";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SignUpIntro} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/homepage" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
