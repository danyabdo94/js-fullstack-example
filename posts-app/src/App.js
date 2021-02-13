import React from 'react';
import { Login } from './features/login/Login';
import { Signup } from './features/signup/Signup';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <section className="App-header">
        <Router>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </section>
    </div>
  );
}

export default App;
