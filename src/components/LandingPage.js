import React, { Component } from 'react';

import { Link } from 'react-router-dom';


/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/LandingPage.css';

/* Assets */
import BlueSymbol from '../assets/C2C_symbol.jpg';

/* From columns to cards? */
class LandingPage extends Component {

  render() {
    return (
      <div className="top-container no-padding">
      	<div className="jumbotron jumbotron-fluid c2c-jumbo landing-jumbo">
      	  <div className="container">
      	  	<p className="jumbo-title-pretty jumbo-title">Code2College Connect</p>
      	  	<p className="jumbo-subtitle-pretty jumbo-subtitle">A place of growth and opportunity.</p>
            <Link className="btn btn-primary landing-login-btn" to="/LogIn">Sign In</Link>
            <p className="landing-muted-white">or<br/><a><Link className="landing-muted-white" to="/CreateProfile">Create Account</Link></a></p>
      	  </div>
      	</div>
        <div className="landing-info container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <img className="rounded-circle landing-info-img" alt="C2C logo" src={BlueSymbol}/>
              <h2 className="c2c-header">Connect</h2>
              <p className="c2c-text">Meet Code2College members past and present to open new pathways to opportunity.</p>
            </div>
            <div className="col-lg-4 col-md-12">
              <img className="rounded-circle landing-info-img" alt="C2C logo" src={BlueSymbol}/>
              <h2 className="c2c-header">Learn</h2>
              <p className="c2c-text">Learn new skills and improve current ones by participating in technical conversations.</p>
            </div>
            <div className="col-lg-4 col-md-12">
              <img className="rounded-circle landing-info-img" alt="C2C logo" src={BlueSymbol}/>
              <h2 className="c2c-header">Stay in Touch</h2>
              <p className="c2c-text">Keep up to date with old friends and Code2College news.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;