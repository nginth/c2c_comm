import React, { Component } from 'react';



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
			dummySearch: false,
			query: "nothing"
		};

		this.search = this.search.bind(this);
	}

	search(event) {
		event.preventDefault();

		let newStatus = (this.input.value).match(/\w/);
		console.log("Dummy search: " + (this.input.value).match(/[^\s]*/));
		this.setState({ dummySearch: newStatus, query: this.input.value });
	}

	render() {
		let isSearch = this.state.dummySearch;

		return (
			<div className="top-container search-background">
				<div className="container search-container">
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
							
							<div className="card search-profile-card ">
							  <img className="card-img-top search-profile-pic" src="http://alcalde.texasexes.org/wp-content/uploads/2015/03/greg-fenves-square.jpg" alt="Card image cap"/>
							  <div className="card-body">
							    <h5 className="card-title">(PROFILE CARD)</h5>
							    <p class="card-text">Used for profiles that return hits</p>
							  </div>
							  <ul className="list-group list-group-flush">
								    <li className="list-group-item">College/Job:</li>
								    <li className="list-group-item">C2C Graduation Year:</li>
								  </ul>
							  <ul className="list-group list-group-flush">
							    <li className="list-group-item">(Matching Field): <em>{this.state.query}</em></li>
							  </ul>
							</div>
							<div className="card search-profile-card ">
							  <img className="card-img-top search-profile-pic" src="http://alcalde.texasexes.org/wp-content/uploads/2015/08/SCP_2639.jpg" alt="Card image cap"/>
							  <div className="card-body">
							    <h5 className="card-title">(PROFILE CARD)</h5>
							    <p class="card-text">Used for profiles that return hits</p>
							  </div>
							  <ul className="list-group list-group-flush">
								    <li className="list-group-item">College/Job:</li>
								    <li className="list-group-item">C2C Graduation Year:</li>
								  </ul>
							  <ul className="list-group list-group-flush">
							    <li className="list-group-item">(Matching Field): <em>{this.state.query}</em></li>
							  </ul>
							</div>
						</div>
					</div>

					<p className={isSearch ? "search-results-header" : "d-none"}>Search Results:</p>
					<div className={isSearch ? "search-results-container" : "d-none"}>
						<div className="row search-card-deck">
							
							<div className="col-xs-4">
								<div className="card">
								  <img className="card-img-top search-profile-picb" src="http://alcalde.texasexes.org/wp-content/uploads/2015/03/greg-fenves-square.jpg" alt="Card image cap"/>
								  <div className="card-body">
								    <h5 className="card-title">(PROFILE CARD)</h5>
								    <p class="card-text">Used for profiles that return hits</p>
								  </div>
								  <ul className="list-group list-group-flush">
									    <li className="list-group-item">College/Job:</li>
									    <li className="list-group-item">C2C Graduation Year:</li>
									  </ul>
								  <ul className="list-group list-group-flush">
								    <li className="list-group-item">(Matching Field): <em>{this.state.query}</em></li>
								  </ul>
								</div>
							</div>
							<div className="col-xs-4">
								<div className="card">
								  <img className="card-img-top search-profile-picb" src="http://alcalde.texasexes.org/wp-content/uploads/2015/03/greg-fenves-square.jpg" alt="Card image cap"/>
								  <div className="card-body">
								    <h5 className="card-title">(PROFILE CARD)</h5>
								    <p class="card-text">Used for profiles that return hits</p>
								  </div>
								  <ul className="list-group list-group-flush">
									    <li className="list-group-item">College/Job:</li>
									    <li className="list-group-item">C2C Graduation Year:</li>
									  </ul>
								  <ul className="list-group list-group-flush">
								    <li className="list-group-item">(Matching Field): <em>{this.state.query}</em></li>
								  </ul>
								</div>
							</div>
							<div className="col-xs-4">
								<div className="card">
								  <img className="card-img-top search-profile-picb" src="http://alcalde.texasexes.org/wp-content/uploads/2015/03/greg-fenves-square.jpg" alt="Card image cap"/>
								  <div className="card-body">
								    <h5 className="card-title">(PROFILE CARD)</h5>
								    <p class="card-text">Used for profiles that return hits</p>
								  </div>
								  <ul className="list-group list-group-flush">
									    <li className="list-group-item">College/Job:</li>
									    <li className="list-group-item">C2C Graduation Year:</li>
									  </ul>
								  <ul className="list-group list-group-flush">
								    <li className="list-group-item">(Matching Field): <em>{this.state.query}</em></li>
								  </ul>
								</div>
							</div>
							<div className="col-xs-4">
								<div className="card">
								  <img className="card-img-top search-profile-picb" src="http://alcalde.texasexes.org/wp-content/uploads/2015/03/greg-fenves-square.jpg" alt="Card image cap"/>
								  <div className="card-body">
								    <h5 className="card-title">(PROFILE CARD)</h5>
								    <p class="card-text">Used for profiles that return hits</p>
								  </div>
								  <ul className="list-group list-group-flush">
									    <li className="list-group-item">College/Job:</li>
									    <li className="list-group-item">C2C Graduation Year:</li>
									  </ul>
								  <ul className="list-group list-group-flush">
								    <li className="list-group-item">(Matching Field): <em>{this.state.query}</em></li>
								  </ul>
								</div>
							</div>
						</div>
					</div>

					<div className={isSearch ? "search-pagination-container" : "d-none"}>
						<nav aria-label="Page navigation example">
						  <ul className="pagination justify-content-center">
						    <li className="page-item disabled">
						      <a className="page-link" tabIndex="-1">Previous</a>
						    </li>
						    <li className="page-item"><a className="page-link">1</a></li>
						    <li className="page-item"><a className="page-link">2</a></li>
						    <li className="page-item"><a className="page-link">3</a></li>
						    <li className="page-item">
						      <a className="page-link">Next</a>
						    </li>
						  </ul>
						</nav>
					</div>
				</div>
			</div>
			);
	}
}

export default SearchPage;