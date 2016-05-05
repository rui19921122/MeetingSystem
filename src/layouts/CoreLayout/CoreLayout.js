"use strict";
const React = require('react');
const antd_1 = require('antd');
require('../../styles/core.scss');
function CoreLayout({ children }) {
    return (React.createElement(antd_1.Row, null, 
        React.createElement("div", {className: 'page-container'}, 
            React.createElement("div", {className: 'view-container'}, children)
        )
    ));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CoreLayout;
//# sourceMappingURL=CoreLayout.js.map