import Home from '../views/Home/Home';
import SignIn from '../views/SignIn/SignIn';
import Fitbit from '../views/Fitbit/Fitbit';

export default [
    { path: '/fitbit', component: Fitbit },
    { path: '/signin', component: SignIn },
    { path: '/', component: Home }
]