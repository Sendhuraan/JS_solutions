import React, { Component } from 'react';
import PropTypes from 'prop-types';


function Button(props) {

	const { className = '', onClick, children } = props;

	return (
		<input type='button' className={className} onClick={onClick} value={children} />
	);
}

Button.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};

export default Button;
