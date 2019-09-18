/* eslint-disable */

import React, { Component } from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime';

import BookSearchForm from '../bookSearchForm';
import BooksList from '../booksList';

const API_BASE_URL = 'https://api.jikan.moe/v3/search/anime/';

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

class SearchPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search_value: '',
			search_type: DEFAULT_SEARCH_TYPE,
			search_orderBy: '',
			autoComplete_results_anime: null,
			autoComplete_results_manga: null,
			autoComplete_results_character: null,
			grid_results: []
		}

		this.fetchBooks = this.fetchBooks.bind(this);
		this.fetchAutoCompleteResults = this.fetchAutoCompleteResults.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);

		this.onSearchTypeChange = this.onSearchTypeChange.bind(this);
		
		this.setAutoCompleteResult = this.setAutoCompleteResult.bind(this);
		this.setAutoCompleteResults = this.setAutoCompleteResults.bind(this);
		this.setAutoCompleteResultInSearch = this.setAutoCompleteResultInSearch.bind(this);
	}

	async fetchBooks() {
		const result = await axios.get(`${API_BASE_URL}?q=${this.state.search_value}`);
		this.setState({
			grid_results: result.data.results
		});
	};

	onInputChange(e) {
		this.setState({
			search_value: e.target.value
		},
		function() {
			this.fetchAutoCompleteResults();
		});
	};

	onSubmitHandler(e){
		e.preventDefault();
		this.fetchBooks();
	};

	async fetchAutoCompleteResults() {
		const { search_value, search_orderBy, search_type } = this.state;

		var searchURL;

		if(search_value.length >= 3) {

			let orderByValue;

			if(search_orderBy !== '') {
				orderByValue = `&order_by=${search_orderBy}&sort=desc`;
			}
			else {
				orderByValue = '';
			}

			if(search_type === 'all') {

				let response = await axios.all(
					[
						axios.get(`https://api.jikan.moe/v3/search/anime/?q=${search_value}&page=1&limit=5`),
						axios.get(`https://api.jikan.moe/v3/search/manga/?q=${search_value}&page=1&limit=2`),
						axios.get(`https://api.jikan.moe/v3/search/character/?q=${search_value}&page=1&limit=2`)
					]
				);

				// console.log(response);
				
				this.setAutoCompleteResults(response);
			}
			else {
				let response = await axios.get(
					`https://api.jikan.moe/v3/search/${search_type}/?q=${search_value}&page=1&limit=2`
				);

				this.setAutoCompleteResult(
					`autoComplete_results_${search_type}`,
					response.data.results
				);
			}
		
		}
		else {
			this.setState({
				autoComplete_results_anime: null,
				autoComplete_results_manga: null,
				autoComplete_results_character: null
			});
		}
	}

	onSearchTypeChange(e) {
		const searchType = e.target.options[e.target.selectedIndex].value;

		this.setState({
			search_type: searchType
		});
	}

	setAutoCompleteResult(type, results) {
		this.setState({
			[type]: results
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
				newAutoCompleteState[`autoComplete_results_${SEARCH_TYPES[currentSearchType]}`] = results[currentResult]['data']['results'];
				
			}

			console.log(newAutoCompleteState);

			return newAutoCompleteState;
		});
	}

	setAutoCompleteResultInSearch(value) {
		this.setState({
			search_value: value
		});
	}

  	render() {
  		const {
  			search_value,
  			search_type,
  			grid_results,
  			autoComplete_results_anime,
  			autoComplete_results_manga,
  			autoComplete_results_character,

  		} = this.state;

		return (
			<>
				<BookSearchForm
					onSubmitHandler={this.onSubmitHandler}
					onInputChange={this.onInputChange}

					searchValue={search_value}
					searchType={search_type}
					onSearchTypeChange={this.onSearchTypeChange}

					autoCompleteResultsAnime={this.state.autoComplete_results_anime}
					autoCompleteResultsManga={this.state.autoComplete_results_manga}
					autoCompleteResultsCharacter={this.state.autoComplete_results_character}
					setAutoCompleteResultInSearch={this.setAutoCompleteResultInSearch}
				/>
				<BooksList gridResults={grid_results} />
			</>
		);	
  	}

	
};

export default SearchPage;
