import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Search extends Component {

	componentDidMount() {
		if(this.input) {
			this.input.focus();
		}
	}

	render() {
		const { value, onChange, onSubmit, children } = this.props;
		return (
			<form onSubmit={onSubmit}>
				{children}
				<input type='text' value={value} onChange={onChange}
				ref={ el => { this.input = el; } } />
				<input type='submit' value={children} />
			</form>
		);
	}
}

Search.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};

export default Search;
