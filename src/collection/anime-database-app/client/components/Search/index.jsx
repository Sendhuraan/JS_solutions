import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AppContext from '../AppContext';
import AutoComplete from '../AutoComplete';

import './index.less';

class Search extends Component {
	constructor(props) {
		super(props);

		this.handleSubmitClick = this.handleSubmitClick.bind(this);
	}

	handleSubmitClick() {
		const {
			setAutoCompleteDisplayHide

		} = this.context;

		setAutoCompleteDisplayHide();
		this.props.history.push('/');
	}
	
	render() {
		const {
			search_value,
			search_type,
			autoComplete_results_anime,
			autoComplete_results_manga,
			autoComplete_results_character,
			autoComplete_display_show

		} = this.context.state;

		const {
			onSearchInputChange,
			onSearchSubmit,
			onSearchTypeChange,
			setAutoCompleteResultInSearch,
			setAutoCompleteDisplayShow

		} = this.context;

		return (
			<section className='search-container'>
				<main>
					<form className='row' onSubmit={onSearchSubmit}>
						<div className='col search-type'>
							<select
								value={search_type}
								onChange={onSearchTypeChange}
							>
								<option value='all'>All</option>
								<option value='anime'>Anime</option>
								<option value='manga'>Manga</option>
								<option value='character'>Character</option>
							</select>
						</div>

						<div className='col-10 search-value'>
							<input
								type='text'
								value={search_value}
								onChange={onSearchInputChange}
								onFocus={setAutoCompleteDisplayShow}
							/>
							<input
								type='submit'
								className='btn btn-primary'
								value='Search'
								onClick={this.handleSubmitClick}
								disabled={search_value.length < 3 ? true : false}
							/>

							{
								(
									autoComplete_display_show && 
									(
										autoComplete_results_anime ||
										autoComplete_results_manga ||
										autoComplete_results_character
									)
								)
								&&
								<AutoComplete 
									lists={{
										'anime': autoComplete_results_anime,
										'manga': autoComplete_results_manga,
										'character': autoComplete_results_character
									}}
									setValue={setAutoCompleteResultInSearch}
								/>
							}
						</div>
					</form>

					{
						search_value.length < 3 && (
						<div className='search-msg'>
							<em>Keyword too short. Type minimum three characters to get result.</em>
						</div>
						)
					}

				</main>

				

			</section>
		);
	}
}

Search.contextType = AppContext;

export default withRouter(Search);
