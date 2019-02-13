import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';


function Table(props) {

	const { list, onDismiss } = props;

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
			{list.map((item) => {
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

Table.propTypes = {
	list: PropTypes.array.isRequired,
	onDismiss: PropTypes.func.isRequired
};

export default Table;
