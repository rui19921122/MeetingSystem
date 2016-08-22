import * as React from 'react'
import {Route, IndexRoute} from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from './../layouts/CoreLayout/CoreLayout'
import HomeView from './../views/HomeView/HomeView'
import LoginIn from './../views/LoginIn/LoginIn'
import ManageCheck from './../views/ManageCheck'
import UnlearnedStudy from './../views/UnlearnedStudy'
import LearnedStudy from './../views/LearnedStudy'
import LearnedAccident from './../views/LearnedAccident'
import UnlearnedAccident from './../views/UnlearnedAccident'
import ClassPlanView from './../views/ClassPlan'
import QueryListView from './../views/QueryList';
import QueryDetailView from './../views/QueryDetail';

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route path="login" component={ LoginIn }/>
    <Route path="manage-check" component={ ManageCheck }/>
    <Route path="manage-study" component={ UnlearnedStudy }/>
    <Route path="query-study" component={ LearnedStudy }/>
    <Route path="query-accident" component={ LearnedAccident }/>
    <Route path="manage-accident" component={ UnlearnedAccident }/>
    <Route path="class-plan" component={ ClassPlanView }/>
    <Route path="query-check" component={ QueryListView }/>
    <Route path="query-detail/:id/" component={ QueryDetailView }/>
  </Route>
)
