import * as React from 'react'
import { Route, IndexRoute } from 'react-router'

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

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path="login" component={ LoginIn }/>
    <Route path="manage-check" component={ ManageCheck }/>
    <Route path="manage-study" component={ UnlearnedStudy }/>
  </Route>
)
