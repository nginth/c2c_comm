import React, { Component } from 'react';

import { Link, Route } from 'react-router-dom';

import { CircleLoader } from 'react-spinners';

import ReactPaginate from 'react-paginate';
import ProfilePage from './ProfilePage.js';
import {ThreadModal} from './ForumModals.js';

/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ForumHomePage.css';

class ForumHomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModal: false
		};

		this.modalStatus = this.modalStatus.bind(this);
	}

	modalStatus(status) {
		this.setState({isModal: status});
	}


	render() {

		return (
			<div className="top-container forum-test-bg">
				<div className="forum-home-content container">
					<ThreadModal showModal={this.state.isModal} closeThreadModal={this.modalStatus}/>
					<div className="jumbotron c2c-jumbo">
						<div className="container">
							<p className="jumbo-title">Code2College Connect Forum</p>
							<p className="jumbo-subtitle">Learn. Collaborate. Ask.</p>
							<button className="btn btn-warning" data-toggle="collapse" data-target="#forumRulesCollapse">Read Rules</button>
						</div>
						<div className="forum-home-rules-container container collapse" id="forumRulesCollapse">
							<div className="card card-body">
								We have a ton of rules. You should really follow these.
							</div>
						</div>
					</div>

					<div className="forum-home-body-container container">
						<div className="forum-home-thread-titlebox">
			        <h2 className="forum-home-thread-titlebox-text">Forum Threads</h2>
			        <button className="btn btn-small" onClick={()=>{this.modalStatus(true);}}>Add Thread</button>
			      </div>

			      <div className="forum-home-threads-container">
			      	<ul className="forum-home-threads-list list-unstyled">

			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<Link className="dark-text" to="/Forum/Thread/1">
				      					<p className="forum-home-thread-text">This is testing a hecking long string in being a title n such nch n such n such n such  n such n such  n such n such.</p>
				      				</Link>
			      				</div>
			      				<div className="col-2"><Link className="forum-home-thread-text dark-text" to={'/ViewProfile/' + 1}>By: Alex Pustilnik</Link></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>

			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<p className="forum-home-thread-text">A normal title.</p>
			      				</div>
			      				<div className="col-2"><p className="forum-home-thread-text">By: Anderson Cooper</p></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>

			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<p className="forum-home-thread-text">A normal title.</p>
			      				</div>
			      				<div className="col-2"><p className="forum-home-thread-text">By: Anderson Cooper</p></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>

			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<p className="forum-home-thread-text">A normal title.</p>
			      				</div>
			      				<div className="col-2"><p className="forum-home-thread-text">By: Anderson Cooper</p></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>

			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<p className="forum-home-thread-text">A normal title.</p>
			      				</div>
			      				<div className="col-2"><p className="forum-home-thread-text">By: Anderson Cooper</p></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>

			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<p className="forum-home-thread-text">A normal title.</p>
			      				</div>
			      				<div className="col-2"><p className="forum-home-thread-text">By: Anderson Cooper</p></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>

			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<p className="forum-home-thread-text">A normal title.</p>
			      				</div>
			      				<div className="col-2"><p className="forum-home-thread-text">By: Anderson Cooper</p></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>

			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<p className="forum-home-thread-text">A normal title.</p>
			      				</div>
			      				<div className="col-2"><p className="forum-home-thread-text">By: Anderson Cooper</p></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>

			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<p className="forum-home-thread-text">A normal title.</p>
			      				</div>
			      				<div className="col-2"><p className="forum-home-thread-text">By: Anderson Cooper</p></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>
			      		
			      		<li className="media forum-home-thread-list-item">
			      			<div className="media-body row">
			      				<div className="col-6">
				      				<p className="forum-home-thread-text">A normal title.</p>
			      				</div>
			      				<div className="col-2"><p className="forum-home-thread-text">By: Anderson Cooper</p></div>
			      				<div className="col-4"><p className="forum-home-thread-text">Updated: 4-25-18 4:48pm CT</p></div>
			      			</div>
			      		</li>

			      	</ul>
			      </div>

			      <ReactPaginate pageCount={5}
														 pageRangeDisplayed={5}
														 marginPagesDisplayed={2}
														 onPageChange={this.props.handlePageChange}
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

export default ForumHomePage;