import React, { Component } from 'react';

import Form from 'react-jsonschema-form';

/* Custom array template to go around form rendering errors with Bootstrap4 */
import ArrayFieldTemplate from './c2cArrayFieldTemplate.js';

import ClearLogo from './assets/C2C_logo_clear.png';

/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ProfileCreationPage.css';

/* Schema for form https://github.com/mozilla-services/react-jsonschema-form 
Note: Bug with array buttons persists. Possible bootstrap incompat */
const schema = {
  "title": "",
  "type": "object",
  "properties": {
    "basic": {
      "type": "object",
      "title": "Basic Information",
      "required": ["username", "password", "email", "firstName", "lastName"],
      "properties": {
        "username": {"type": "string", "title": "Username"},
        "password": {"type": "string", "title": "Password"},
        "firstName" : {"type" : "string", "title": "First Name"},
        "lastName" : {"type" : "string", "title": "Last Name"},
        "email": {"type": "string", "title": "Email", "format": "email"},
        "avatar": {"type": "string", "title": "Profile Picture", "format": "data-url"},
        "employer": {"type": "string", "title": "Current Employer"},
        "school": {"type": "string", "title": "Current School"}
      }
    },
    "about": {
      "type": "object",
      "title": "About You",
      "properties": {
        "bio": {"type": "string", "title": "Bio"},
        "interests": {"type": "array", "title": "Interests", "items": { "type": "string" }}
      }
    },
    "social": { 
      "type": "object",
      "title": "Social Media", 
      "properties": {
        "facebook": {"type": "string", "title": "Facebook", "format": "uri"},
        "linkedin": {"type": "string", "title": "LinkedIn", "format": "uri"},
        "twitter": {"type": "string", "title": "Twitter", "format": "uri"},
        "github": {"type": "string", "title": "Github", "format": "uri"},
        "website": {"type": "string", "title": "Personal Site/Porfolio", "format": "uri"}
      }
    },
    "c2c": {
      "type": "object",
      "title": "Code2College Information",
      "required": ["graduation", "workshop", "volunteer", "internships"],
      "properties": {
        "graduation": {"type": "number", "minimum": 2016, "maximum": 2050, "title": "Code2College Graduation Year"},
        "workshop": {"type": "string", "title": "Favorite C2C Workshop"},
        "volunteer": {"type": "string", "title": "Favorite C2C Volunteer"},
        "internships": {
          "type": "array", 
          "title": "C2C Internships",
          "items": {
            "type": "object",
            "properties": {
              "host": {
                "type": "string",
                "title": "Internship Host"
              },
              "year": {
                "type": "number",
                "minimum": 2016, 
                "maximum": 2050,
                "title": "Internship Year"
              }
            }
          }
        }
      }
    },
    "highschool": {
      "type": "object",
      "title": "Highschool Information",
      "properties": {
        "name": {"type": "string", "title": "Highschool Name"},
        "graduation": {"type": "number", "minimum": 1950, "maximum": 2050, "title": "Graduation Year"}
      }
    }
  }
};

// Style schema (will be greatly expanded with styling)
const uiSchema = {
  "about": {
    "bio": {
      "ui:widget": "textarea"
    }
  },
  "basic": {
    "password": {
      "ui:widget": "password",
      "ui:help": "Hint: Make it strong!"
    }
  }
};

/* Based on bootstrap page */
class ProfileCreationPage extends Component {

  constructor(props) {
    super(props);

    this.create_user = this.create_user.bind(this);
    this.edit_user = this.edit_user.bind(this);
  }

  create_user(data) {
    fetch('https://code-2-college-connect-api.herokuapp.com/api/users/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((resp) => resp.ok)
        .then(function(status) {
          if (status) {
            console.log(status);
          }
        }).catch(function(e) {
          console.error("Error: " + e);
        });
    console.log(JSON.stringify(data));
  }

  edit_user(data) {
    // fetch('https://code-2-college-connect-api.herokuapp.com/api/users/register', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // }).then((resp) => resp.ok)
    //     .then(function(status) {
    //       if (status) {
    //         console.log(status);
    //       }
    //     }).catch(function(e) {
    //       console.error("Error: " + e);
    //     });
    console.log("Just Edited user. " + JSON.stringify(data));
  }

  render() {
    return (
      <div className="top-container">
        <div className="container content-container pb-5">
          <div className="py-5 text-center">
            <img className="profile-creation-header-logo" src={ClearLogo} alt="Code to college logo"/>
            <h2 className="c2c-header">{this.props.isEdit ? "Edit Your Profile" : "Create Your Profile"}</h2>
            <p className="c2c-text">{this.props.isEdit ? "Make changes to your Code2College Connect profile by making changes in the following form." : "Create your Code2College Connect profile by completing the following form."}</p>
          </div>
          <hr/>
          <div className="">
            <Form schema={schema}
                  uiSchema={uiSchema}
                  ArrayFieldTemplate={ArrayFieldTemplate}
                  onSubmit={this.props.isEdit ? (a)=>{this.edit_user(a.formData)} : (a)=>{this.create_user(a.formData)}} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCreationPage;