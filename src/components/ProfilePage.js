import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            "username": null,
            "firstName": null,
            "lastName": null,
            "profilePic": null,
            "bio": null,
            "email": null,
            "currentEmployer": null,
            "currentSchool": null,
            "highSchool": {
                "name": null,
                "graduationYear": null,
            },
            "socials": {
                "linkedin": null,
                "facebook": null,
                "twitter": null,
                "github": null
            },
            "c2c": {
                "favoriteVolunteer": null,
                "favoriteWorkshop": null,
                "graduationYear": null
            },
            "internships": []  
        }

    this.setUserData = this.setUserData.bind(this);
    this.getUser = this.getUser.bind(this);
    
  }

  componentDidMount() {
    this.getUser();
  }

  setUserData(data) {
    this.setState(data);
  }

  
  getUser() {

    let callback = this.setUserData;
    let id = this.props.id;

    fetch('https://code-2-college-connect-api.herokuapp.com/api/users/' + this.props.id, {
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
        }).catch(function(e) {
          console.error("Error: " + e);
        });
  }

  editProfile() {
    console.log("Hello");
  }

  render() {

    return (
      <div className="top-container">
        <div className="container profile-segment-top">
          <div className="profile-jumbo rounded jumbotron-fluid">
            <img className="profile-pic-jumbo rounded-circle" src={this.state.profilePic}/>
            <p className="profile-jumbo-title">{this.state.firstName} {this.state.lastName} <Link className={this.props.curUser === this.props.id ? "btn btn-primary" : "d-none"} to="/editProfile">Edit</Link></p>
            <p className="profile-jumbo-text">Works at {this.state.currentEmployer}</p>
            <p className="profile-jumbo-text">Goes to {this.state.currentSchool}</p>
          </div>
        </div>
        <div className="container profile-segment-a">
          <div className="card profile-display-card">
            <div className="card-body text-center">
              <p className="profile-card-header">Bio</p>
              <p className="profile-card-text">{this.state.bio}</p>
              <hr/>
              <p className="profile-card-header">Interests</p>
              <p className="profile-card-text">{this.state.interests}</p>
            </div>
          </div>
        </div>
        <div className="container profile-segment-a">
          <div className="card profile-display-card">
            <div className="card-body text-center">
              <p className="profile-card-header">C2C Graduation Year</p>
              <p className="profile-card-text">{this.state.c2c.graduationYear}</p>
              <hr/>
              <p className="profile-card-header">Highschool</p>
              <p className="profile-card-text">{this.state.highSchool.name}</p>
              <p className="profile-card-text">Graduation Year: {this.state.highSchool.graduationYear}</p>
              <hr/>
            </div>
          </div>
        </div>
        <div className="container profile-segment-a">
          <div className="card profile-display-card">
            <div className="card-body text-center">
              <p className="profile-card-header">Contact</p>
            </div>
            <ul className="list-group list-group-flush text-center">
              <li className="list-group-item">Email: {this.state.email ? this.state.email : "No Email Provided."}</li>
              <li className="list-group-item">Facebook: {this.state.socials.facebook ? this.state.socials.facebook : "No Facebook Provided."}</li>
              <li className="list-group-item">Twitter: {this.state.socials.twitter ? this.state.socials.twitter : "No Twitter Provided."}</li>
              <li className="list-group-item">LinkedIn: {this.state.socials.linkedIn ? this.state.socials.linkedIn : "No LinkedIn Provided."}</li>
              <li className="list-group-item">Github: {this.state.socials.github ? this.state.socials.github : "No Github Provided."}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;