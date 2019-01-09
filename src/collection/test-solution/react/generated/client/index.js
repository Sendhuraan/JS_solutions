"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _simpleComponent = _interopRequireDefault(require("./components/simple-component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderDiv = document.createElement('div');
document.body.appendChild(renderDiv);

_reactDom.default.render(_react.default.createElement(_simpleComponent.default, {
  name: "Sendhuraan"
}), renderDiv);