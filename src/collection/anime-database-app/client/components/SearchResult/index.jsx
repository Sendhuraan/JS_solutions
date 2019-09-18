import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';

import './index.less';

class SearchResult extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { result } = this.props;
		const { search_type } = this.context.state;

		return (
			<li className='col-md-3'>
				<div className='card search-result'>
					<div className='card-img-container'>
						<img className='card-img-top' src={result.image_url} alt={result.title} />
					</div>
					<div className='card-body'>
						{
							result.title && <h5 className='card-title'>{result.title}</h5>
						}
						
						{
							result.synopsis && <p className='card-text'>{result.synopsis.slice(0, 100).concat('...')}</p>
						}

						{
							(result.score !== undefined) && <p className='card-text'>SCORE: {result.score}</p>
						}
						
						<Link className='btn btn-primary' to={`/${search_type === 'all' ? 'anime' : search_type}/${result.mal_id}`}>Show Details</Link>
					</div>
				</div>
			</li>
		);	
	}
}

SearchResult.contextType = AppContext;

export default SearchResult;
