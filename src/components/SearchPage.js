import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/SearchPage.css';

/* Two tier. If nothing searched, search box. If search, display query and results under. */
class SearchPage extends Component {
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
	}

	makeResultCard(userData) {
		return (
			<div className="card search-profile-card ">
			  <img className="card-img-top search-profile-pic" src={userData.basic.avatar} alt="Card image cap"/>
			  <div className="card-body">
			    <h5 className="card-title"><Link className="nav-link" to={'/ViewProfile/' + userData.id}>{userData.basic.firstName} {userData.basic.lastName}</Link></h5>
			  </div>
			  <ul className="list-group list-group-flush">
				    <li className="list-group-item">C2C Graduation Year: {userData.c2c.graduation}</li>
				  </ul>
			  <ul className="list-group list-group-flush">
			    <li className="list-group-item">Contains: <em>{this.state.query}</em></li>
			  </ul>
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

		console.log("Search: " + query);

		if (search) {
			fetch('https://code-2-college-connect-api.herokuapp.com/api/users/search/' + query + '?page=1&per_page='+this.state.itemsPerPage, {
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

		fetch('https://code-2-college-connect-api.herokuapp.com/api/users/search/' + this.state.query + '?page=' + (current+1) + '&per_page='+this.state.itemsPerPage, {
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

	render() {
		let isSearch = this.state.search;

		return (
			<div className="top-container search-background">
				<div className={isSearch ? "container search-container" : "container search-container no-search-margin"}>
					<div className="search-bar-container container-fluid">
						<h1 className="search-header">Search Profiles</h1>
						<form className="search-bar" onSubmit={this.search}>
							<div className="input-group">
								<input type="text" className="form-control form-control-lg" placeholder="Search" ref={(input) => this.input = input}/>
								<div className="input-group-append">
									<button className="btn btn-outline-primary" type="submit">Search!</button>
								</div>
							</div>
						</form>
					</div>
					<p className={isSearch ? "search-results-header" : "d-none"}>Search Results:</p>
					<div className={isSearch ? "search-results-container" : "d-none"}>
						<div className="card-deck search-card-deck">
							{this.state.searchResults}
						</div>
					</div>

					<div className={isSearch ? "search-pagination-container" : "d-none"}>
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
			);
	}
}

export default SearchPage;