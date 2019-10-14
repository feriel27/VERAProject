
import Statistic from "views/Dashboard.jsx";
import LeaderBoard from "views/Map.jsx";
import Notifications from "views/Notifications.jsx";
import UserProfile from "views/UserProfile.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Stat",
    rtlName: "لوحة القيادة",
    icon: require('./assets/img/statistique.png'),
    marginTop:'1px',
    height:'20px',
    width:'20px',
    component: Statistic,
    layout: "/admin"
  },
  {
    path: "/leaderBoard",
    name: "LeaderBoard",
    rtlName: "خرائط",
    icon: require('./assets/img/leader board.png'),
    height:'20px',
    width:'20px',
    marginTop:'0px',
    component: LeaderBoard,
    layout: "/admin"
  },
  {
    path: "/Goals",
    name: "Goals",
    rtlName: "إخطارات",
    icon: require('./assets/img/goals.png'),
    marginTop:'1px',
    height:'20px',
    width:'20px',
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Setting",
    rtlName: "ملف تعريفي للمستخدم",
    icon: require('./assets/img/setting.png'),
    marginTop:'1px',
    height:'20px',
    width:'20px',
    component: UserProfile,
    layout: "/admin"
  }

];
export default routes;
