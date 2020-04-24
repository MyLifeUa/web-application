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
// core components/views for Admin layout
import DashboardPage from "views/Doctor/Dashboard/Dashboard.js";

import AccessibleIcon from '@material-ui/icons/Accessible';



import Patients from "views/Doctor/Patients/Patients.js"
import Profile from "views/Doctor/Profile/Profile.js"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/doctor"
  },
  {
    path: "/profile",
    name: "Doctor Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Profile,
    layout: "/doctor"
  },
  {
    path: "/patients",
    name: "Manage Patients",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AccessibleIcon,
    component: Patients,
    layout: "/doctor"
  }
];

export default dashboardRoutes;
