import React, { Component } from 'react';

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
			<div className='page'>
				<div className='interactions'>
					<Search value={searchValue} onChange={this.onSearchChange}>
						Search Books 
					</Search>
					<Table list={list} searchPattern={searchValue} onDismiss={this.onDismiss} />
				</div>
			</div>
		);
	}
}

function Search(props) {

	const { value, onChange, children } = props;

	return (
		<form>
			{children}
			<input type='text' value={value} onChange={onChange} />
		</form>
	);
}

function Table(props) {

	const { list, searchPattern, onDismiss } = props;

	const largeColumn = {
		width: '40%'
	};

	const midColumn = {
		width: '30%'
	};

	const smallColumn = {
		width: '10%'
	};

	return (
		<div className='table'>
			{list.filter(searchFilter(searchPattern)).map((item) => {
				return (
					<div className='table-row' key={item.objectID}>
						<span style={ largeColumn }><a href={item.url}>{item.title}</a></span>
						<span style={ midColumn }>{item.author}</span>
						<span style={ smallColumn }>{item.num_comments}</span>
						<span style={ smallColumn }>{item.points}</span>
						<span>
							<Button className='button-inline' onClick={() => onDismiss(item.objectID)}>
								Dismiss
							</Button>
						</span>
					</div>
				);
			})
			}
		</div>
	);
}

function Button(props) {

	const { className = '', onClick, children } = props;

	return (
		<input type='button' className={className} onClick={onClick} value={children} />
	);
}

export default App;
