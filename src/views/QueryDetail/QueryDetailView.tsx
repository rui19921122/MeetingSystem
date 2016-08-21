import {Row, Col} from 'antd';
import * as React from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import Route = ReactRouter.Route;
interface Props {
  dispatch: Dispatch,
  query_detail: any,
  route: Route
}

export class QueryDetailView extends React.Component<Props,any> {
  constructor(props) {
    super(props)
  }

  ComponentDidMount() {

  }

}

const mapStateToProps = (state) => ({
  menu: state.menu,
  query_list: state.query_list,
  query_detail: state.query_detail
});
export default connect(mapStateToProps)(QueryDetailView)
