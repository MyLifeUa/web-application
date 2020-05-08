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
import Timeline from "@material-ui/icons/Timeline";
import FoodIcon from "@material-ui/icons/Fastfood";
// core components/views for Admin layout
import DashboardPage from "views/Client/Dashboard/Dashboard.js";

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
// core components/views for RTL layout

import Profile from "views/Client/Profile/Profile.js";
import History from "views/Client/History/History.js"
import FoodLogs from "views/Client/FoodLogs/FoodLogs.js";
import Doctor from "views/Client/Doctor/Doctor.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/client"
  },
  {
    path: "/profile",
    name: "Client Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Profile,
    layout: "/client"
  },
  {
    path: "/history",
    name: "Health History",
    icon: Timeline,
    component: History,
    layout: "/client"
  },
  {
    path: "/food-logs",
    name: "Food Logs",
    icon: FoodIcon,
    component: FoodLogs,
    layout: "/client"
  },
  {
    path: "/doctor",
    name: "Doctor Details",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LocalHospitalIcon,
    component: Doctor,
    layout: "/client"
  }
];

export default dashboardRoutes;
