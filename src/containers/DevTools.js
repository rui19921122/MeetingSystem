"use strict";
const React = require('react');
const redux_devtools_1 = require('redux-devtools');
const redux_devtools_log_monitor_1 = require('redux-devtools-log-monitor');
const redux_devtools_dock_monitor_1 = require('redux-devtools-dock-monitor');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_devtools_1.createDevTools(React.createElement(redux_devtools_dock_monitor_1.default, {toggleVisibilityKey: 'ctrl-h', changePositionKey: 'ctrl-q'}, React.createElement(redux_devtools_log_monitor_1.default, null)));
//# sourceMappingURL=DevTools.js.map