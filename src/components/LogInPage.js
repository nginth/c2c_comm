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
    this.state = {
      failedAttempt: false
    }
    this.login = this.login.bind(this);
    this.failedAttempt = this.failedAttempt.bind(this);
  }

  failedAttempt() {
    this.setState({failedAttempt: true});
  }

  /* Calls the API with user submitted username and password */
  login(event) {
    event.preventDefault();

    let callback = this.props.loginDataCallBack;
    let failedAttempt = this.failedAttempt;

    var data = { 'username': this.username.value, 'password': this.password.value }

    // fetch('http://localhost:5001/api/users/login', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }).then((resp) => resp)
    //     .then(function(resp) {
    //       if (resp.ok) {
    //         console.log("Login call success. Data: " + resp.body + " status " + resp.status + " text " + resp.statusText);
    //         console.log(resp.json());
    //         //callback(true, resp.json());
    //         callback(true, {id: 1, name: 'Default McDefault'});
    //       } 
    //       /* Handle bad password or username */
    //       else if (resp.status != 200) {
    //         console.log("Uh oh " + resp.status);
    //         failedAttempt();
    //       }
    //     }).catch(function(e) {
    //       console.error("Error: " + e);
    //     });

    fetch('https://code-2-college-connect-api.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      // Handle bad password or username
      else if (resp.status != 200) {
        console.log("Uh oh " + resp.status);
        failedAttempt();
      }
    }).then((responseJSON) => {
        // If the login was valid
        if(!this.state.failedAttempt) {
          console.log(responseJSON);
          callback(true, responseJSON);
        }
      }).catch(function(e) {
          console.error("Error: " + e);
        });
    //console.log(JSON.stringify(data));
  }


  render() {
    return (
      <div className="top-container">
        <div className={!this.props.isLoggedIn && this.state.failedAttempt ? "alert alert-danger login-alert text-center" : "d-none"} role="alert">
          <p className="c2c-text">Please login with your username and password. If forgotten, contact the administrator.</p>
        </div>
      	<form className="form-signin text-center content-container" onSubmit={this.login}>
          <img className="landing-info-img" src="//code2college.org/wp-content/uploads/2017/02/c2c.png"/>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputusername" className="sr-only">Username</label>
          <input ref={(input) => this.username = input} type="username" id="username" className="form-control" placeholder="Username" required=""/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input ref={(input) => this.password = input} type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
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