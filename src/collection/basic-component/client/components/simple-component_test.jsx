import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import SimpleComponent from './simple-component.js';
import { assert } from 'chai';

describe('component', function() {

	it('exists', function() {
		var comp = ReactTestUtils.renderIntoDocument(<SimpleComponent/>);
		assert.exists(comp);
	});

	it('is a Composite Component', function() {
		var comp = ReactTestUtils.renderIntoDocument(<SimpleComponent/>);

		assert.equal(ReactTestUtils.isCompositeComponent(comp), true);
	});

	it('finds the DOM Node', function() {
		var comp = ReactTestUtils.renderIntoDocument(<SimpleComponent name='Sendhuraan' />);

		var nodeValue = ReactDOM.findDOMNode(comp.refs.node).innerHTML;

		assert.equal(nodeValue, 'Hello, Sendhuraan');
	});

});