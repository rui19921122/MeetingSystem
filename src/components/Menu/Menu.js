/**
 * Created by Administrator on 4/20/2016.
 */
///<reference path="../../../typings/browser.d.ts"/>
"use strict";
const antd_1 = require('antd');
const React = require('react');
const react_router_1 = require('react-router');
const menu_1 = require('../../redux/modules/menu');
class CustomMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    ;
    componentDidMount() {
        if (this.props.menu.get) { }
        else {
            this.props.dispatch(menu_1.getMenu());
        }
    }
    static processSingle(single, index) {
        return React.createElement(antd_1.Menu.Item, {key: single.key}, React.createElement(react_router_1.Link, {to: single.href}, single.name));
    }
    ;
    static processMultiChildren(single, index) {
        return React.createElement(antd_1.Menu.Item, {key: single.key}, React.createElement(react_router_1.Link, {to: single.href}, single.name));
    }
    ;
    static processMulti(multi, index) {
        return (React.createElement(antd_1.Menu.SubMenu, {title: multi.name, key: index + 1}, multi.children.map(CustomMenu.processMultiChildren)));
    }
    ;
    static process(inner, index) {
        if (inner.type === 'single') {
            return CustomMenu.processSingle(inner, index);
        }
        else {
            return CustomMenu.processMulti(inner, index);
        }
    }
    render() {
        return (React.createElement(antd_1.Menu, {mode: "inline"}, this.props.menu.items.map(CustomMenu.process)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomMenu;
//# sourceMappingURL=Menu.js.map