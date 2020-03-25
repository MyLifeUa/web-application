import Home from '../views/Home/Home';
import SignIn from '../views/SignIn/SignIn';
import Fitbit from '../views/Fitbit/Fitbit';
import SignUp from '../views/SignUp/SignUp';

import Loading from '../views/Client/Loading';
import ClientDashboard from '../views/Client/Dashboard/Dashboard';

export default [
    { path: '/user/dashboard', component: ClientDashboard },
    { path: '/user', component: Loading },
    { path: '/signup', component: SignUp },
    { path: '/signin', component: SignIn },
    { path: '/', component: Home }
]