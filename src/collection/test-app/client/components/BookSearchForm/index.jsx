/* eslint-disable */

import React, { Component } from 'react';
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

class BookSearchForm extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const {
			searchValue,
			searchType,
			onSearchTypeChange,

			onInputChange,
			onSubmitHandler,
			autoCompleteResultsAnime,
			autoCompleteResultsManga,
			autoCompleteResultsCharacter,
			setAutoCompleteResultInSearch

		} = this.props;

		return (
			<div className='page'>
				<div className='interactions'>
					<section className='search-container'>
						<main>
							<form onSubmit={onSubmitHandler}>
								<select defaultValue={searchType} onChange={onSearchTypeChange}>
									<option value='all'>All</option>
									<option value='anime'>Anime</option>
									<option value='manga'>Manga</option>
									<option value='character'>Character</option>
								</select>

								<input type='text' value={searchValue} onChange={onInputChange} />
								<input type='submit' value='Search' />
							</form>

							{
								searchValue.length < 3 && (
								<React.Fragment>
									<em>Keyword too short. Type minimum three characters to get result.</em>
								</React.Fragment>
								)
							}

						</main>

						{
							(autoCompleteResultsAnime || autoCompleteResultsManga || autoCompleteResultsCharacter) &&
							<AutoComplete lists={{
										'anime': autoCompleteResultsAnime,
										'manga': autoCompleteResultsManga,
										'character': autoCompleteResultsCharacter,
									}} setValue={setAutoCompleteResultInSearch} />
							
						}

					</section>
					
				</div>
			</div>
		);
	}
}

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
