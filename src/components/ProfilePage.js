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
      name: "John Doe",
      email: "john.doe@gmail.com",
      bio: "Founder of Company X",
      c2cGraduation: "2016",
      twitter: "",
      facebook: "",
      linkedIn: "",
      instagram: "",
      currentEmployer: "Currently CEO at Company X",
      currentSchool: "University of Texas at Austin",
      interests: "Interest 1, Interest 2, etc..",
      highSchool: "",
      highSchoolGradYear: "",
      favVolunteer: "",
      favWorkshop: "",
      internships: "Intern at Company Z for 2016 Summer",
      internshipYears: "",
      isActive: 1
    };

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
    //let id = this.props.id;
    let id = 1;
    let token = 0;
    // fetch('https://code-2-college-connect-api.herokuapp.com/api/users/' + this.props.id, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // }).then((resp) => resp)
    //     .then(function(resp) {
    //       if (resp.ok) {
    //         console.log("Get user " + id + ". Data: " + resp.body + " status " + resp.status + " text " + resp.statusText);
            
    //         //callback(resp.json());
    //         callback({
    //           name: "John Doe",
    //           email: "john.doe@gmail.com",
    //           bio: "Founder of Company X",
    //           c2cGraduation: "2016",
    //           twitter: "",
    //           facebook: "",
    //           linkedIn: "",
    //           instagram: "",
    //           currentEmployer: "Currently CEO at Company X",
    //           currentSchool: "University of Texas at Austin",
    //           interests: "Interest 1, Interest 2, etc..",
    //           highSchool: "",
    //           highSchoolGradYear: "",
    //           favVolunteer: "",
    //           favWorkshop: "",
    //           internships: "Intern at Company Z for 2016 Summer",
    //           internshipYears: "",
    //           isActive: 1
    //         });
    //       } 
    //       /* Error! */
    //       else if (resp.status != 200) {
    //         console.log("Uh oh " + resp.status);
    //       }
    //     }).catch(function(e) {
    //       console.error("Error: " + e);
    //     });

    /* Mock Data */
    this.setUserData({
              name: "John Doe",
              email: "john.doe@gmail.com",
              bio: "Founder of Company X",
              c2cGraduation: "2016",
              twitter: "",
              facebook: "",
              linkedIn: "",
              instagram: "",
              currentEmployer: "Currently CEO at Company X",
              currentSchool: "University of Texas at Austin",
              interests: "Interest 1, Interest 2, etc..",
              highSchool: "",
              highSchoolGradYear: "",
              favVolunteer: "",
              favWorkshop: "",
              internships: "Intern at Company Z for 2016 Summer",
              internshipYears: "",
              isActive: 1
            });
  }

  editProfile() {
    console.log("Hello");
  }

  render() {

    //  An array that contains information about each tab for the Profile page
    const items = [
      {id: 1, name: 'About', text: 'text', value: '#Section1', key: '1'},
      {id: 2, name: 'Experience', text: 'text', value: '#Section2', key: '2'},
      {id: 3, name: 'Interests', text: 'text', value: '#Section3', key: '3'},
    ]

    // Maps the items array to create the corresponding tags to render
    const tabs = items.map(item =>
      <li className={this.state.isActive === item.id ? 'active' : ''} key={item.key} onClick={() => this.setActiveTab(item.id)}><a href={item.value} data-toggle="tab">{item.name}</a></li>
    )

    return (
      <div className="top-container">
        <div className="container profile-segment-top">
          <div className="profile-jumbo rounded jumbotron-fluid">
            <img className="profile-pic-jumbo rounded-circle" src="https://specials-images.forbesimg.com/imageserve/59d5062131358e542c034eb7/416x416.jpg?background=000000&cropX1=419&cropX2=1409&cropY1=53&cropY2=1044"/>
            <p className="profile-jumbo-title">{this.state.name} <Link className="btn btn-primary" to="/editProfile">Edit</Link></p>
            <p className="profile-jumbo-text">Works at {this.state.currentEmployer}</p>
            <p className="profile-jumbo-text">Goes to {this.state.currentSchool}</p>
          </div>
        </div>
        <div className="container profile-segment-a">
          <div className="card profile-display-card">
            <div className="card-body text-center">
              <p className="profile-card-header">C2C Graduation Year</p>
              <p className="profile-card-text">{this.state.c2cGraduation}</p>
              <hr/>
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
              <p className="profile-card-header">Contact</p>
            </div>
            <ul class="list-group list-group-flush text-center">
              <li class="list-group-item">Email: {this.state.email ? this.state.email : "No Email Provided."}</li>
              <li class="list-group-item">Facebook: {this.state.facebook ? this.state.facebook : "No Facebook Provided."}</li>
              <li class="list-group-item">Twitter: {this.state.twitter ? this.state.twitter : "No Twitter Provided."}</li>
              <li class="list-group-item">LinkedIn: {this.state.linkedIn ? this.state.linkedIn : "No LinkedIn Provided."}</li>
              <li class="list-group-item">Instagram: {this.state.Instagram ? this.state.Instagram : "No Instagram Provided."}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;