import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import firebase from '../config/firebase';

import Login from '../pages/user/auth/Login';
import Register from '../pages/user/auth/Register';

import Navigation from '../component/Navigation';
import Dashboard from '../pages/Dashboard';
import Homepage from '../pages/Homepage';

import { connect } from 'react-redux';
import { setUser, clearUser } from '../actions';

import { notification } from 'antd'

class App extends Component{

	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.props.history.push('/dashboard')
				notification.success({
				  message: 'Noted',
				  description: "You're successfully login. Welcome to NOTED!",
				});
			} else {
				this.props.clearUser()				
				if(this.props.location.pathname === '/login' ||
				this.props.location.pathname === '/' ||
				this.props.location.pathname === '/register'){

				}else{
					this.props.history.push('/')
				}
			}
		});
	}
	
	render(){
		return (
			<Switch>
				<Route exact path="/" component={Homepage} />
				<Route path="/login" render={(props) => <Login {...props} />} />
				<Route path="/register" component={Register} />
				<div className="App">
					<Navigation />
					<Route path="/dashboard" component={Dashboard} />
				</div>
			</Switch>
		);
	}
}

const RootWithAuth = withRouter(
	connect(
		null, 
		{ setUser, clearUser }
	)(App)
)

export default RootWithAuth;
