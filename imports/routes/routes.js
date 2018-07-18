import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, BrowserRouter, Switch, StaticR } from 'react-router-dom'
import { Tracker } from 'meteor/tracker'

import Nav from '../ui/Nav'
import Login from '../ui/Login'


// class App extends React.Component {
export const routes = (
      <BrowserRouter>
          <Route component={Nav} />
      </BrowserRouter>
    )
