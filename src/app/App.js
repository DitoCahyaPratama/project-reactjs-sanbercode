import React from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'

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

function App() {
  return (
    <Switch>
        <Route exact path="/" component={Homepage} />
				<Route path="/login" render={(props) => <Login {...props} />} />
				<Route path="/register" component={Register}  />
        
    </Switch>
  )
}

export default App