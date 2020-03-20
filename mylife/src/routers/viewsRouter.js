import Home from '../views/Home/Home';
import SignIn from '../views/SignIn/SignIn';
import Fitbit from '../views/Fitbit/Fitbit';
import SignUp from '../views/SignUp/SignUp';

export default [
    { path: '/fitbit', component: Fitbit },
    { path: '/signup', component: SignUp },
    { path: '/signin', component: SignIn },
    { path: '/', component: Home }
]