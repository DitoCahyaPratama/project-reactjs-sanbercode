import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import firebase from '../config/firebase';

import Login from '../pages/user/auth/Login';
import Register from '../pages/user/auth/Register';
import My_Profile from '../pages/user/My_Profile';

import Navigation from '../component/Navigation';
import Dashboard from '../pages/Dashboard';
import Homepage from '../pages/Homepage';
import About from '../pages/About';

import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import { notification } from 'antd';

import { useDispatch } from 'react-redux';
import allActions from '../actions';

function App(props) {
	const dispatch = useDispatch();

	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const auth = () => {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					// setIsAuth(true)
					// props.history.push('/dashboard')
					dispatch(allActions.userActions.setUser(user));
					// notification.success({
					//   message: 'Noted',
					//   description: "You're successfully login. Welcome to NOTED!",
					// });
				} else {
					// props.history.push('/')
					dispatch(allActions.userActions.clearUser());
				}
			});
		};
		auth();
	});

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

export default withRouter(App);
