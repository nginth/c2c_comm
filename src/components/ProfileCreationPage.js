import React, { Component } from 'react';



/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ProfileCreationPage.css';


/* Based on bootstrap page */
class ProfileCreationPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-container">
        <div className="container content-container pb-5">
          <div className="py-5 text-center">
            <img className="profile-creation-header-logo" src="//code2college.org/wp-content/uploads/2017/02/c2c.png" alt="Code to college logo"/>
            <h2 className="c2c-header">Create Your Profile</h2>
            <p className="c2c-text">Create your Code2College Connect profile by completing the following form.</p>
          </div>
          <hr/>
          <div className="text-center">
            <h1 className="c2c-header">Form goes here! (Once I know the fields)</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCreationPage;