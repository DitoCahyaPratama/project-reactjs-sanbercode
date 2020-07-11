import React, {useState, useEffect} from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'
import firebase from '../config/firebase'

import Login from '../pages/user/auth/Login';
import Register from '../pages/user/auth/Register';
import My_Profile from '../pages/user/My_Profile';

import Dashboard from '../pages/Dashboard';
import Homepage from '../pages/Homepage';
import About from '../pages/About';

import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import { notification } from 'antd';

import { connect } from 'react-redux';
import { setUser } from '../actions';

function App(props) {
  
  useEffect(() => {
    const auth = () => {
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          props.setUser(user)
          props.history.push('/Dashboard')
        }
      })
    }
    auth()
  },[])

  return (
    <Switch>
        <Route exact path="/" component={Homepage} />
				<Route path="/login" render={(props) => <Login {...props} />} />
				<Route path="/register" component={Register}  />
    </Switch>
  )
}


export default withRouter(connect(null, { setUser })(App))