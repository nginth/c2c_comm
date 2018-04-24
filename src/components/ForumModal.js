import React, { Component } from 'react';

import { Link } from 'react-router-dom';


/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ForumModal.css';

/* Assets */
import BlueSymbol from '../assets/C2C_symbol.jpg';

class ForumModal extends Component {
  constructor(props) {
    super(props);

    this.handleAddPost = this.handleAddPost(this);
    this.handleDeletePost = this.handleDeletePost(this);
    this.handleEditPost = this.handleEditPost(this);
  }

  handleAddPost(event) {
    event.preventDefault();
    
    let data = {"title": this.postTitle, "content": this.postContent, "uID": this.props.userId};

    let callback = this.props.setNewThread;
    fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/add' + this.props.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((resp) => {
      if (resp.ok) {
        callback(data);
        return resp.json();
      }
      // Handle bad password or username
      else if (resp.status != 200) {
        console.log("Error making call status: " + resp.status);
      }
    }).catch(function(e) {
      console.error("Error: " + e);
    });    
  }

}


class ReplyModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const postInfo = new FormData(event.target);
    let title = postInfo.get("titleText");
    let text = postInfo.get("postText");
    let data = {"title":title,"text":text,"user_id":this.props.userId};

    let callback = this.props.setNewThread;
    fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/add' + this.props.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((resp) => {
      if (resp.ok) {
        callback(data);
        return resp.json();
      }
      // Handle bad password or username
      else if (resp.status != 200) {
        console.log("Error making call status: " + resp.status);
      }
    }).catch(function(e) {
      console.error("Error: " + e);
    });    
  }
  
  render() {
    return (
     <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={this.props.handleSubmit}>
            <div class="modal-body">
                <div class="form-group">
                  <label for="replyText">Reply</label>
                  <input class="form-control" id="replyText" placeholder="Enter text" />
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Submit</button>
            </div>
          </form>          
        </div>
      </div>
    </div>
    );
  }
}

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isThread: null,
    }
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(event) {
    event.preventDefault();

    const postInfo = new FormData(event.target);
    var title = postInfo.get('titleText');
    var text = postInfo.get('postText');

    let data = {"title":title,"text":text,"user_id":this.props.userId};

    let callback = this.props.setNewThread;
    fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/add' + this.props.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((resp) => {
      if (resp.ok) {
        callback(data);
        return resp.json();
      }
      // Handle bad password or username
      else if (resp.status != 200) {
        console.log("Error making call status: " + resp.status);
      }
    }).catch(function(e) {
      console.error("Error: " + e);
    });    
  }
  
  render() {
    if (this.props.isThread) {
      return (
       <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit thread</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.props.handleSubmit}>
              <div class="modal-body">
                  <div class="form-group">
                    <label for="replyText">Title</label>
                    <input class="form-control" id="titleText" value={this.props.title} />
                  </div>
                  <div class="form-group">
                    <label for="replyText">Text</label>
                    <input class="form-control" id="postText" value={this.props.text} />
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save</button>
              </div>
            </form>          
          </div>
        </div>
      </div>
      );
    }
    else {
      return (
       <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit reply</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.props.handleSubmit}>
              <div class="modal-body">
                  <div class="form-group">
                    <label for="replyText">Text</label>
                    <input class="form-control" id="postText" value={this.props.text} />
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save</button>
              </div>
            </form>          
          </div>
        </div>
      </div>
      );      
    }
  }
}
