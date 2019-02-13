import React, { Component } from 'react';
import PropTypes from 'prop-types';


function Search(props) {

	const { value, onChange, onSubmit, children } = props;

	return (
		<form onSubmit={onSubmit}>
			{children}
			<input type='text' value={value} onChange={onChange} />
			<input type='submit' value={children} />
		</form>
	);
}

Search.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};

export default Search;
