import React, { Component } from 'react';

import { Link } from 'react-router-dom';


/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/HomePage.css';

/* From columns to cards? */
class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-container no-padding">
      	<div className="jumbotron jumbotron-fluid c2c-jumbo home-jumbo">
      	  <div className="container">
      	  	<p className="jumbo-title-pretty jumbo-title home-jumbo-title">Welcome, {this.props.name}.</p>
      	  </div>
      	</div>
        <div className="home-container container">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <h2>Search</h2>
              <p>Find other C2C members and alumni with similar interests and skills.</p>
              <p><Link className="btn btn-secondary" to="/Search">Go to Search</Link></p>
            </div>
            <div className="col-sm-12 col-lg-6">
              <h2>My Profile</h2>
              <p>View your C2C profile.</p>
              <p><Link className="btn btn-secondary" to="/Profile">View Profile</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;