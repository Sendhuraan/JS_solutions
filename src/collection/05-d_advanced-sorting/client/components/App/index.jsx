import React, { Component } from 'react';
import axios from 'axios';

import {
	DEFAULT_QUERY,
	DEFAULT_HITS_PER_PAGE,
	PATH_BASE,
	PATH_SEARCH,
	PARAM_SEARCH,
	PARAM_PAGE,
	PARAM_HITS_PER_PAGE
} from '../../constants';

import Search from '../Search';
import Table from '../Table';
import Button from '../Button';
import withLoading from '../withLoading';

const ButtonWithLoading = withLoading(Button);

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			results: null,
			searchKey: '',
			searchValue: DEFAULT_QUERY,
			error: null,
			isLoading: false,
			sortKey: 'NONE',
			isSortReverse: false
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.setSearchTopStories = this.setSearchTopStories.bind(this);
		this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
		this.onSort = this.onSort.bind(this);
	}

	onDismiss(id) {
		const { searchKey, results } = this.state;
		const { hits, page } = results[searchKey];

		const updatedHits = hits.filter((item) => {
			return item.objectID !== id;
		});

		this.setState({
			results: {
				...results,
				[searchKey]: { 
					hits: updatedHits,
					page
				}
			}
		});
	}

	onSearchChange(event) {
		this.setState({
			searchValue: event.target.value
		});
	}

	setSearchTopStories(result) {
		const { hits, page } = result;

		const { searchKey, results } = this.state;

		const oldHits = results && results[searchKey] ? results[searchKey].hits : [];

		const updatedHits = [ ...oldHits, ...hits ];

		this.setState({
			results: {
				...results,
				[searchKey]: { 
					hits: updatedHits,
					page
				}
			},
			isLoading: false
		});
	}

	fetchSearchTopStories(searchValue, page = 0) {

		this.setState({
			isLoading: true
		});

		axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchValue}&${PARAM_PAGE}${page}&${PARAM_HITS_PER_PAGE}${DEFAULT_HITS_PER_PAGE}`)
			.then((result) => { this.setSearchTopStories(result.data); })
			.catch((error) => { this.setState({ error }); });
	}

	onSearchSubmit(event) {
		event.preventDefault();

		const { searchValue } = this.state;
		this.setState({
			searchKey: searchValue
		});

		if(this.needsToSearchTopStories(searchValue)) {
			this.fetchSearchTopStories(searchValue);
		}
	}

	needsToSearchTopStories(searchValue) {
		return !this.state.results[searchValue];
	}

	onSort(sortKey) {
		const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
		this.setState({ sortKey, isSortReverse });
	}

	componentDidMount() {
		this._isMounted = true;

		const { searchValue } = this.state;
		this.setState({
			searchKey: searchValue
		});

		this.fetchSearchTopStories(searchValue);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {

		const {

			searchValue,
			results,
			searchKey,
			error,
			isLoading,
			sortKey,
			isSortReverse

		} = this.state;

		const page = (results && results[searchKey] && results[searchKey].page) || 0;
		const list = (results && results[searchKey] && results[searchKey].hits) || [];

		return (
			<div className='page'>
				<div className='interactions'>
					<Search value={searchValue} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
						Search Books 
					</Search>
				</div>
					
				{ 	error
					?
					<div className='interactions'>
						<p>Something Went Wrong.</p>
					</div>
					:
					<div className='interactions'>
						<Table
						list={list}
						sortKey={sortKey}
						isSortReverse={isSortReverse}
						onSort={this.onSort}
						onDismiss={this.onDismiss}
						/>
					</div>
				}
	
				<div className='interactions'>
					<ButtonWithLoading 
						isLoading={isLoading}
						onClick={() => this.fetchSearchTopStories(searchValue, page + 1)}>More
					</ButtonWithLoading>
				</div>
			</div>
		);
	}
}

export default App;
