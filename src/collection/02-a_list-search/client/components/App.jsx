import React, { Component } from 'react';
import './App.css';

const list = [
	{
		title: 'React',
		url: 'https://reactjs.org/',
		author: 'Jordan Walke',
		num_comments: 3,
		points: 4,
		objectID: 0
	},
	{
		title: 'Redux',
		url: 'https://redux.js.org/',
		author: 'Dan Abramov, Andrew Clark',
		num_comments: 2,
		points: 5,
		objectID: 1
	}
];

function searchFilter(searchValue) {
	return function(item) {
		return item.title.toLowerCase().includes(searchValue.toLowerCase());
	};
}

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			searchValue: '',
			list
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	onDismiss(id) {
		const updatedList = this.state.list.filter((item) => {
			return item.objectID !== id;
		});

		this.setState({
			list: updatedList
		});
	}

	onSearchChange(event) {
		this.setState({
			searchValue: event.target.value
		});
	}

	render() {

		const { list, searchValue } = this.state;

		return (
			<div className='App'>
				<form>
					<input type='text' value={searchValue} onChange={this.onSearchChange} />
				</form>

				{list.filter(searchFilter(searchValue)).map((item) => {
					return (
						<div key={item.objectID}>
							<span><a href={item.url}>{item.title}</a></span>
							<span>{item.author}</span>
							<span>{item.num_comments}</span>
							<span>{item.points}</span>
							<span>
								<button onClick={() => this.onDismiss(item.objectID)} type='button'>Dismiss</button>
							</span>
						</div>
					);
				})}
			</div>
		);
	}
}

export default App;
