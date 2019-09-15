/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import './index.css';
import axios from 'axios';

const DEFAULT_QUERY = 'jigu';
const DEFAULT_PAGE_NUMBER = '1';
const DEFAULT_HITS_PER_PAGE = '4';
const DEFAULT_SEARCH_TYPE = 'all';

const SEARCH_TYPES = ['anime', 'manga', 'character'];
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
				results: {
					anime: null,
					manga: null,
					character: null
				}
			},
			search: {
				value: '',
				type: DEFAULT_SEARCH_TYPE,
				orderBy: ''
			}
		};

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
		this.onSearchTypeChange = this.onSearchTypeChange.bind(this);

		this.setAutoCompleteResult = this.setAutoCompleteResult.bind(this);
		this.setAutoCompleteResults = this.setAutoCompleteResults.bind(this);
		this.setSearchResults = this.setSearchResults.bind(this);

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
				const { value, orderBy, type } = this.state.search;

				var searchURL;

				if(value.length >= 3) {

					let orderByValue;

					if(orderBy !== '') {
						orderByValue = `&order_by=${orderBy}&sort=desc`
					}
					else {
						orderByValue = ''
					}

					if(type === 'all') {
						searchURL = `https://api.jikan.moe/v3/search/${type}/?q=${value}&page=1${orderByValue}&limit=2`;

						axios.all(
							[
								axios.get(`https://api.jikan.moe/v3/search/anime/?q=${value}&page=1&limit=2`),
								axios.get(`https://api.jikan.moe/v3/search/manga/?q=${value}&page=1&limit=2`),
								axios.get(`https://api.jikan.moe/v3/search/character/?q=${value}&page=1&limit=2`)
							]
						)
						.then((response) => {
							console.log(response);
							this.setAutoCompleteResults(response);
						})
						.catch(function(error) {
							console.log(error);
							this.setState({
								error
							});
						});
					}
					else {
						axios.get(`https://api.jikan.moe/v3/search/${type}/?q=${value}&page=1&limit=2`)
						.then((response) => {
							console.log(response.data.results);
							this.setAutoCompleteResult(type, response.data.results);
						})
						.catch(function(error) {
							console.log(error);
							this.setState({
								error
							});
						});
					}
				
				}
				else {
					this.setState(function resetSearchState(prevState) {
						let newAutoCompleteState = {...prevState};

						let resetAutoCompleteState = {
							results: {
								anime: null,
								manga: null,
								character: null
							}
						}

						newAutoCompleteState.autoComplete = resetAutoCompleteState;

						return newAutoCompleteState;
					});
				}
			}
		);
	}

	onSearchSubmit() {

	}

	onSearchTypeChange(e) {
		const searchType = e.target.options[e.target.selectedIndex].value;

		this.setState(function setSearchType(prevState) {
			const newSearchState = {...prevState};
			newSearchState.search.type = searchType;

			return newSearchState;
		});
	}

	setSearchResults(results) {
		this.setState(function setSearchResultInGrid(prevState) {
			let newGridState = {...prevState};
			newGridState.grid.results = results;

			return newGridState;
		});
	}

	setAutoCompleteResult(type, results) {
		this.setState(function setAutoCompleteResult(prevState) {
			let newAutoResult = {...prevState};
			newAutoResult['autoComplete']['results'][type] = results;

			return newAutoResult;
		});
	}

	setAutoCompleteResults(results) {
		this.setState(function setAutoCompleteResultsInSearch(prevState) {
			let newAutoCompleteState = {...prevState};

			for(
				let currentSearchType=0, currentResult=0;
				currentSearchType < SEARCH_TYPES.length;
				currentSearchType++, currentResult++
			) {
				newAutoCompleteState['autoComplete']['results'][SEARCH_TYPES[currentSearchType]] = results[currentResult]['data']['results'];
				
			}

			return newAutoCompleteState;
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
								<select defaultValue={search.type} onChange={this.onSearchTypeChange}>
									<option value='all'>All</option>
									<option value='anime'>Anime</option>
									<option value='manga'>Manga</option>
									<option value='character'>Character</option>
								</select>

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

						{
							(autoComplete.results.anime || autoComplete.results.manga || autoComplete.results.character) &&
							<AutoComplete lists={autoComplete.results} />
							
						}

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

function AutoComplete(props) {

	const { lists } = props;

	function createAutoCompleteGroup() {
		let autoCompleteGroup = [];

		for (let list in lists) {

			if(Array.isArray(lists[list])) {

				let listItems = [];
				let listGroup = [];

				if(list === 'character') {
					listItems = lists[list].map(function(current) {
						return (
							<li key={current.mal_id}>{current.name}</li>
						);
					});
				}
				else {
					listItems = lists[list].map(function(current) {
						return (
							<li key={current.mal_id}>{current.title}</li>
						);
					});
				}

				listGroup = (
					<React.Fragment>
						<h5>{list}</h5>
						<ul>{listItems}</ul>
					</React.Fragment>
				);

				autoCompleteGroup.push(listGroup);	
			}
			
		}

		return autoCompleteGroup;
	}

	return (
		<div className='search-autocomplete-container'>
			{createAutoCompleteGroup()}
		</div>
	);
}

function Table(props) {

	const { lists } = props;

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
