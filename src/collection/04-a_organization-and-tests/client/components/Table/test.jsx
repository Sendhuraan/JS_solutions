import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { assert } from 'chai';

import Table from '../Table';

Enzyme.configure({ adapter: new Adapter() });

describe('Table', function() {
	
	const props = {
		list: [
			{ title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
			{ title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' }
		]
	};

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Table { ...props } />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('shows two items in list', () => {
		const element = shallow(
			<Table { ...props } />
		);

		assert.equal(element.find('.table-row').length, 2);
	});

});
