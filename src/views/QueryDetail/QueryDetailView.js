"use strict";
const React = require('react');
const react_redux_1 = require("react-redux");
class QueryDetailView extends React.Component {
    constructor(props) {
        super(props);
    }
    ComponentDidMount() {
    }
}
exports.QueryDetailView = QueryDetailView;
const mapStateToProps = (state) => ({
    menu: state.menu,
    query_list: state.query_list,
    query_detail: state.query_detail
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(QueryDetailView);
//# sourceMappingURL=QueryDetailView.js.map