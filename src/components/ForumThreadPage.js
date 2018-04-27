import React, { Component } from 'react';

import { Link, Switch, Route } from 'react-router-dom';

import { CircleLoader } from 'react-spinners';

import ReactPaginate from 'react-paginate';
import ProfilePage from './ProfilePage.js';


/* Bootstrap */
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import '../css/GlobalStyles.css';
import '../css/ForumThreadPage.css';

class ForumThreadPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="top-container">
				<div className="form-thread-content container">

					<div className="jumbotron c2c-jumbo forum-thread-jumbo">
						<div className="container forum-thread-jumbo-content">
							<p className="jumbo-title forum-jumbo-title">This is a thread.</p>
							<hr className="my-4"/>
							<p className="jumbo-subtitle forum-jumbo-subtitle">Posted By Alex Pustilnik</p>
						</div>
					</div>

					<div className="card text-center forum-thread-card">
						<div className="card-body">
							<h5 className="card-title">This is a thread name for this current thread.</h5>
							<p className="card-text">Posted by Alex Pustilnik</p>
						</div>
					</div>

					<div className="forum-thread-body-container container">

						<div className="forum-thread-post-container">
			      	<ul className="forum-thread-post-list list-unstyled">

			      		<li className="media forum-thread-post-list-item">
			      			<div className="media-body row">
			      				<div className="col-8">
				      				<p className="c2c-text dark-text">Obi-Wan doesn't need to be on the high ground, the high ground just needs to exist within the battle; Obi-Wan knows that when he has the low ground, he really has the high ground.Obi-Wan with the high/low ground is canonically the most powerful Jedi. This is fact. Had Yoda not denied his request to battle The Senate with typical Jedi arrogance, Obi-Wan could have defeated Palpatine in the Senate building, which housed a variety of different altitudes; this was designed so that the Chancellor could always have the moral high ground in political debates. But Obi-wan didn't fight The Senate, and Yoda soon learned that you can't cleave the Sheev in a normal 1v1. It took the Tusken Raiders years of conflict against Old Ben Kenobi to grasp his superiority in terrain advantage, as you see them visibly flee in ANH when they realize he holds the low (inverse-high) ground; this was the optimal strategy against a near-invincible opponent.</p>
			      				</div>
			      				<div className="col-4">
			      					<div className="media">
			      						<img className="mr-3 forum-thread-profile-picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Colt_McCoy_2017_%28cropped%29.jpg/275px-Colt_McCoy_2017_%28cropped%29.jpg"/>
			      						<div className="media-body">
			      							<h5 className="">Alex Pustilnik</h5>
			      							<p className="">On 4/26/18 4:56pm</p>
			      						</div>
			      					</div>
			      				</div>
			      			</div>
			      		</li>

			      		<li className="media forum-thread-post-list-item">
			      			<div className="media-body row">
			      				<div className="col-8">
				      				<p className="c2c-text dark-text">Did you ever hear the tragedy of Mitochondrion The Small? I thought not. It’s not a story the Nucleus would tell you. It’s a Cell legend. Mitochondrion was the Powerhouse of the Cell, so powerful and so small he could use the Cellular Respiration to influence the ADP to create energy… He had such a knowledge of ATP that he could even keep the ones he cared about from lacking energy. The ATP of Cellular Respiration is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice took away his energy in his sleep. Ironic. He could save others from lacking energy, but not himself.</p>
			      				</div>
			      				<div className="col-4">
			      					<div className="media">
			      						<img className="mr-3 forum-thread-profile-picture" src="https://nerdist.com/wp-content/uploads/2017/08/Obi-Wan-Kenobi-Star-Wars-Ewan-McGregor-Featured-970x544.jpg"/>
			      						<div className="media-body">
			      							<h5 className="">Obi-Wan Kenobi</h5>
			      							<p className="">On 4/26/18 5:00pm</p>
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