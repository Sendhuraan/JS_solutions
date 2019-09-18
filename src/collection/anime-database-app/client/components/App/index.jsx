import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import 'regenerator-runtime/runtime';

import AppContext from '../AppContext';

import AnimeDetails from '../AnimeDetails';
import Search from '../Search';
import SearchResultsGrid from '../SearchResultsGrid';

const DEFAULT_SEARCH_TYPE = 'all';

const SEARCH_TYPES = ['anime', 'manga', 'character'];
const PATH_BASE = 'https://api.jikan.moe/v3';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			search_value: '',
			search_type: DEFAULT_SEARCH_TYPE,
			search_orderBy: '',
			autoComplete_results_anime: null,
			autoComplete_results_manga: null,
			autoComplete_results_character: null,
			autoComplete_display_show: false,
			grid_results: []
		};

		this.fetchBooks = this.fetchBooks.bind(this);
		this.fetchAutoCompleteResults = this.fetchAutoCompleteResults.bind(this);
		this.fetchPopularAnime = this.fetchPopularAnime.bind(this);

		this.onSearchInputChange = this.onSearchInputChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onSearchTypeChange = this.onSearchTypeChange.bind(this);

		this.setSearchType = this.setSearchType.bind(this);
		
		this.setAutoCompleteResult = this.setAutoCompleteResult.bind(this);
		this.setAutoCompleteResults = this.setAutoCompleteResults.bind(this);
		this.setAutoCompleteResultInSearch = this.setAutoCompleteResultInSearch.bind(this);
		this.setAutoCompleteDisplayShow = this.setAutoCompleteDisplayShow.bind(this);
		this.setAutoCompleteDisplayHide = this.setAutoCompleteDisplayHide.bind(this);
	}

	componentDidMount() {
		this.fetchPopularAnime();
	}

	async fetchPopularAnime() {
		const result = await axios.get(`${PATH_BASE}/top/anime/1/bypopularity`);
		this.setState({
			grid_results: result.data.top
		});
	}

	async fetchBooks() {
		const { search_type, search_value } = this.state;

		const result = await axios.get(`${PATH_BASE}/search/${search_type}?q=${search_value}&page=1&limit=30`);
		this.setState({
			grid_results: result.data.results
		});
	}

	onSearchInputChange(e) {
		this.setState({
			search_value: e.target.value
		},
		function() {
			this.fetchAutoCompleteResults();
		});
	}

	onSearchSubmit(e){
		e.preventDefault();
		this.fetchBooks();
	}

	async fetchAutoCompleteResults() {
		const { search_value, search_type } = this.state;

		if(search_value.length >= 3) {

			if(search_type === 'all') {

				let response = await axios.all(
					[
						axios.get(`https://api.jikan.moe/v3/search/anime/?q=${search_value}&page=1&limit=5`),
						axios.get(`https://api.jikan.moe/v3/search/manga/?q=${search_value}&page=1&limit=2`),
						axios.get(`https://api.jikan.moe/v3/search/character/?q=${search_value}&page=1&limit=2`)
					]
				);
				
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

	setSearchType(value) {
		this.setState({
			search_type: value
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

			return newAutoCompleteState;
		});
	}

	setAutoCompleteResultInSearch(value) {
		this.setState({
			search_value: value
		});
	}

	setAutoCompleteDisplayShow() {
		this.setState({
			autoComplete_display_show: true
		});
	}

	setAutoCompleteDisplayHide() {
		this.setState({
			autoComplete_display_show: false
		});
	}

	render() {

		return (
			<div className='container'>
				<div className='row'>
					<AppContext.Provider
						value={{
							state: this.state,

							onSearchSubmit: this.onSearchSubmit,
							onSearchInputChange: this.onSearchInputChange,
							onSearchTypeChange: this.onSearchTypeChange,

							setSearchType: this.setSearchType,

							setAutoCompleteResult: this.setAutoCompleteResult,
							setAutoCompleteResults: this.setAutoCompleteResults,
							setAutoCompleteResultInSearch: this.setAutoCompleteResultInSearch,
							setAutoCompleteDisplayShow: this.setAutoCompleteDisplayShow,
							setAutoCompleteDisplayHide: this.setAutoCompleteDisplayHide
						}}
					>
						
						<Router>
							<>
								<Search />
								<Switch>
									<Route path='/' exact component={SearchResultsGrid} />
									<Route path='/:type/:animeId' exact component={AnimeDetails} />
								</Switch>
							</>
						</Router>
					</AppContext.Provider>
				</div>
			</div>
		);
	}
	
}

export default App;
