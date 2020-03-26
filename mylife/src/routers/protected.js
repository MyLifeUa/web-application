import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loading from '../components/Loading/Loading';
import ClientDashboard from '../views/Client/Dashboard/Dashboard';
import DoctorDashboard from '../views/Doctor/Dashboard/Dashboard';
import AdminDashboard from '../views/Admin/Dashboard/Dashboard';


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
    
    return isAuthenticated == true ? <Route path={props.path} component={props.component} /> : <Redirect to="/signin" /> 
}


export default [
    { path: '/admin/dashboard', component: <PrivateRoute path='/doctor/dashboard' component={AdminDashboard} />},
    { path: '/admin', component: <PrivateRoute path='/admin' component={Loading} /> },
    { path: '/doctor/dashboard', component: <PrivateRoute path='/doctor/dashboard' component={DoctorDashboard} /> },
    { path: '/doctor', component: <PrivateRoute path='/doctor' component={Loading} /> },
    { path: '/client/dashboard', component: <PrivateRoute path='/client/dashboard' component={ClientDashboard} />  },
    { path: '/client', component: <PrivateRoute path='/client' component={Loading} /> }
]