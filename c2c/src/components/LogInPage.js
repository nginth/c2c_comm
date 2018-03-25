import React, { Component } from 'react';



/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/LogInPage.css';

/* Based on bootstrap page */
class LogInPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-container">
      	<form className="form-signin text-center content-container">
          <img className="landing-info-img" src="//code2college.org/wp-content/uploads/2017/02/c2c.png"/>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
          <br/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <br/>
          <p className="c2c-text">© 2017-2018</p>
        </form>
      </div>
    );
  }
}

export default LogInPage;