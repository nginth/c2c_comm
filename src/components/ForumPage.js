import React, { Component } from 'react';

import { Link } from 'react-router-dom';


/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/LandingPage.css';

/* Assets */
import BlueSymbol from '../assets/C2C_symbol.jpg';

/* 
there are 4 types of posts a forum can have:

  1 - a Thread posted by someone else
  2 - a Thread posted by current user
  3 - a Reply posted by someone else
  4 - a Reply posted by current user

these distinctions are mainly used for what actions
can be performed on each element as well as which
buttons to display

then, a parent component ForumPage handles all
the logic

*/

/* */
function SelfThreadPost(props) {
  return (
    <div class="card mb-4" class="w-75">
      <div class="card-body">
        <h3 class="card-title">props.title</h3>
        <p class="card-text">props.text</p>
        <button type="button" class="btn btn-info" onClick={props.onView}>View</button>
      </div>
      <div class="card-footer text-muted">
        Posted on props.date by
        <a href="#"> props.name</a>
        <button type="button" class="btn btn-primary" onClick={props.onReply}>Reply</button>
        <button type="button" class="btn btn-primary" onClick={props.onEdit}>Edit</button>
        <button type="button" class="btn btn-primary" onClick={props.onDelete}>Delete</button>
      </div>
      <br />
    </div>
  );
}

/* */
function SelfReplyPost(props) {
  return (
    <div class="card mb-4" class="w-60">
      <div class="card-body">
        <h3 class="card-title">props.title</h3>
        <p class="card-text">props.text</p>
      </div>
      <div class="card-footer text-muted">
        Posted on props.date by
        <a href="#"> props.name</a>
        <button type="button" class="btn btn-primary" onClick={props.onEdit}>Edit</button>
        <button type="button" class="btn btn-primary" onClick={props.onDelete}>Delete</button>
      </div>
      <br />
    </div>
  );
}

/* */
function PublicThreadPost(props) {
  return (
    <div class="card mb-4" class="w-75">
      <div class="card-body">
        <h3 class="card-title">props.title</h3>
        <p class="card-text">props.text</p>
        <button type="button" class="btn btn-info" onClick={props.onView}>View</button>
      </div>
      <div class="card-footer text-muted">
        Posted on props.date by
        <a href="#"> props.name</a>
        <button type="button" class="btn btn-primary" onClick={props.onReply}>Reply</button>
      </div>
      <br />
    </div>
  );
}

