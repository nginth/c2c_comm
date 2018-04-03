import React, { Component } from 'react';


/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ProfilePage.css';
import edit from '../edit.svg';

/* Based on bootstrap page */
class ProfilePage extends Component {

  // Constructor where the state is initally set for variables related to a User
  constructor(props) {
    super(props);
    this.state = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      bio: "Founder of Company X",
      progGradYear: "2016",
      twitter: "",
      facebook: "",
      linkedIn: "",
      pinterest: "",
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
    this.setActiveTab = this.setActiveTab.bind(this)
  }

  setActiveTab(id) {
    this.setState({isActive: id})
  }

  componentDidMount() {
    fetch('http://127.0.0.1:5001/api/get_user')
      .then(function(response) {
        return response.json();
      }).then(result => {
        console.log(result);
        this.setState({bio: result.username});
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
      <div>
        <div className="top-container">
          <div className="container content-container pb-5">
            <div className="row">
              <div className="left col-md-4">
                <img className="profile-pic" src="https://specials-images.forbesimg.com/imageserve/59d5062131358e542c034eb7/416x416.jpg?background=000000&cropX1=419&cropX2=1409&cropY1=53&cropY2=1044" alt="Profile Pic"/>
              </div>
              <div className="align-text">
                <h2 className="name">{this.state.name} <a href={this.state.instagram}><img src={edit} height="16" width="16" onClick={this.editProfile}/></a></h2>
                <p>{this.state.email}</p>
                  <p className="p2">{this.state.currentEmployer}</p>
                    <p className="p2">{this.state.currentSchool}</p> 
          
                <div className="tab">
                  <ul className="nav nav-tabs">
                      {tabs}
                  </ul>
                  <div className="tab-content tabs">
                      <div className="tab-pane active" id="Section1">
                        <p><strong>Biography:</strong> {this.state.bio}</p>
                      </div>
                      <div className="tab-pane fade" id="Section2">
                        <p>{this.state.internships}</p>
                      </div>
                      <div className="tab-pane fade" id="Section3">
                        <p>{this.state.interests}</p>
                      </div>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href={this.state.twitter}>
                  <img title="Twitter" alt="Twitter" src="https://socialmediawidgets.files.wordpress.com/2014/03/01_twitter.png" width="35" height="35" />
                </a>
                <a href={this.state.pinterest}>
                  <img title="Pinterest" alt="Pinterest" src="https://socialmediawidgets.files.wordpress.com/2014/03/13_pinterest.png" width="35" height="35" />
                </a>
                <a href={this.state.facebook}>
                  <img title="Facebook" alt="Facebook" src="https://socialmediawidgets.files.wordpress.com/2014/03/02_facebook.png" width="35" height="35" />
                </a>
                <a href={this.state.linkedIn}>
                  <img title="LinkedIn" alt="LinkedIn" src="https://socialmediawidgets.files.wordpress.com/2014/03/07_linkedin.png" width="35" height="35" />
                </a>
                <a href={this.state.instagram}>
                      <img title="Instagram" alt="RSS" src="https://socialmediawidgets.files.wordpress.com/2014/03/10_instagram.png" width="35" height="35" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="top-container">
          <div className="container content-container pb-5">
            <h1>Maybe other important stuff in diff containers</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;