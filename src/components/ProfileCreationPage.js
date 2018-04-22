import React, { Component } from 'react';

import Form from 'react-jsonschema-form';
import { CircleLoader } from 'react-spinners';

/* Custom array template to go around form rendering errors with Bootstrap4 */
import ArrayFieldTemplate from './c2cArrayFieldTemplate.js';

import ClearLogo from '../assets/C2C_logo_clear.png';

/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ProfileCreationPage.css';

/* Schema for form https://github.com/mozilla-services/react-jsonschema-form */
const schema = {
  "title": "",
  "type": "object",
  "properties": {
    "basic": {
      "type": "object",
      "title": "Basic Information",
      "required": ["username", "password", "school", "email", "firstName", "lastName", "expectedGrad"],
      "properties": {
        "username": {"type": "string", "title": "Username"},
        "password": {"type": "string", "title": "Password"},
        "firstName" : {"type" : "string", "title": "First Name"},
        "lastName" : {"type" : "string", "title": "Last Name"},
        "email": {"type": "string", "title": "Email", "format": "email"},
        "avatar": {"type": "string", "title": "Profile Picture", "format": "data-url"},
        "employer": {"type": "string", "title": "Current Employer"},
        "school": {"type": "string", "title": "Current School"},
        "expectedGrad": {"type": "number", "minimum": 1950, "maximum": 2060, "title": "(Expected) College Graduation Year"}
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

const editSchema = {
  "title": "",
  "type": "object",
  "properties": {
    "basic": {
      "type": "object",
      "title": "Basic Information",
      "required": ["email", "firstName", "school", "lastName", "expectedGrad"],
      "properties": {
        "firstName" : {"type" : "string", "title": "First Name"},
        "lastName" : {"type" : "string", "title": "Last Name"},
        "email": {"type": "string", "title": "Email", "format": "email"},
        "avatar": {"type": "string", "title": "Profile Picture", "format": "data-url"},
        "employer": {"type": "string", "title": "Current Employer"},
        "school": {"type": "string", "title": "Current School"},
        "expectedGrad": {"type": "number", "minimum": 1950, "maximum": 2060, "title": "(Expected) College Graduation Year"}
      }
    },
    "about": {
      "type": "object",
      "title": "About You",
      "properties": {
        "bio": {"type": "string", "title": "Bio"}
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

    this.state = {
      loading: false
    };

    this.create_user = this.create_user.bind(this);
    this.edit_user = this.edit_user.bind(this);
    this.loadingStatus = this.loadingStatus.bind(this);
  }

  loadingStatus(status) {
    this.setState({loading:status});
  }

  create_user(data, historyObj) {
    let loadingCallback = this.loadingStatus;

    loadingCallback(true);
    fetch('https://code-2-college-connect-api.herokuapp.com/api/users/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((resp) => {
       loadingCallback(false);
      if (resp.ok) {
        // Redirect to login
        historyObj.push('/LogIn');
      }
      // Handle bad password or username
      else if (resp.status != 200) {
        console.log("Error making call status: " + resp.status);
      }
    }).catch(function(e) {
          console.error("Error: " + e);
        });
  }

edit_user(data, historyObj) {
    let callback = this.props.editDataCallBack;
    let loadingCallback = this.loadingStatus;

    loadingCallback(true);
    fetch('https://code-2-college-connect-api.herokuapp.com/api/users/edit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
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
          loadingCallback(false);
          if (responseJSON) {
            callback(responseJSON);
            historyObj.push('/Profile');
          }
        }).catch(function(e) {
          console.error("Error: " + e);
        });
  }

  render() {

    const createForm = (
      <Form schema={schema}
            uiSchema={uiSchema}
            ArrayFieldTemplate={ArrayFieldTemplate}
            onSubmit={(a)=>{this.create_user(a.formData, this.props.routeProps.history)}} />

    );

    const editForm = (
      <Form schema={editSchema}
            uiSchema={uiSchema}
            ArrayFieldTemplate={ArrayFieldTemplate}
            formData={this.props.userData}
            onSubmit={(a)=>{this.edit_user(a.formData, this.props.routeProps.history)}} />
    );

    return (
      <div className="top-container">
        <div className={this.state.loading ? "loading-div container pb-5" : "d-none"}>
          <div className="loading-spinner mx-auto">
            <CircleLoader size={150} color={'#FFFFFF'} loading={this.state.loading}/>
          </div>
        </div>
        <div className={this.state.loading ? "d-none" : "container content-container pb-5"}>
          <div className="py-5 text-center">
            <img className="profile-creation-header-logo" src={ClearLogo} alt="Code to college logo"/>
            <h2 className="c2c-header">{this.props.isEdit ? "Edit Your Profile" : "Create Your Profile"}</h2>
            <p className="c2c-text">{this.props.isEdit ? "Make changes to your Code2College Connect profile by making changes in the following form." : "Create your Code2College Connect profile by completing the following form."}</p>
          </div>
          <hr/>
          <div className="">
            {this.props.isEdit ? editForm : createForm}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCreationPage;