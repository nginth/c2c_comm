import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';
import ProfilePage from './ProfilePage.js';
import {PostModal} from './ForumModals.js';



/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ForumThreadPage.css';

class ForumThreadPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModal: false,
			type: null
		};

		this.modalStatus = this.modalStatus.bind(this);
	}

	modalStatus(status, type) {
		this.setState({isModal: status, modalType: type});
	}

	/* Render the edit button on a condition curUser = postOwner */
	/* Likely need custom calls for edit and delete, as post info/object needed. TODO: on buttons. */

	render() {
		return (
			<div className="top-container forum-test-bg">
				<div className="form-thread-content container">

					<div className="card text-center forum-thread-card">
						<div className="card-body">
							<h5 className="card-title">This is a thread name for this current thread.</h5>
							<p className="card-text">Posted by Alex Pustilnik</p>
						</div>
						<div className="card-footer forum-thread-card-footer text-right">
							<button className="btn btn-light" onClick={()=>{this.modalStatus(true, 2);}}>Add Reply</button>
						</div>
					</div>
					<PostModal showModal={this.state.isModal} closePostModal={this.modalStatus} type={this.state.modalType}/>
					<div className="forum-thread-body-container container">

						<div className="forum-thread-post-container">
			      	<ul className="forum-thread-post-list list-unstyled">

			      		<li className="media forum-thread-post-list-item">
			      			<div className="media-body row align-items-center">
			      				<div className="col-md-8 col-xs-12 forum-thread-post-content c2c-text">
				      				Obi-Wan doesn't need to be on the high ground, the high ground just needs to exist within the battle; Obi-Wan knows that when he has the low ground, he really has the high ground.Obi-Wan with the high/low ground is canonically the most powerful Jedi. This is fact. Had Yoda not denied his request to battle The Senate with typical Jedi arrogance, Obi-Wan could have defeated Palpatine in the Senate building, which housed a variety of different altitudes; this was designed so that the Chancellor could always have the moral high ground in political debates. But Obi-wan didn't fight The Senate, and Yoda soon learned that you can't cleave the Sheev in a normal 1v1. It took the Tusken Raiders years of conflict against Old Ben Kenobi to grasp his superiority in terrain advantage, as you see them visibly flee in ANH when they realize he holds the low (inverse-high) ground; this was the optimal strategy against a near-invincible opponent.
			      				</div>
			      				<div className="col-md-4 col-xs-12 forum-thread-post-user">
			      					<div className="media ">
			      						<img className="mr-3 forum-thread-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Colt_McCoy_2017_%28cropped%29.jpg/275px-Colt_McCoy_2017_%28cropped%29.jpg"/>
			      						<div className="media-body forum-thread-post-userinfo">
			      							<h5 className="">Alex Pustilnik</h5>
			      							<p className="">On 4/26/18 4:56pm</p>
			      							<button className={"btn btn-primary btn-small"} onClick={()=>{this.modalStatus(true, 3);}}>Edit Post</button>
			      						</div>
			      					</div>
			      				</div>
			      			</div>
			      		</li>

			      		<li className="media forum-thread-post-list-item">
			      			<div className="media-body row align-items-center">
			      				<div className="col-md-8 col-xs-12 forum-thread-post-content c2c-text">
				      				Obi-Wan doesn't need to be on the high ground, the high ground just needs to exist within the battle; Obi-Wan knows that when he has the low ground, he really has the high ground.Obi-Wan with the high/low ground is canonically the most powerful Jedi. This is fact. Had Yoda not denied his request to battle The Senate with typical Jedi arrogance, Obi-Wan could have defeated Palpatine in the Senate building, which housed a variety of different altitudes; this was designed so that the Chancellor could always have the moral high ground in political debates. But Obi-wan didn't fight The Senate, and Yoda soon learned that you can't cleave the Sheev in a normal 1v1. It took the Tusken Raiders years of conflict against Old Ben Kenobi to grasp his superiority in terrain advantage, as you see them visibly flee in ANH when they realize he holds the low (inverse-high) ground; this was the optimal strategy against a near-invincible opponent.
			      				</div>
			      				<div className="col-md-4 col-xs-12 forum-thread-post-user">
			      					<div className="media ">
			      						<img className="mr-3 forum-thread-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Colt_McCoy_2017_%28cropped%29.jpg/275px-Colt_McCoy_2017_%28cropped%29.jpg"/>
			      						<div className="media-body forum-thread-post-userinfo">
			      							<h5 className="">Alex Pustilnik</h5>
			      							<p className="">On 4/26/18 4:56pm</p>
			      							<div className="btn-group forum-thread-post-adminpanel" role="group" aria-label="Basic example">
													  <button className={"btn btn-small btn-primary"} onClick={()=>{this.modalStatus(true, 3);}}>Edit Post</button>
													  <button className={"btn btn-small btn-danger"} onClick={()=>{this.modalStatus(true, 1);}}>Delete Post</button>
													</div>
			      						</div>
			      					</div>
			      				</div>
			      			</div>
			      		</li>

			      	</ul>
			      </div>

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
		);
	}
}

export default ForumThreadPage;