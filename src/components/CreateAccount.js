import React, { Component } from 'react';



/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/CreateAccount.css';

/* 
  Using React Jschema Forms (npm react-jsonschema-form) 
  https://github.com/mozilla-services/react-jsonschema-form
*/
class CreateAccount extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-container">
      	<div className="landing-jumbotron jumbotron jumbotron-fluid">
      	  <div className="container">
      	  	<p className="jumbo-title">Code2College Connect</p>
      	  	<p className="jumbo-subtitle">A place of growth and opportunity.</p>
      	  </div>
      	</div>
        <div className="landing-info container">
          <div className="row">
            <div className="col-md-4">
              <img className="rounded-circle landing-info-img" src="https://code2college.org/wp-content/uploads/2017/02/Code2College_10-01.jpg"/>
              <h2>Heading</h2>
              <p className="c2c-text">This is one info thing</p>
            </div>
            <div className="col-md-4">
              <img className="rounded-circle landing-info-img" src="https://code2college.org/wp-content/uploads/2017/02/Code2College_10-01.jpg"/>
              <h2>Heading</h2>
              <p className="c2c-text">This is another info thing</p>
            </div>
            <div className="col-md-4">
              <img className="rounded-circle landing-info-img" src="https://code2college.org/wp-content/uploads/2017/02/Code2College_10-01.jpg"/>
              <h2>Heading</h2>
              <p className="c2c-text">This is yet another info thing</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;