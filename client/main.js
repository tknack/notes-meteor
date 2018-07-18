import { Meteor } from 'meteor/meteor'
import ReactDOM from 'react-dom'
// import { Router, Route, BrowserRouter, Switch, StaticR } from 'react-router-dom'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'

import { routes } from '../imports/routes/routes'
import '../imports/startup/simple-schema-configuration.js'

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'))
})
