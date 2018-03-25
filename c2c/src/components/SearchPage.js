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
	}

	render() {
		return (
			<div className="container search-container">

			</div>
			);
	}
}