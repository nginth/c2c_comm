import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';

/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ProfilePage.css';
// import edit from '../edit.svg';

/* Based on bootstrap page */
class ProfilePage extends Component {

  // Constructor where the state is initally set for variables related to a User
  constructor(props) {
    super(props);

    this.state = {
      "id": null,
      "basic": {
        "username": null,
        "firstName": null,
        "email": null,
        "lastName": null,
        "employer": null,
        "school": null,
        "avatar": null,
        "expectedGrad": null
      },
      "about": {
        "bio": null, 
        "interests": null

      },
      "highschool": {
        "name": null,
        "graduation": null
      },
      "social": {
        "linkedin": null,
        "facebook": null,
        "twitter": null,
        "github": null
      },
      "c2c": {
        "volunteer": null,
        "workshop": null,
        "graduation": null,
        "internships": []
      },
      "loading": false
    };

    this.setUserData = this.setUserData.bind(this);
    this.getUser = this.getUser.bind(this);
    this.loadingStatus = this.loadingStatus.bind(this);    
  }

  componentDidMount() {
    this.getUser();
  }

  setUserData(data) {
    this.setState(data);
  }

  loadingStatus(status) {
    this.setState({loading:status});
  }

  getUser() {

    let callback = this.setUserData;
    let loadingCallback = this.loadingStatus;
    let id = this.props.id;

    loadingCallback(true);
    fetch(process.env.REACT_APP_API + '/api/users/' + this.props.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((resp) => resp)
        .then(function(resp) {
          if (resp.ok) {
            return resp.json();
          } 
          /* Error! */
          else if (resp.status != 200) {
            console.log("Error making call status: " + resp.status);
            return null;
          }
        }).then((responseJSON) => {
          if (responseJSON) {
            callback(responseJSON);
          }
          loadingCallback(false);
        }).catch(function(e) {
          console.error("Error: " + e);
        });
  }

  render() {

    return (
      <div className="top-container">
        <div className={this.state.loading ? "loading-div profile-segment-top profile-loading container" : "d-none"}>
          <div className="loading-spinner profile-loading-spinner mx-auto">
            <CircleLoader size={150} color={'#FFFFFF'} loading={this.state.loading}/>
          </div>
        </div>
        <div className={this.state.loading ? "d-none" : ""}>
          <div className="container profile-segment-top">
            <div className="profile-jumbo rounded jumbotron-fluid">
              <img className="profile-pic-jumbo rounded-circle" src={this.state.basic.avatar}/>
              <p className="profile-jumbo-title">{this.state.basic.firstName} {this.state.basic.lastName} <Link className={this.props.curUser === this.props.id ? "btn btn-primary" : "d-none"} to="/EditProfile">Edit</Link></p>
              <p className={this.state.basic.employer ? "profile-jumbo-text" : "d-none"}>Works at {this.state.basic.employer}</p>
              <p className="profile-jumbo-text">Goes to {this.state.basic.school}</p>
              <p className="profile-jumbo-text">Graduation Year: {this.state.basic.expectedGrad}</p>
            </div>
          </div>
          <div className="container profile-segment-a">
            <div className="card profile-display-card">
              <div className="card-body text-center">
                <p className="profile-card-header">Bio</p>
                <p className="profile-card-text">{this.state.about.bio}</p>
                <hr/>
                <p className="profile-card-header">Interests</p>
                <p className="profile-card-text">{this.state.about.interests}</p>
              </div>
            </div>
          </div>
          <div className="container profile-segment-a">
            <div className="card profile-display-card">
              <div className="card-body text-center">
                <p className="profile-card-header">C2C Graduation Year</p>
                <p className="profile-card-text">{this.state.c2c.graduation}</p>
                <hr/>
                <p className="profile-card-header">Highschool</p>
                <p className="profile-card-text">{this.state.highschool.name}</p>
                <p className="profile-card-text">Graduation Year: {this.state.highschool.graduation}</p>
              </div>
            </div>
          </div>
          <div className="container profile-segment-a">
            <div className="card profile-display-card">
              <div className="card-body text-center">
                <p className="profile-card-header">Contact</p>
              </div>
              <ul className="list-group list-group-flush text-center">
                <li className="list-group-item">Email: {this.state.basic.email ? this.state.basic.email : "No Email Provided."}</li>
                <li className="list-group-item">Facebook: {this.state.social.facebook ? this.state.social.facebook : "No Facebook Provided."}</li>
                <li className="list-group-item">Twitter: {this.state.social.twitter ? this.state.social.twitter : "No Twitter Provided."}</li>
                <li className="list-group-item">LinkedIn: {this.state.social.linkedin ? this.state.social.linkedin : "No LinkedIn Provided."}</li>
                <li className="list-group-item">Github: {this.state.social.github ? this.state.social.github : "No Github Provided."}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;