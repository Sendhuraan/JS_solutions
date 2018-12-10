import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { assert } from 'chai';

describe('JSX', function() {

	it('It is neither HTML nor XML. It is used to describe what the UI should look like.');

	it('We can use javascript variable within JSX by wrapping within curly braces {}', function() {

		class Component extends React.Component 
		{
			render() {
				const name = 'Sendhuraan';
				return <h1 ref='node'>Hello, {name}</h1>;
			}
		}

		var comp = ReactTestUtils.renderIntoDocument(<Component/>);
		var renderedOutput = ReactDOM.findDOMNode(comp.refs.node).innerHTML;

		assert.equal(renderedOutput, 'Hello, Sendhuraan');
	});

	it('We can use javascript functions within JSX by wrapping within curly braces {}. In this example, the function cannot be called directly inside class. Hence declared as static and used as <Component Name>.<Function Name>.', function() {

		class Component extends React.Component {

			static formatName(user) {
				return user.firstName + ' ' + user.lastName;
			}

			render() {
				const user = {
					firstName: 'Sendhuraan',
					lastName: 'NKK'
				};

				const element = (
					<h1 ref='node'>
						Hello, {Component.formatName(user)}!
					</h1>
				);

				return element;
			}
		}

		var comp = ReactTestUtils.renderIntoDocument(<Component/>);
		var renderedOutput = ReactDOM.findDOMNode(comp.refs.node).innerHTML;

		assert.equal(renderedOutput, 'Hello, Sendhuraan NKK!');
	});

	it('It can be used as an expression. We can use it in statements like if & for loops. In this example, React fragments (v16.0) are used in getGreeting function to return only the output without any tag.', function() {

		class Component extends React.Component {

			static formatName(user) {
				return user.firstName + ' ' + user.lastName;
			}

			static getGreeting(user) {
				if (user) {
					return <React.Fragment>{Component.formatName(user)}</React.Fragment>;
				}
				return <React.Fragment>{Component.formatName(user)}</React.Fragment>;
			}

			render() {
				const user = {
					firstName: 'Sendhuraan',
					lastName: 'NKK'
				};

				const element = (
					<h1 ref='node'>
						Hello, {Component.getGreeting(user)}!
					</h1>
				);

				return element;
			}
		}

		var comp = ReactTestUtils.renderIntoDocument(<Component/>);
		var renderedOutput = ReactDOM.findDOMNode(comp.refs.node).innerHTML;

		assert.equal(renderedOutput, 'Hello, Sendhuraan NKK!');
	});

	it('Attributes can be used in JSX by specifying in quotes or curly braces. Attributes must be camelcased (tabIndex) rather than normal HTML (tabindex). classes defined on HTML elements must be declared as className.', function() {

		class Component extends React.Component 
		{
			render() {
				const name = 'Sendhuraan';
				const tabValue = 15;
				return <h1 ref='node' className='heading' tabIndex={tabValue}>Hello, {name}</h1>;
			}
		}

		var comp = ReactTestUtils.renderIntoDocument(<Component/>);
		var renderedOutput = ReactDOM.findDOMNode(comp.refs.node).getAttribute('class');

		assert.equal(renderedOutput, 'heading');
	});

	it('It may contain child elements. It should be grouped using parenthesis (). Note: Enclosing element (div) will not be rendered. If the tag is empty, it should be self closed. Example, <img src="avatar.jpg" />', function() {

		class Component extends React.Component 
		{
			render() {
				const imageName = 'avatar.jpg';
				const likeCount = 15;
				return (
					<div ref='node'>
						<img src={imageName} />
						<span>{likeCount}</span>
					</div>
				);
			}
		}

		var comp = ReactTestUtils.renderIntoDocument(<Component/>);
		var renderedChildrenCount = ReactDOM.findDOMNode(comp.refs.node).children.length;

		assert.equal(renderedChildrenCount, 2);
	});

	it('Prevents injection attacks. It can safely be embedded.', function() {

		class Component extends React.Component 
		{
			render() {
				const maliciousInput = '<script>alert("Hacked!")</script>';

				return <div ref='node'>{maliciousInput}</div>;
			}
		}

		var comp = ReactTestUtils.renderIntoDocument(<Component/>);
		var renderedOutput = ReactDOM.findDOMNode(comp.refs.node).innerHTML;

		assert.equal(renderedOutput, '&lt;script&gt;alert("Hacked!")&lt;/script&gt;');
	});

	it('It is compiled using Babel to React.createElement Calls, which are eventually transformed into javascript objects.');

});