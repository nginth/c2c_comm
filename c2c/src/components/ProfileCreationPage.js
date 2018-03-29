import React, { Component } from 'react';

import Form from 'react-jsonschema-form';

/* Custom array template to go around form rendering errors with Bootstrap4 */
import ArrayFieldTemplate from './c2cArrayFieldTemplate.js';

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
      "required": ["name", "email"],
      "properties": {
        "name": {"type": "string", "title": "Name"},
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
  }
};


/* Based on bootstrap page */
class ProfileCreationPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-container">
        <div className="container content-container pb-5">
          <div className="py-5 text-center">
            <img className="profile-creation-header-logo" src="//code2college.org/wp-content/uploads/2017/02/c2c.png" alt="Code to college logo"/>
            <h2 className="c2c-header">Create Your Profile</h2>
            <p className="c2c-text">Create your Code2College Connect profile by completing the following form.</p>
          </div>
          <hr/>
          <div className="">
            <Form schema={schema}
                  uiSchema={uiSchema}
                  ArrayFieldTemplate={ArrayFieldTemplate}
                  onSubmit={(a)=>{console.log(JSON.stringify(a.formData));}} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCreationPage;