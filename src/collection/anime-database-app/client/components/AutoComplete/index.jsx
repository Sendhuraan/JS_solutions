import React, { Component } from 'react';

import AppContext from '../AppContext';

import './index.less';

class AutoComplete extends Component {
	constructor(props) {
		super(props);

		this.createAutoCompleteGroup = this.createAutoCompleteGroup.bind(this);
	}

	createAutoCompleteGroup() {
		const {
			autoComplete_results_anime,
			autoComplete_results_manga,
			autoComplete_results_character

		} = this.context.state;

		const {
			setAutoCompleteResultInSearch,
			setSearchType

		} = this.context;

		const lists = {
			anime: autoComplete_results_anime,
			manga: autoComplete_results_manga,
			character: autoComplete_results_character
		};

		let autoCompleteGroup = [];

		for (let list in lists) {

			if(Array.isArray(lists[list])) {

				let listItems = [];
				let listGroup = [];

				let currentList = lists[list].slice(0, 2);

				if(list === 'anime') {
					listItems = currentList.map(function(current) {
						return (
							<li
								className='list-group-item'
								key={current.mal_id}
								onClick={(e) => {
										setAutoCompleteResultInSearch(e.target.textContent);
										setSearchType('anime');
									}
								}
							>
								{current.title}
							</li>
						);
					});
				}
				else if(list === 'manga') {
					listItems = currentList.map(function(current) {
						return (
							<li
								className='list-group-item'
								key={current.mal_id}
								onClick={(e) => {
										setAutoCompleteResultInSearch(e.target.textContent);
										setSearchType('manga');
									}
								}
							>
								{current.title}
							</li>
						);
					});
				}
				else if(list === 'character') {
					listItems = currentList.map(function(current) {
						return (
							<li
								className='list-group-item'
								key={current.mal_id}
								onClick={(e) => {
										setAutoCompleteResultInSearch(e.target.textContent);
										setSearchType('character');
									}
								}
							>
								{current.name}
							</li>
						);
					});
				}
				

				listGroup = (
					<React.Fragment>
						<h6 className='list-heading'>{`${list.charAt(0).toUpperCase()}${list.slice(1)}`}</h6>
						<ul className='list-group'>{listItems}</ul>
					</React.Fragment>
				);

				autoCompleteGroup.push(listGroup);	
			}
			
		}

		return autoCompleteGroup;
	}

	render() {
		return (
			<div className='search-autocomplete-container'>
				{this.createAutoCompleteGroup()}
			</div>
		);
	}
}

AutoComplete.contextType = AppContext;

export default AutoComplete;
