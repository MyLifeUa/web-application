import Home from '../views/Home/Home';
import SignIn from '../views/SignIn/SignIn';
import Fitbit from '../views/Fitbit/Fitbit';
import SignUp from '../views/SignUp/SignUp';

import Loading from '../components/Loading/Loading';

import ClientDashboard from '../views/Client/Dashboard/Dashboard';
import DoctorDashboard from '../views/Doctor/Dashboard/Dashboard';
import AdminDashboard from '../views/Admin/Dashboard/Dashboard';

export default [
    { path: '/admin/dashboard', component: AdminDashboard},
    { path: '/admin', component: Loading },
    { path: '/doctor/dashboard', component: DoctorDashboard},
    { path: '/doctor', component: Loading },
    { path: '/client/dashboard', component: ClientDashboard },
    { path: '/client', component: Loading },
    { path: '/signup', component: SignUp },
    { path: '/signin', component: SignIn },
    { path: '/', component: Home }
]