import React, { Component } from 'react';
import axios from 'axios';

import AppContext from '../AppContext';

import './index.less';

class AnimeDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			searchType: null,
			error: false,
			loading: false
		};
	}

	componentDidMount() {
		const PATH_BASE = 'https://api.jikan.moe/v3';
		const { type, animeId } = this.props.match.params;

		const fetchAnime = async () => {
			var searchType = (function setSearchType(input) {
				if(input === 'all') {
					return 'anime';
				}
				else {
					return input;
				}
			})(type);

			try {
				const result = await axios.get(`${PATH_BASE}/${searchType}/${animeId}`);
				this.setState({
					searchType: searchType,
					data: result.data
				});
			}
			catch (error) {
				this.setState({
					error: true
				});
			}
			this.setState({
				loading: true
			});
		};

		fetchAnime();
	}

	render() {
		const { data, searchType } = this.state;

		return (
			<>
				{data && <AnimeInfo type={searchType} data={data} />}
			</>
		);	
	}
	
}

AnimeDetails.contextType = AppContext;

function AnimeInfo(props) {

	const { type, data } = props;

	return (
		<section className='generic-detail-container'>
			<div className='row'>

			{
				(type === 'anime' || type === 'manga')
				?
				<>
					<div className='col-md-6'>
						<h3>{data.title}</h3>
					</div>

					<div className='col-md-6 text-right'>
						<h5>Score: {data.score}</h5>
					</div>

					<div className='w-100 p-3'></div>

					<div className='col-md-3'>
						<img src={data.image_url} alt={data.title} />
					</div>

					<div className='col-md-9'>
						<p>{data.synopsis}</p>
					</div>
				</>
				:
				<>
					<div className='col-md-12'>
						<h3>{data.name}</h3>
					</div>

					<div className='w-100 p-3'></div>

					<div className='col-md-3'>
						<img src={data.image_url} alt={data.name} />
					</div>

					<div className='col-md-9'>
						<p>{data.about}</p>
					</div>
				</>
			}

				

			</div>
		</section>
	);
}

export default AnimeDetails;
