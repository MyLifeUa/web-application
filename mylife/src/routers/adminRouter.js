/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';


// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
// core components/views for RTL layout

import Profile from "views/Admin/Profile/Profile.js"
import Doctors from "views/Admin/Doctors/Doctors.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Admin Profile",
    icon: Person,
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/doctors",
    name: "Manage Doctors",
    icon: LocalHospitalIcon,
    component: Doctors,
    layout: "/admin"
  }
];

export default dashboardRoutes;
