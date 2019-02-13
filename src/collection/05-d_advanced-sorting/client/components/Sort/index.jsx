import React, { Component } from 'react';
import classNames from 'classnames';

import Button from '../Button';

function Sort(props) {

	const {
		sortKey,
		activeSortKey,
		onSort,
		children

	} = props;

	const sortClass = classNames(
		'button-inline',
		{ 'button-active': sortKey === activeSortKey }
	);

	return (
		<Button
			onClick={() => onSort(sortKey)}
			className={sortClass}
		>
			{children}
		</Button>
	);
}

export default Sort;
