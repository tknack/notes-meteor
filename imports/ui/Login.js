import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom'

class Login  extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        error: ''
      }
      // window.location = props.location
  }

  componentDidMount() {
    if (Meteor.userId()){
      this.props.history.push('/dashboard');
    } else {
      this.props.history.push('/');
    } 
  }

  onSubmit (e) {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({error: 'impossible de se connecter. Vérifiez votre email et mot de passe'})
      }else {
        this.setState({error: ''})
      }
    })
  }
  render () {

    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
           <h1>Login</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="Email" />
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Login</button>
            </form>

          <Link to="/signup">Have an account ?</Link>
      </div>
      </div>
    )
  }
}

export default Login
