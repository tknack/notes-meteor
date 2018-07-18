import React from 'react'

import PrivateHeader from './PrivateHeader'

class Link  extends React.Component {
  componentDidMount() {
    if (Meteor.userId()){
      this.props.history.replace('/dashboard');
    } else {
      this.props.history.replace('/');
    }
  }
  render () {
    return (
      <div>
      <PrivateHeader title="Dashboard" history={this.props.history}/>
      <div className="page-content">
        Dashboard page content.
      </div>
    </div>
    )
  }
}

export default Link
