import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../views/Home/Home';
import SignIn from '../views/SignIn/SignIn';
import SignUp from '../views/SignUp/SignUp';

export default [
    { path: '/signup', component: <Route path='/signup' component={SignUp} /> },
    { path: '/signin', component: <Route path='/signin' component={SignIn} /> },
    { path: '/', component: <Route path='/' component={Home} /> }
]