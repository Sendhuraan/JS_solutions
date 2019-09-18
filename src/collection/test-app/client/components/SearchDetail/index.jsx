/* eslint-disable */

import React, { Component } from 'react';

import AppContext from '../AppContext';

class SearchDetail extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const {
			state,
			changeSearchValue

		} = this.context;

		return (
			<ul>
				<li onClick={changeSearchValue}>{state.search}</li>
			</ul>
		);
	}
}

SearchDetail.contextType = AppContext;

export default SearchDetail;
