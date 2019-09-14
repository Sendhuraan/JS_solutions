/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import './index.css';
import axios from 'axios';

const DEFAULT_QUERY = 'jigu';
const DEFAULT_PAGE_NUMBER = '1';
const DEFAULT_HITS_PER_PAGE = '4';
const DEFAULT_SEARCH_TYPE = 'all';

const PATH_BASE = 'https://api.jikan.moe/v3';
const PATH_SEARCH = 'search';
const PARAM_TYPE = 'anime';
const PARAM_SEARCH = '?q=';
const PARAM_PAGE = 'page=';
const PARAM_HITS_PER_PAGE = 'limit=';

function searchFilter(searchValue) {
	return function(item) {
		return item.title.toLowerCase().includes(searchValue.toLowerCase());
	};
}

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			grid: {
				results: null
			},
			autoComplete: {
				results: null
			},
			search: {
				value: '',
				type: DEFAULT_SEARCH_TYPE,
				orderBy: ''
			}
		};

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.setSearchResults = this.setSearchResults.bind(this);
		this.onSortChange = this.onSortChange.bind(this);

	}

	componentDidMount() {
		const { search } = this.state;

		const gridResultURL = 'https://api.jikan.moe/v3/top/anime/1/bypopularity/?limit=5';

		axios(gridResultURL)
		.then((response) => {
			this.setState(function setGridResults(prevState) {
				let newGridState = {...prevState};
				newGridState.grid.results = response.data.top.slice(0,5);

				return newGridState;
			});
		})
		.catch(function(error) {
			console.log(error);
			this.setState({
				error
			});
		});
	}

	onSearchChange(event) {
		const searchValue = event.target.value;

		this.setState(
			function setSearchValue(prevState) {
				let newSearchState = {...prevState};
				newSearchState.search.value = searchValue;

				return newSearchState;
			},
			function afterStateUpdate() {
				const { value, orderBy } = this.state.search;

				if(value.length >= 3) {
					const searchURL = `https://api.jikan.moe/v3/search/anime/?q=${value}&page=1&order_by=${orderBy}&sort=desc&limit=5`;

					axios(searchURL)
					.then((response) => {
						console.log(response.data.results);
						this.setSearchResults(response.data.results);
					})
					.catch(function(error) {
						console.log(error);
						this.setState({
							error
						});
					});
				}	
			}
		);
	}

	onSearchSubmit() {

	}

	setSearchResults(results) {
		this.setState(function setSearchResultInGrid(prevState) {
			let newGridState = {...prevState};
			newGridState.grid.results = results;

			return newGridState;
		});
	}

	onSortChange(e) {
		console.log(e.target.options[e.target.selectedIndex].value);
	}

	render() {

		const { search, grid, autoComplete } = this.state;

		return (
			<div className='page'>
				<div className='interactions'>
					<section className='search-container'>
						<main>
							<form onSubmit={this.onSearchSubmit}>
								<input type='text' value={search.value} onChange={this.onSearchChange} />
								<input type='submit' value='Search' />
							</form>

							{
								search.value.length < 3 && (
								<React.Fragment>
									<em>Keyword too short. Type minimum three characters to get result.</em>
								</React.Fragment>
								)
							}

						</main>

						<div className='search-autocomplete-container'>
							{
								autoComplete.results &&
								<Table lists={autoComplete.results} />
							}
						</div>
					</section>

					<section className='grid-result-container'>
						<header>
							<h4>Anime List</h4>
							<br />

							{
								search.value.length >= 3 && (
								<React.Fragment>
									<span>Sort By : </span>
									<select defaultValue={grid.orderBy} onChange={this.onSortChange}>
										<option value='reset'>Sort By</option>
										<option value='genre'>Genre</option>
										<option value='score'>Score</option>
										<option value='latest'>Latest</option>
									</select>
								</React.Fragment>
								)
							}
							
						</header>

						<main>
							{
								grid.results &&
								<Table lists={grid.results} />
							}
						</main>

					</section>
					
				</div>
			</div>
		);
	}
}

function Search(props) {

	const { value, onChange, onSubmit, children } = props;

	return (
		<form onSubmit={onSubmit}>
			{children}
			<input type='text' value={value} onChange={onChange} />
			<input type='submit' value={children} />
		</form>
	);
}

function Table(props) {

	const { lists } = props;

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
			{lists.map((list) => {
				return (
					<div className='table-row' key={list.mal_id}>
						<img src={list.image_url} alt={list.title} />
						<h3>{list.title}</h3>
						<p>{list.synopsis}</p>
						<p>
							<span>Score</span>
							<span>{list.score}</span>
						</p>
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
