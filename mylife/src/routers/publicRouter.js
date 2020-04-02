import React from 'react';
import { Route } from 'react-router-dom';

import SignIn from 'layouts/SignIn.js';
import SignUp from 'layouts/SignUp.js';


export default [
    { path: '/signin', layout: <Route path='/signin' component={SignIn} /> },
    { path: '/signup', layout: <Route path='/signup' component={SignUp} /> },
    { path: '/', layout: <Route path='/' component={SignIn} /> },
]