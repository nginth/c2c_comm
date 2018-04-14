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

/* manages entire forum */
class ForumPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    }
  }

  /* when user decides to make a new thread */
  handleNewThread(data) {
    let callback = this.getPosts;
    fetch('https://code-2-college-connect-api.herokuapp.com/api/forum/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((resp) => {
      if (resp.ok) {
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

  /* make ajax call to pull replies for given thread */
  handleView(id) {
    /* pull all posts with thread_id==id*/
  }

  /* add reply to DB and re-render posts */
  handleReply(id) {
    /* add post to db and make thread_id=id*/
  }

  /* edit value in DB and re-render posts */
  handleEdit(id) {

  }

  /* remove value in DB and re-render posts */
  handleDelete(id) {

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
        onEdit={() => this.handleEdit(postData.id)}
        onDelete={() => this.handleDelete(postData.id)}
      />
    );
  }

  renderSelfReplyPost(postData) {
    return (
      <SelfReplyPost
        title={postData.title}
        text={postData.text}
        date={postData.date}
        name={postData.name}

        onEdit={() => this.handleEdit(postData.id)}
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
        title={postData.title}
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

    /* iterate thru json + generate div objects */
    let items = [];
    for (post in this.posts) {
      let post_id = post;
      let title = this.posts[post]["title"];
      let text = this.posts[post]["title"];
      let date = this.posts[post]["title"];
      let name = this.posts[post]["title"];
      let user_id = this.posts[post]["user_id"];
      let thread_id = this.posts[post]["thread_id"];

      let data = {"title":title,"text":text,"date":date,"name":name,"id":post_id};

      /* guarenteed to be THREAD objects, so check if editable or not*/
      if this.props.id == user_id {
        items.push(this.renderSelfThreadPost(data));
      }
      else {
        items.push(this.renderPublicThreadPost(data));
      }
    }

    return <div>{items}</div>;
  }
}

export default ForumPage;

          /*this.state.loggedIn ? <ForumPage id={this.state.userData.id}/> : <Redirect to="/LogIn" />*/