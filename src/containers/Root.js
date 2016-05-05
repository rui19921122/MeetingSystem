"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
class Root extends React.Component {
    get content() {
        return (React.createElement(react_router_1.Router, {history: this.props.history}, this.props.routes));
    }
    get devTools() {
        let __DEBUG__ = true;
        let __DEBUG_NEW_WINDOW__ = true;
        if (__DEBUG__) {
            if (__DEBUG_NEW_WINDOW__) {
                if (!window.devToolsExtension) {
                    require('../redux/utils/createDevToolsWindow').default(this.props.store);
                }
                else {
                    window.devToolsExtension.open();
                }
            }
            else if (!window.devToolsExtension) {
                const DevTools = require('containers/DevTools').default;
                return React.createElement(DevTools, null);
            }
        }
    }
    render() {
        return (React.createElement(react_redux_1.Provider, {store: this.props.store}, 
            React.createElement("div", {style: { height: '100%' }}, 
                this.content, 
                this.devTools)
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Root;
//# sourceMappingURL=Root.js.map