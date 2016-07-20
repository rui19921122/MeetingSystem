///<reference path="../../../typings/browser.d.ts"/>
///<reference path="../../../typings/browser/ambient/react/index.d.ts"/>
"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const antd_1 = require('antd');
const Menu_1 = require('../../components/Menu');
class HomeView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, {span: 4}, React.createElement(Menu_1.default, {menu: this.props.menu, dispatch: this.props.dispatch}))));
    }
}
exports.HomeView = HomeView;
const mapStateToProps = (state) => ({
    counter: state.counter,
    menu: state.menu
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(HomeView);
//# sourceMappingURL=HomeView.js.map