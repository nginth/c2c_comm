import React, { Component } from 'react';

import { Link } from 'react-router-dom';


/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ForumModals.css';

/* Assets */
import BlueSymbol from '../assets/C2C_symbol.jpg';

class PostModal extends Component {
  constructor(props) {
    super(props);

    /* TODO: Implement these with the backend parameters in mind */
    this.handleAddPost = this.handleAddPost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
  }

  handleAddPost(event) {
    // event.preventDefault();
    
    // let data = {"title": this.postTitle, "content": this.postContent, "uID": this.props.userId};

    // let callback = this.props.setNewThread;
    // fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/add' + this.props.id, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // }).then((resp) => {
    //   if (resp.ok) {
    //     callback(data);
    //     return resp.json();
    //   }
    //   // Handle bad password or username
    //   else if (resp.status != 200) {
    //     console.log("Error making call status: " + resp.status);
    //   }
    // }).catch(function(e) {
    //   console.error("Error: " + e);
    // });    
    alert("Should be adding a post with name: " + this.postName.value + " and text: " + this.postContent.value);
    this.postName.value = "";
    this.postContent.value = "";
    this.props.closePostModal(false, 2);

  }

  handleDeletePost(event) {
    // event.preventDefault();
    
    // let data = {"title": this.postTitle, "content": this.postContent, "uID": this.props.userId};

    // let callback = this.props.setNewThread;
    // fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/delete' + this.props.id, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // }).then((resp) => {
    //   if (resp.ok) {
    //     callback(data);
    //     return resp.json();
    //   }
    //   // Handle bad password or username
    //   else if (resp.status != 200) {
    //     console.log("Error making call status: " + resp.status);
    //   }
    // }).catch(function(e) {
    //   console.error("Error: " + e);
    // });    

    alert("Should be deleting a post.");
    this.props.closePostModal(false, 1);
  }

  handleEditPost(event) {
    // event.preventDefault();
    
  //   let data = {"title": this.postTitle, "content": this.postContent, "uID": this.props.userId};

  //   let callback = this.props.setNewThread;
  //   fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/edit' + this.props.id, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data)
  //   }).then((resp) => {
  //     if (resp.ok) {
  //       callback(data);
  //       return resp.json();
  //     }
  //     // Handle bad password or username
  //     else if (resp.status != 200) {
  //       console.log("Error making call status: " + resp.status);
  //     }
  //   }).catch(function(e) {
  //     console.error("Error: " + e);
  //   });    
  alert("Should be editing a post with name: " + this.postName.value + " and text: " + this.postContent.value);
  this.postName.value = "";
  this.postContent.value = "";
   this.props.closePostModal(false, 3);
  }


  render() {
    
    let modalTitle;
    let modalBody;


    if (this.props.type === 1) {
      modalTitle = "Delete Post";
      modalBody = (
        <form>
          <div className="modal-body">
            <p className="forum-modal-text">Are you sure you want to delete this post?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={()=>{this.handleDeletePost();}}>Yes</button>
            <button type="button" className="btn btn-primary" onClick={()=>{this.props.closePostModal(false, this.props.type);}} data-dismiss="modal">No</button>
          </div>
        </form>    
      );
    } else {
      modalTitle = this.props.type === 2 ? "New Post" : "Edit Post";
      modalBody = (
        <form>
          <div className="modal-body">
            <div className="form-group">
              <label for="replyText">Post Name</label>
              <input className="form-control" defaultValue={this.props.type === 3 ? this.props.postName : ""} ref={(input) => this.postName = input} placeholder="Enter text" />
            </div>
            <div className="form-group">
              <label for="replyText">Reply</label>
              <textarea  className="form-control" defaultValue={this.props.type === 3 ? this.props.postContent : ""} ref={(input) => this.postContent = input} placeholder="Enter text" />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={()=>{this.props.closePostModal(false, this.props.type);}} data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={()=>{this.props.type === 2 ? this.handleAddPost() : this.handleEditPost();}}>Submit</button>
          </div>
        </form>    
      );
    } 

    return (
      <div className={this.props.showModal ? "modal d-block" : "d-none"} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button type="button" onClick={()=>{this.props.closePostModal(false, this.props.type);}} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {modalBody}      
          </div>
        </div>
      </div>
    );
  }
}

class ThreadModal extends Component {
  constructor(props) {
    super(props);

    /* TODO: Implement these with the backend parameters in mind */
    this.handleAddThread = this.handleAddThread.bind(this);
  }

  handleAddThread() {
    
    
    let data = {"title": this.threadName.value, "user_id": this.props.userId, "name": this.props.userName};

    // let callback = this.props.setNewThread;
    fetch(process.env.REACT_APP_API +" /api/forum/add/new/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((resp) => {
      if (resp.ok) {
        // callback(data);
        // return resp.json();
      }
      // Handle bad password or username
      else if (resp.status != 200) {
        console.log("Error making call status: " + resp.status);
      }
    }).catch(function(e) {
      console.error("Error: " + e);
    }); 

    alert("Should be adding a thread: " + this.threadName.value + " with data " + JSON.stringify(data));
    this.threadName.value = "";
    this.props.closeThreadModal(false);
  }

  render() {
    
    let modalTitle;
    let modalBody;
    const addThreadCB = this.handleAddThread;

    
    modalTitle = "Create A New Thread";
    modalBody = (
      <form>
        <div className="modal-body">
          <div className={"form-group"}>
            <label for="replyText">New Thread Name</label>
            <input className="form-control" id="replyText" ref={(input) => this.threadName = input} placeholder="Enter Thread Name" />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={()=>{this.props.closeThreadModal(false);}} data-dismiss="modal">Close</button>
          <button type="button" onClick={()=>{addThreadCB();}} className="btn btn-primary">Submit</button>
        </div>
      </form>    
    );
    

    return (
      <div className={this.props.showModal ? "modal d-block" : "d-none"} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button type="button" onClick={()=>{this.props.closeThreadModal(false);}} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {modalBody}      
          </div>
        </div>
      </div>
    );
  }
}

export {PostModal, ThreadModal, }