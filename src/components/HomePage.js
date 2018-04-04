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
      	<div className="home-jumbotron jumbotron jumbotron-fluid">
      	  <div className="container">
      	  	<p className="home-jumbo-title jumbo-title">Welcome, {this.props.name}.</p>
      	  </div>
      	</div>
        <div className="landing-info container">
          <div className="row">
            <div class="col-sm-12 col-lg-6">
              <h2>Search</h2>
              <p>Find other C2C members and alumni with similar interests and skills.</p>
              <p><Link className="btn btn-secondary" to="/Search">Go to Search</Link></p>
            </div>
            <div class="col-sm-12 col-lg-6">
              <h2>My Profile</h2>
              <p>View your C2C profile.</p>
              <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;