import React from 'react';
import { Login } from './features/login/Login';
import { Signup } from './features/signup/Signup';
import { Posts } from './features/posts/Posts';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <section className="App-header">
        <Router>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/posts">
              <Posts />
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
