import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import ReactPaginate from 'react-paginate';
import { CircleLoader } from 'react-spinners';

/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/Dashboard.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class DashboardPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: false,
      query: "",
      searchResults: "",
      currentPage: 0,
      totalPages: 0,
      itemsPerPage: 10,
      loading: false,
      targetUser: ""
    };

    this.search = this.search.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.makeResultCard = this.makeResultCard.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.get_csv = this.get_csv.bind(this);
    this.download = this.download.bind(this);
    this.delete_user = this.delete_user.bind(this);
    this.loadingStatus = this.loadingStatus.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.changePass = this.changePass.bind(this);
  }

  // Makes an event that allows for file donwload
  download(filename, text) {
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      link.dispatchEvent(event);
    }
    else {
      link.click();
    }
  }

  // Makes an API call that returns an export of the database in a csv file
  get_csv() {
    fetch(process.env.REACT_APP_API + '/api/users/export', {
      method: 'POST',
      headers: {
        'Accept': 'text/csv',
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename=report.csv'
      },
      body: JSON.stringify(this.props.userData)
    }).then((resp) => resp.text())
    .then((responseText) => {
       this.download('report.csv', responseText);
      }).catch(function(e) {
          console.error("Error: " + e);
        });
  }

  // Makes an API call that deletes the requested user
  delete_user(userData) {
    let loadingCallback = this.loadingStatus;
    loadingCallback(true);
    userData['actualUser'] = this.props.userData.basic.username;
    fetch(process.env.REACT_APP_API + '/api/users/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    }).then((resp) => resp.text())
    .then((responseText) => {
        loadingCallback(false);
        this.getAllUsers();
      }).catch(function(e) {
          console.error("Error: " + e);
    });
  }

  // Prompts the admin if they for sure want to delete or not
  submit(userData) {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'This will permanently delete the user. Are you sure?',
      buttons: [
        {
          label: 'Confirm',
          onClick: () => this.delete_user(userData)
        },
        {
          label: 'Cancel',
          
        }
      ]
    })
  };

  // Prompts admin to change password of the corresponding user he clicks on
  changePass(event) {
    event.preventDefault();
    let loadingCallback = this.loadingStatus;
    loadingCallback(true);
    var data = { 'username': this.state.targetUser.basic.username, 'new_pass': this.password.value }
    fetch(process.env.REACT_APP_API + '/api/users/passchange', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((resp) => resp.text())
    .then((responseText) => {
        loadingCallback(false);
        alert('Success!');
      }).catch(function(e) {
          console.error("Error: " + e);
    });
    this.password.value = '';
  }

  // Stores the profile card the admin targets into state
  store(userData) {
    this.setState({targetUser: userData});
  }

  // Returns a profile card based off the user data it receives
  makeResultCard(userData) {
    return (
      <div className="card search-profile-card search-profile-card-white" key={userData.id}>
        <img className="card-img-top search-profile-pic card-header" src={userData.basic.avatar} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title"><Link className="nav-link" to={'/ViewProfile/' + userData.id}>{userData.basic.firstName} {userData.basic.lastName}</Link></h5>
        </div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#changePassModal" onClick={() => {this.store(userData);}}>
          Change password
        </button>
        <button className="btn btn-danger" onClick={() => {this.submit(userData);}}>Delete</button>
      </div>
    );
  }


  // Updates the state's searchResults depending on what the user searched
  updateSearchResults(data) {
    //console.log("Page: " + data.page + " of " + data.pages + " with " + data.per_page + "per page and users: " + data.users.length);
    let userCards = [];
    for (let user in data.users) {
      userCards.push(this.makeResultCard(data.users[user]));
    }

    // Initial call
    if (this.state.currentPage == 0 && this.state.totalPages == 0) {
      this.setState({raw: data, searchResults: userCards, currentPage: data.page, totalPages: data.pages});
    }
    // Called by changing page
    else {
      this.setState({raw: data, searchResults: userCards, totalPages: data.pages});
    }
    
  }

 // Makes an API call to search the Users table for fields in the search vector that matches the query
 search(event) {
    event.preventDefault();

    // Make sure nonempty input
    let search = (this.input.value).match(/\w/);
    let query = this.input.value;
    let callback = this.updateSearchResults;
    let loadingCallback = this.loadingStatus;

    //console.log("Search: " + query);

    if (search) {
      loadingCallback(true);
      fetch(process.env.REACT_APP_API + '/api/users/search/' + query + '?page=1&per_page='+this.state.itemsPerPage, {
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
          }).then(() => {
            loadingCallback(false);
          });
    }

    this.setState({ search: search, query: this.input.value });
  }
    
  // Function call to set up changing the pages of profile cards
  handlePageChange(page) {

    let current = page.selected;
    let callback = this.updateSearchResults;
    let loadingCallback = this.loadingStatus;
    loadingCallback(true);
    fetch(process.env.REACT_APP_API + '/api/users/search/' + this.state.query + '?page=' + (current+1) + '&per_page='+this.state.itemsPerPage, {
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
              loadingCallback(false);
            }
          }).catch(function(e) {
            console.error("Error: " + e);
          });

    this.setState({currentPage: current});

  }

  // Function call to get all the Users and create a profile card for them.
  getAllUsers() {
    let loadingCallback = this.loadingStatus;
    loadingCallback(true);
    fetch(process.env.REACT_APP_API + '/api/users/list', {
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
        }).then((data) => {
          if (data) {
            let userCards = [];
            for (let user in data.users) {
              userCards.push(this.makeResultCard(data.users[user]));
            }
            this.setState({raw: data, searchResults: userCards, currentPage: data.page, totalPages: data.pages});
            loadingCallback(false);
          }
        }).catch(function(e) {
          console.error("Error: " + e);
        });
  }

  // Update the status of whether or not the page is loading
  loadingStatus(status) {
    this.setState({loading:status});
  }

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    return (
      <div className="top-container">
        <div className={this.state.loading ? "loading-div container" : "d-none"}>
          <div className="loading-spinner mx-auto">
            <CircleLoader size={150} color={'#FFFFFF'} loading={this.state.loading}/>
          </div>
        </div>
        <div className={this.state.loading ? "d-none" : "row"}>
          <div className="col-sm-8">
            <div className="card card-adjusted">
              <div className="card-header">
                <strong>Search Profiles</strong>
                <small> Look up users to edit, delete, etc.</small>
              </div>
              <div className="container-fluid">
                <form className="search-bar search-bar-adjusted" onSubmit={this.search}>
                  <div className="input-group">
                    <input type="text" className="form-control form-control-md" placeholder="Search..." ref={(input) => this.input = input}/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">Search!</button>
                    </div>
                  </div>
                </form>
              </div>
              <p className="search-results-header search-results-header-adjusted">Users:</p>
              <div className="search-results-container">
                <div className="card-deck search-card-deck">
                  {this.state.searchResults}
                </div>
              </div>

              <div className="search-pagination-container">
                <ReactPaginate pageCount={this.state.totalPages}
                               pageRangeDisplayed={5}
                               marginPagesDisplayed={2}
                               onPageChange={this.handlePageChange}
                               containerClassName={"pagination justify-content-center"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} 
                               breakClassName="page-item"
                               breakLabel={<a className="page-link">...</a>}
                               pageClassName="page-item"
                               previousClassName="page-item"
                               nextClassName="page-item"
                               pageLinkClassName="page-link"
                               previousLinkClassName="page-link"
                               nextLinkClassName="page-link"/>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card card-adjusted">
              <div className="card-header">
                <strong> Export </strong>
                <small> Downloads database as CSV file </small>
              </div>
              <div className="card-body">
                <button className= "btn btn-primary" onClick={() => {this.get_csv();}}>Export</button>
              </div>
            </div>
          </div>
          <div className="modal fade" id="changePassModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Change Password</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.changePass}>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input className="form-control" ref={(input) => {this.password = input}} type="password" placeholder="New Password"/>
                    <br/>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button className="btn btn-primary" type="submit">Submit Changes</button>
                    <br/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default DashboardPage;