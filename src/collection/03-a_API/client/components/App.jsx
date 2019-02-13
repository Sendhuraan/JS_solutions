import React, { Component } from 'react';
import axios from 'axios';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

function searchFilter(searchValue) {
	return function(item) {
		return item.title.toLowerCase().includes(searchValue.toLowerCase());
	};
}

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			result: null,
			searchValue: DEFAULT_QUERY
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.setSearchTopStories = this.setSearchTopStories.bind(this);
	}

	onDismiss(id) {
		const updatedHits = this.state.result.hits.filter((item) => {
			return item.objectID !== id;
		});

		this.setState({
			result: { ...this.state.result, hits: updatedHits }
		});
	}

	onSearchChange(event) {
		this.setState({
			searchValue: event.target.value
		});
	}

	setSearchTopStories(result) {
		this.setState({
			result
		});
	}

	componentDidMount() {
		const { searchValue } = this.state;

		axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchValue}`)
			.then((result) => { this.setSearchTopStories(result.data); })
			.catch((error) => { this.setState({ error }); });
	}

	render() {

		const { searchValue, result } = this.state;

		if(!result) {
			return null;
		}

		return (
			<div className='page'>
				<div className='interactions'>
					<Search value={searchValue} onChange={this.onSearchChange}>
						Search Books 
					</Search>
					{
						result && <Table list={result.hits} searchPattern={searchValue} onDismiss={this.onDismiss} />
					}
					
				</div>
			</div>
		);
	}
}

function Search(props) {

	const { value, onChange, children } = props;

	return (
		<form>
			{children}
			<input type='text' value={value} onChange={onChange} />
		</form>
	);
}

function Table(props) {

	const { list, searchPattern, onDismiss } = props;

	const largeColumn = {
		width: '40%'
	};

	const midColumn = {
		width: '30%'
	};

	const smallColumn = {
		width: '10%'
	};

	return (
		<div className='table'>
			{list.filter(searchFilter(searchPattern)).map((item) => {
				return (
					<div className='table-row' key={item.objectID}>
						<span style={ largeColumn }><a href={item.url}>{item.title}</a></span>
						<span style={ midColumn }>{item.author}</span>
						<span style={ smallColumn }>{item.num_comments}</span>
						<span style={ smallColumn }>{item.points}</span>
						<span>
							<Button className='button-inline' onClick={() => onDismiss(item.objectID)}>
								Dismiss
							</Button>
						</span>
					</div>
				);
			})
			}
		</div>
	);
}

function Button(props) {

	const { className = '', onClick, children } = props;

	return (
		<input type='button' className={className} onClick={onClick} value={children} />
	);
}

export default App;
