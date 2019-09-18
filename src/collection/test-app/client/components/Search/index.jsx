/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';

class Search extends Component {
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
				<Link to={`/book/1`}>Show details</Link>
			</ul>
		);
	}
}

Search.contextType = AppContext;

export default Search;
