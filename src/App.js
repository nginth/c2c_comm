import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

/* Components */
import LandingPage from './components/LandingPage.js';
import LogInPage from './components/LogInPage.js';
import ProfileCreationPage from './components/ProfileCreationPage.js'

/* Future localization/Strings... Maybe? */
//import {ROUTER_BASENAME} from './Strings.js';

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
  constructor(props) {
    super(props);

    this.state = {api: 'not up yet'};
  }

  componentDidMount() {
    fetch('http://localhost:5001/api')
      .then(resp => resp.text())
      .then(text => this.setState({api: text}))
      .catch(err => console.log(err))
  }

  componentWillUnmount() {}

  render() {
    return (
      <BrowserRouter basename={"/"}>
        <div className="global-font">
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
                <li className="nav-item">
                  <Link className="nav-link" to="/CreateProfile">Create Profile Page</Link>
                </li>
              </ul>
              <form className="form-inline my-2 my-md-0">
                <input className="form-control" type="text" placeholder="Search"/>
              </form>
            </div>
          </nav>

          <Route exact path="/" component={()=>(<LandingPage/>)} />
          <Route path="/LogIn" component={()=>(<LogInPage/>)} />
          <Route path="/CreateProfile" component={()=>(<ProfileCreationPage/>)} />

          <footer className="container py-5">
            <div className="row">
              <div className="col-12 col-md">
                <img className="footer-logo" src="//code2college.org/wp-content/uploads/2017/02/c2c.png" alt="Code to College logo"/>
                <small className="d-block mb-3 text-muted">© 2017-2018</small>
              </div>
              <div className="col-6 col-md">
                <h5>Footer Content 1</h5>
                <p className="footer-text">{this.state.api}</p>
              </div>
              <div className="col-6 col-md">
                <h5>Footer Content 2</h5>
                <p className="footer-text">Some content</p>
              </div>
              <div className="col-6 col-md">
                <h5>Footer Content 3</h5>
                <p className="footer-text">Some content</p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppFrame;
