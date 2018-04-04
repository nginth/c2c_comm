import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

/* Components */
import LandingPage from './components/LandingPage.js';
import LogInPage from './components/LogInPage.js';
import ProfileCreationPage from './components/ProfileCreationPage.js';
import SearchPage from './components/SearchPage.js';
import HomePage from './components/HomePage.js';
import ProfilePage from './components/ProfilePage.js';

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

    this.state = {apiText: 'not up yet'};
  }

  componentDidMount() {
    fetch('https://code-2-college-connect-api.herokuapp.com/api')
      .then(resp => resp.text())
      .then(text => this.setState({apiText: text}))
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
                  <Link className="nav-link" to="/Home">Logged in Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/CreateProfile">Create Profile Page</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Profile">Profile Page</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Search">Search</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route exact path="/" component={()=>(<LandingPage/>)} />
          <Route path="/LogIn" component={()=>(<LogInPage/>)} />
          <Route path="/Home" component={()=>(<HomePage name={"Alex"}/>)} />
          <Route path="/CreateProfile" component={()=>(<ProfileCreationPage/>)} />
          <Route path="/Search" component={()=>(<SearchPage/>)} />
          <Route path="/Profile" component={()=>(<ProfilePage />)} />

          <footer className="container-fluid footer-container">
            <div className="row py-3">
              <div className="col-4">
                <img className="footer-logo" src="//code2college.org/wp-content/uploads/2017/02/c2c.png" alt="Code to College logo"/>
                <small className="d-block mb-3 text-muted">© 2017-2018</small>
              </div>
              <div className="col-4">
                <h5>Contact Code2College</h5>
                <p className="footer-text">
                19112 Leigh Lane, Pflugerville TX 78660<br/>
                (512) 790-2633<br/>
                matt@code2college.org 
                </p>
              </div>
              <div className="col-4">
              <h5>Connect</h5>
                <p>
                  <a href="https://www.facebook.com/code2college/">Facebook</a> · <a href="https://twitter.com/code2college">Twitter</a> · <a href="https://www.instagram.com/code2college/">Instagram</a>
                </p>
              </div>
            </div>
            <div className="text-muted">
              <p>Made with love by Viet, Nick, Hamza, Bhavish and Alex. Special thanks to C2C website designer Issac C. for design inspiration.</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppFrame;