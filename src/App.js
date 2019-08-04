import React, { Component } from 'react';
import './App.css';
import index from './index'
import SignInForm from './SignInForm'
import Navbar from './Navbar'
import Home from './Home'
import PIChart from './PIChart'
import ManageStakeholder from './ManageStakeholder'
import Header from './Header'
import { Route, Switch, withRouter } from 'react-router-dom'
import APILogin from './APILogin'
import UserProjects from './UserProjects'
import SignUpForm from './SignUpForm'
import SupportChart from './SupportChart'
import HowToRate from './HowToRate'
import AliasChart from './AliasChart'
import ManageProject from './ManageProject'

// import {StyleSheet, View, WebView} from 'react-native';


class App extends Component {
constructor() {
  super()
    this.state = {
      username: '',
      user: null,
    }
}

signin = (username, token, user) => {
  this.setState({ username, user })
  localStorage.setItem('token', token)
}

signout = () => {
  this.setState({ username: '', user: null })
  localStorage.removeItem('token')
}


componentDidMount () {
    APILogin.validate()
      .then(data => {
        if (data.error) {
          this.props.history.push('/signin')
        } else {
          this.signin(data.username, data.token, data.user)
          this.props.history.push('/projects')
        }
      })
  }



  render() {
    const { signin, signout } = this
    const { username, user } = this.state

return (
      <div>
        <div>
          <Navbar className="navbar"/>
          <Header username={username} signout={signout} className="signout_header" />
            <Switch>
              <Route exact path="/projects" component={routerProps =>
              <UserProjects {...routerProps} user={user} username={username} />} />
              <Route exact path="/PI_Chart/:id" component={routerProps =>
              <PIChart {...routerProps} username={username} />} />
              <Route exact path="/alias_chart/:id" component={routerProps =>
              <AliasChart {...routerProps} username={username} />} />
              <Route exact path="/signin" component={routerProps =>
              <SignInForm {...routerProps} signin={signin}/>} />
              <Route exact path="/signup" component={routerProps =>
                <SignUpForm {...routerProps} />
              } />
              <Route exact path="/how_to_rate" component={routerProps =>
                <HowToRate {...routerProps} />
              } />
              <Route exact path="/support/:id" component={routerProps =>
                <SupportChart {...routerProps} username={username} /> } />
              <Route exact path="/manage_stakeholder/:stakeholder_id/project/:project_id" component={routerProps =>
                <ManageStakeholder {...routerProps} username={username} />
              } />
              <Route exact path="/manage_project/:id" component={routerProps =>
                <ManageProject {...routerProps} username={username} /> } />
              <Route path="/" component={Home} />
            </Switch>
      </div>
    </div>
    );
  }
}


export default withRouter(App);
