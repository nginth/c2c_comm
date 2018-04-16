import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

import './App.css';

/* Components */
import LandingPage from './components/LandingPage.js';
import LogInPage from './components/LogInPage.js';
import ProfileCreationPage from './components/ProfileCreationPage.js';
import SearchPage from './components/SearchPage.js';
import HomePage from './components/HomePage.js';
import ProfilePage from './components/ProfilePage.js';

/* Assets */
import ClearLogo from './assets/C2C_logo_clear.png';

/* Future localization/Strings... Maybe? */
//import {ROUTER_BASENAME} from './Strings.js';

/* Bootstrap */
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';


class AppFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiText: 'not up yet',
      loggedIn: false,
      userData: {
        basic: {
          firstName: "Bloop"
        },
        id: 1
      }
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {}

  onSignIn(status, data) {
    this.setState({loggedIn: status, userData: data});
  }

  logOut() {
    this.setState({loggedIn: false});
    // this.setState({loggedIn: false, userData: null});
  }

  render() {
    const loggedInNav = 
    (<ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Profile">My Profile</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Search">Search</Link>
      </li>
    </ul>);

    const regularNav = 
      (<ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
      </ul>);

    return (
      <BrowserRouter basename={"/"}>
        <div className="global-font">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <span className="navbar-brand">Code2College Connect</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbarCollapse" aria-controls="mainNavbarCollapse" aria-expanded="false" aria-label="Toggle Main navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNavbarCollapse">
              {this.state.loggedIn ? loggedInNav : regularNav}
              <button className={this.state.loggedIn ? "btn btn-danger btn-small" : "d-none"} onClick={() => {this.logOut();}}>Log out</button>
            </div>
          </nav>

          <Route exact path="/" component={()=>(this.state.loggedIn ? <Redirect to="/Home" /> : <LandingPage/>)} />
          <Route path="/LogIn" component={()=>(this.state.loggedIn ? <Redirect to="/Home" /> : <LogInPage isLoggedIn={this.state.loggedIn} loginDataCallBack={this.onSignIn} />)} />
          <Route path="/Home" component={()=>(this.state.loggedIn ? <HomePage id={this.state.userData.id} name={this.state.userData.basic.firstName}/> : <Redirect to="/LogIn"/>)} />
          <Route path="/CreateProfile" component={(routeProps)=>(<ProfileCreationPage routeProps={routeProps}/>)} />
          <Route path="/Search" component={()=>(this.state.loggedIn ? <SearchPage/> : <Redirect to="/LogIn" />)} />
          <Route path="/Profile" component={()=>(this.state.loggedIn ? <ProfilePage curUser={this.state.userData.id} id={this.state.userData.id}/> : <Redirect to="/LogIn" />)} />
          <Route path="/ViewProfile/:id" component={(routeProps)=>(this.state.loggedIn ? <ProfilePage curUser={this.state.userData.id} id={routeProps.match.params.id} /> : <Redirect to="/LogIn" />)} />
          <Route path="/EditProfile" component={()=>(this.state.loggedIn ? <ProfileCreationPage isEdit={true} userData={this.state.userData} id={this.state.userData.id}/> : <Redirect to="/LogIn"/>)} />
          <footer className="container-fluid footer-container">
            <div className="row py-3">
              <div className="col-sm-4 col-lg-4 col-md-4 text-center" >
                <img className="footer-logo" src={ClearLogo} alt="Code to College logo"/>
                <small className="d-block mb-3 text-muted">© 2017-2018</small>
              </div>
              {/*  style={{marginLeft: 5+'px', marginRight:5+'px', padding:0+'px'}} */}
              <div className="col-sm-4 col-lg-4 col-md-4 text-center">
                <h5>Contact Code2College</h5>
                <p className="footer-text" style={{marginBottom:20+'px'}}>
                19112 Leigh Lane, Pflugerville TX 78660<br/>
                (512) 790-2633<br/>
                matt@code2college.org 
                </p>
              </div>
              <div className="col-sm-4 col-lg-4 col-md-4 text-center">
              <h5>Connect</h5>
                <p>
                  <a href="https://www.facebook.com/code2college/">Facebook</a> · <a href="https://twitter.com/code2college">Twitter</a> · <a href="https://www.instagram.com/code2college/">Instagram</a>
                </p>
              </div>
            </div>
            <div className="text-muted">
              <p>Made with love by Viet, Nick, Hamza, Bhavish and Alex.</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppFrame;
