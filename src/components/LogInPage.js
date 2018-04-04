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

    this.login = this.login.bind(this);
  }

  /* Calls the API with user submitted username and password */
  login(event) {
    event.preventDefault();

    var data = { 'username': this.username.value, 'password': this.password.value }

    fetch('https://code-2-college-connect-api.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((resp) => resp)
        .then(function(resp) {
          if (resp.ok) {
            console.log("Login call success. Data: " + JSON.stringify(resp.json()));
            () => {this.props.loginData(resp.json());}
          }
        }).catch(function(e) {
          console.error("Error: " + e);
        });
    // console.log(JSON.stringify(data));
  }


  render() {
    return (
      <div className="top-container">
        <div className={this.props.isLoggedIn ? "d-none" : "alert alert-danger login-alert text-center"} role="alert">
          <p className="c2c-text">Please login with your username and password. If forgotten, contact the administrator.</p>
        </div>
      	<form className="form-signin text-center content-container" onSubmit={this.login}>
          <img className="landing-info-img" src="//code2college.org/wp-content/uploads/2017/02/c2c.png"/>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputusername" className="sr-only">Username</label>
          <input ref={(input) => this.username = input} type="username" id="username" className="form-control" placeholder="username" required=""/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input ref={(input) => this.password = input} type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
          {/* <input type="text" ref={(input) => this.input = input} /> */}

          <br/>
          <button className="btn btn-lg btn-primary btn-block" type="rok" >Sign in</button>
          <br/>
          <p className="c2c-text">© 2017-2018</p>
        </form>
      </div>
    );
  }
}

export default LogInPage;