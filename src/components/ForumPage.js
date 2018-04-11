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

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      text: null,
      date: null,
      name: null,
    };
  }

  render() {  
    return (
      <div class="card mb-4" class="w-75">
          <div class="card-body">
            <h3 class="card-title">this.props.title</h3>
            <p class="card-text">this.props.text</p>
            <button type="button" class="btn btn-info" onClick={() => this.props.onView()}>View</button>
          </div>
          <div class="card-footer text-muted">
            Posted on this.props.date by
            <a href="#"> this.props.name</a>
            <button type="button" class="btn btn-primary" onClick={() => this.props.onReply()}>Reply</button>
          </div>
      </div>
      <br />
    );
  }
}

/* Takes care of presenting posts/replies + pagination */
/* TODO: have a global data structure to contain posts/replies */
class ForumPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    };
  }

  /* adds a reply to the thread */
  /* TODO: with edits, check if userid matches */
  handleReply(id) {

  }

  /* called to display more replies for a given post update */
  handleView(id) {

  }

  renderPost(id) {
    return (
      <Post
        title={this.posts[id].title}
        text={this.posts[id].text}
        date={this.posts[id].date}
        name={this.posts[id].name}

        onView={() => this.handleView(id)}
        onReply={() => this.handleReply(id)}
      />
    );
  }

  /*make dict with postid->post attributes*/
  setPosts(posts) {
    this.setState(posts)
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

  render() {
    let postItems = [];
    let keys = Object.keys(this.posts)
    for (currKey in keys) {
      postItems.push(renderPost(currKey))
    }
    return <div>{postItems}</div>;
  }
}

export default ForumPage;

          /*this.state.loggedIn ? <ForumPage id={this.state.userData.id}/> : <Redirect to="/LogIn" />*/