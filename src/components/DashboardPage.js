import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/HomePage.css';
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
      itemsPerPage: 10
    };

    this.search = this.search.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.makeResultCard = this.makeResultCard.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.get_csv = this.get_csv.bind(this);
    this.download = this.download.bind(this);
    this.delete_user = this.delete_user.bind(this);
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
    // console.log(JSON.stringify(this.props.userData))
    fetch('http://localhost:5001/api/users/export', {
      method: 'POST',
      headers: {
        'Accept': 'text/csv',
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename=report.csv'
      },
      body: JSON.stringify(this.props.userData)
    }).then((resp) => resp.text())
    .then((responseText) => {
       //console.log(responseText)
       this.download('report.csv', responseText);
      }).catch(function(e) {
          console.error("Error: " + e);
        });
  }

  // Makes an API call that deletes the requested user
  delete_user(userData) {
    userData['actualUser'] = this.props.userData.basic.username;
    fetch('http://localhost:5001/api/users/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    }).then((resp) => resp.text())
    .then((responseText) => {
       console.log(responseText)
      }).catch(function(e) {
          console.error("Error: " + e);
    });
  }

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

  makeResultCard(userData) {
    return (
      <div className="card search-profile-card" key={userData.id}>
        <img className="card-img-top search-profile-pic card-header" src={userData.basic.avatar} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title"><Link className="nav-link" to={'/ViewProfile/' + userData.id}>{userData.basic.firstName} {userData.basic.lastName}</Link></h5>
        </div>
        <button className="btn btn-danger" onClick={() => {this.submit(userData);}}>Delete</button>
      </div>
    );
  }

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

  search(event) {
    event.preventDefault();

    // Make sure nonempty input
    let search = (this.input.value).match(/\w/);
    let query = this.input.value;
    let callback = this.updateSearchResults;

    //console.log("Search: " + query);

    if (search) {
      fetch('http://localhost:5001/api/users/search/' + query + '?page=1&per_page='+this.state.itemsPerPage, {
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

    this.setState({ search: search, query: this.input.value });
  }
    
  handlePageChange(page) {

    let current = page.selected;
    let callback = this.updateSearchResults;

    fetch('http://localhost:5001/api/users/search/' + this.state.query + '?page=' + (current+1) + '&per_page='+this.state.itemsPerPage, {
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

    this.setState({currentPage: current});

  }

  componentWillMount() {
    fetch('http://localhost:5001/api/users/list', {
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
        }
      }).catch(function(e) {
        console.error("Error: " + e);
      });
  }

  render() {
    return (
      <div className="top-container">
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-header">
                <strong>Search Profiles</strong>
                <small> Look up users to edit, delete, etc.</small>
              </div>
              <div className="container-fluid">
                <form className="search-bar" onSubmit={this.search}>
                  <div className="input-group">
                    <input type="text" className="form-control form-control-md" placeholder="Search..." ref={(input) => this.input = input}/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">Search!</button>
                    </div>
                  </div>
                </form>
              </div>
              <p className="search-results-header">Users:</p>
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
            <div className="card">
              <div className="card-header">
                <strong> Export </strong>
                <small> Downloads database as CSV file </small>
              </div>
              <div className="card-body">
                <button className= "btn btn-primary" onClick={() => {this.get_csv();}}>Export</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default DashboardPage;