"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _testUtils = _interopRequireDefault(require("react-dom/test-utils"));

var _simpleComponent = _interopRequireDefault(require("./simple-component.js"));

var _chai = require("chai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('component', function () {
  it('exists', function () {
    var comp = _testUtils.default.renderIntoDocument(_react.default.createElement(_simpleComponent.default, null));

    _chai.assert.exists(comp);
  });
  it('is a Composite Component', function () {
    var comp = _testUtils.default.renderIntoDocument(_react.default.createElement(_simpleComponent.default, null));

    _chai.assert.equal(_testUtils.default.isCompositeComponent(comp), true);
  });
  it('finds the DOM Node', function () {
    var comp = _testUtils.default.renderIntoDocument(_react.default.createElement(_simpleComponent.default, {
      name: "Sendhuraan"
    }));

    var nodeValue = _reactDom.default.findDOMNode(comp.refs.node).innerHTML;

    _chai.assert.equal(nodeValue, 'Hello, Sendhuraan');
  });
});