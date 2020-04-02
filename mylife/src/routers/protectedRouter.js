import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Admin from 'layouts/Admin.js';
import Auth from 'layouts/Auth.js'
import Client from 'layouts/Client.js';
import Doctor from 'layouts/Doctor.js';

function PrivateRoute(props) {
    const path = props.path;
    const component = props.component;

    let isAuthenticated = false;

    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(path.includes(currentUser.role))
            isAuthenticated = true;
    }
    catch(error) {}
    
    return isAuthenticated === true ? <Route path={path} component={component} /> : <Redirect to="/signin" /> 
}

// Private paths
export default [
    { path: '/admin/auth', layout: <PrivateRoute path='/admin/auth' component={Auth} /> },
    { path: '/client/auth', layout: <PrivateRoute path='/client/auth' component={Auth} /> },
    { path: '/doctor/auth', layout: <PrivateRoute path='/doctor/auth' component={Auth} /> },
    { path: '/admin', layout: <PrivateRoute path='/admin' component={Admin} /> },
    { path: '/client', layout: <PrivateRoute path='/client' component={Client} /> },
    { path: '/doctor', layout: <PrivateRoute path='/doctor' component={Doctor} /> }
]

    