import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

/* Components */
import LandingPage from './components/LandingPage.js';
import LogInPage from './components/LogInPage.js';

/* Future localization/Strings */
import {ROUTER_BASENAME} from './Strings.js';

/* Bootstrap */
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


class AppFrame extends Component {
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <BrowserRouter basename={"/Home"}>
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <span className="navbar-brand">Code2College Connect</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbarCollapse" aria-controls="mainNavbarCollapse" aria-expanded="false" aria-label="Toggle Main navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNavbarCollapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LogIn">LogIn Page</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                  <div className="dropdown-menu" aria-labelledby="dropdown04">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </li>
              </ul>
              <form className="form-inline my-2 my-md-0">
                <input className="form-control" type="text" placeholder="Search"/>
              </form>
            </div>
          </nav>

          <Route exact path="/" component={()=>(<LandingPage/>)} />
          <Route path="/LogIn" component={()=>(<LogInPage/>)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default AppFrame;
