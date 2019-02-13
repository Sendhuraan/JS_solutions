import React, { Component } from 'react';

import Loading from '../Loading';

const withLoading = (Component) => (props) => {
	const { isLoading, ...rest } = props;

	return (
		isLoading
		?
		<Loading />
		:
		<Component { ...rest } />
	);
};

export default withLoading;
