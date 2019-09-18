import React from 'react';

import AppContext from '../AppContext';
import SearchResult from '../SearchResult';

import './index.less';

function SearchResultsGrid() {
	return (
		<ul className='row search-results-list-container'>
			<AppContext.Consumer>
				{(context) => {
					return context.state.grid_results.map((result, index) => {
						return (
							<SearchResult result={result} key={index} />
						);
					});
				}}
			</AppContext.Consumer>
		</ul>
	);
}

export default SearchResultsGrid;
