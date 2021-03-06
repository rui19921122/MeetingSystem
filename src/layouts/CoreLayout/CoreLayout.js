"use strict";
const React = require('react');
const antd_1 = require('antd');
require('../../styles/core.scss');
// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout({ children }) {
    return (React.createElement(antd_1.Row, null, React.createElement("div", {className: 'page-container'}, React.createElement("div", {className: 'view-container'}, children))));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CoreLayout;
//# sourceMappingURL=CoreLayout.js.map