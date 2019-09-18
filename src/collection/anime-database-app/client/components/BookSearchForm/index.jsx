/* eslint-disable */

import React, { Component } from 'react';
import axios from 'axios';

import AppContext from '../AppContext';

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

class BookSearchForm extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const {
			search_value,
			search_type,
			search_orderBy,
			autoComplete_results_anime,
			autoComplete_results_manga,
			autoComplete_results_character,
			grid_results

		} = this.context.state;

		const {
			onSearchInputChange,
			onSearchSubmit,
			onSearchTypeChange,
			setAutoCompleteResult,
			setAutoCompleteResults,
			setAutoCompleteResultInSearch

		} = this.context;

		return (
			<div className='page'>
				<div className='interactions'>
					<section className='search-container'>
						<main>
							<form onSubmit={onSearchSubmit}>
								<select defaultValue={search_type} onChange={onSearchTypeChange}>
									<option value='all'>All</option>
									<option value='anime'>Anime</option>
									<option value='manga'>Manga</option>
									<option value='character'>Character</option>
								</select>

								<input type='text' value={search_value} onChange={onSearchInputChange} />
								<input type='submit' value='Search' />
							</form>

							{
								search_value.length < 3 && (
								<React.Fragment>
									<em>Keyword too short. Type minimum three characters to get result.</em>
								</React.Fragment>
								)
							}

						</main>

						{
							(autoComplete_results_anime || autoComplete_results_manga || autoComplete_results_character) &&
							<AutoComplete lists={{
										'anime': autoComplete_results_anime,
										'manga': autoComplete_results_manga,
										'character': autoComplete_results_character,
									}} setValue={setAutoCompleteResultInSearch} />
							
						}

					</section>
					
				</div>
			</div>
		);
	}
}

BookSearchForm.contextType = AppContext;

function AutoComplete(props) {

	const { lists, setValue } = props;

	function createAutoCompleteGroup() {
		let autoCompleteGroup = [];

		for (let list in lists) {

			if(Array.isArray(lists[list])) {

				let listItems = [];
				let listGroup = [];

				let currentList = lists[list].slice(0, 2);

				if(list === 'character') {
					listItems = currentList.map(function(current) {
						return (
							<li key={current.mal_id} onClick={(e) => setValue(e.target.textContent)}>{current.name}</li>
						);
					});
				}
				else {
					listItems = currentList.map(function(current) {
						return (
							<li key={current.mal_id} onClick={(e) => setValue(e.target.textContent)
							
							}>{current.title}</li>
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


export default BookSearchForm;