/* */
function PublicReplyPost(props) {
  return (
    <div class="card mb-4" class="w-60">
      <div class="card-body">
        <h3 class="card-title">props.title</h3>
        <p class="card-text">props.text</p>
      </div>
      <div class="card-footer text-muted">
        Posted on props.date by
        <a href="#"> props.name</a>
      </div>
      <br />
    </div>
  );
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

/* manages entire forum */
class ForumPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      posts: null,
      isReply: false,
      isReplyId: null,
      isEdit: false,
      isEditId: null,
      isEditThread: false,
      isDelete: false,
      isDeleteId: null,
    }
    // this.setThreadReplies = this.setThreadReplies.bind(this);
    // this.setUserData = this.setUserData.bind(this);
    this.setDeleteThread = this.setDeleteThread.bind(this);
  }

  // setNewThread(data, id) {
  //   this.setState({
  //     posts[id]: JSON.parse(data)
  //   });
  // }

  // /* when user decides to make a new thread */
  // handleNewThread(data) {
  //   let callback = this.setNewThread;
  //   fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/add', {
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
  // }

  setThreadReplies(data, id) {
    var items = this.props.posts[id]["replies"];
    items = JSON.parse(data);
    this.setState({
      items,
    });
  }

  /* make ajax call to pull replies for given thread */
  handleView(id) {
    /* pull all posts with thread_id==id*/
    let callback = this.setThreadReplies;
    fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/' + id, {
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
            callback(responseJSON, id);
          }
        }).catch(function(e) {
          console.error("Error: " + e);
        });
  }

  setNewThread() {

  }

  /* add reply to DB and re-render posts */
  handleReply(id) {
    /* add post to db and make thread_id=id*/
    this.setState({
      isReply: true,
      isReplyId: id,
    });
  }

  /* edit value in DB and re-render posts */
  handleEdit(id, isThread) {
    this.setState({
      isEdit: true,
      isEditId: id,
      isEditThread: isThread,
    });
  }

  setDeleteThread(id) {
    this.setState({
      isDelete: true,
      isDeleteId: id,
    });
  }

  /* remove value in DB and re-render posts */
  handleDelete(id) {
    let callback = this.setDeleteThread;
    fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/delete' + id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((resp) => {
      if (resp.ok) {
        callback(id);
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

  renderSelfThreadPost(postData) {
    return (
      <SelfThreadPost
        title={postData.title}
        text={postData.text}
        date={postData.date}
        name={postData.name}

        onView={() => this.handleView(postData.id)}
        onReply={() => this.handleReply(postData.id)}
        onEdit={() => this.handleEdit(postData.id, true)}
        onDelete={() => this.handleDelete(postData.id)}
      />
    );
  }

  renderSelfReplyPost(postData) {
    return (
      <SelfReplyPost
        text={postData.text}
        date={postData.date}
        name={postData.name}

        onEdit={() => this.handleEdit(postData.id, false)}
        onDelete={() => this.handleDelete(postData.id)}
      />
    );    
  }

  renderPublicThreadPost(postData) {
    return (
      <PublicThreadPost
        title={postData.title}
        text={postData.text}
        date={postData.date}
        name={postData.name}

        onView={() => this.handleView(postData.id)}
        onReply={() => this.handleReply(postData.id)}
      />
    );
  }

  renderPublicReplyPost(postData) {
    return (
      <PublicReplyPost
        text={postData.text}
        date={postData.date}
        name={postData.name}
      />
    );      
  }

  setPosts(data) {
    this.setState({
      posts: JSON.parse(data)
    });
  }

  getPosts() {
    let callback = this.setPosts;
    fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/', {
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

  /* initial pull of all posts*/
  componentDidMount() {
    this.getPosts();
  }

  render() {
    if (this.posts == null) {
      return <div>Loading...</div>;
    }

    if (this.props.isReply) {
      return (
        <ReplyModal
          userId={this.props.id}
          id={this.props.isReplyId}
          setNewThread={() => this.setNewThread()}
        />
      );
    }

    if (this.props.isEdit) {
      return (
        <EditModal
          userId={this.props.id}
          id={this.props.isEditId}
          isThread={this.props.isEditThread}
          setNewThread={() => this.setNewThread()}
        />
      );
    }

    /* iterate thru json + generate div objects */
    let items = [];
    for (var post in this.posts) {
      let post_id = post;
      let title = this.posts[post]["title"];
      let text = this.posts[post]["title"];
      let date = this.posts[post]["title"];
      let name = this.posts[post]["title"];
      let user_id = this.posts[post]["user_id"];
      let thread_id = this.posts[post]["thread_id"];

      let data = {"title":title,"text":text,"date":date,"name":name,"id":post_id};

      // skip rendering for a deleted post
      if (this.props.isDelete && this.props.isDeleteId == post_id) {
        continue;
      }

      /* guarenteed to be THREAD objects, so check if editable or not*/
      if (this.props.id == user_id) {
        items.push(this.renderSelfThreadPost(data));
      }
      else {
        items.push(this.renderPublicThreadPost(data));
      }

      /* if someone presses view button, populate replies */
      if (this.posts[post]["replies"] != null) {
        for (var reply in this.posts[post]["replies"]) {
          let data = {"title":reply["title"],"text":reply["text"],"date":reply["date"],"name":reply["name"],"id":reply};
          if (this.props.id == user_id) {
            items.push(this.renderSelfReplyPost(data));
          }
          else {
            items.push(this.renderPublicReplyPost(data));
          }
        }
      }
    }

    return <div>{items}</div>;
  }
}

export default ForumPage;

          /*this.state.loggedIn ? <ForumPage id={this.state.userData.id}/> : <Redirect to="/LogIn" />*/