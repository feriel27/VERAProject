import React, {Component} from "react";

import {BrowserRouter as Router,  Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PrivateRoute from "./common/PrivateRoute";
import Home from "./Home/Home";
// import ChartDistance from "./Chart/ChartDistance";
// import Calories from "./PartieHEALTH/getCalories";
import Login from "./auth/Login";
// import SideBar from "./layout/SideBar";
import Register from "./auth/Register";

import AdminLayout from "../layouts/Admin/Admin";
import UserProfile from "../views/UserProfile";
import Map from "../views/Map";
import Notifications from "../views/Notifications";
import Dashboard from "../views/Dashboard";

// import "assets/scss/black-dashboard-react.scss";
// import "assets/demo/demo.css";
// import "assets/css/nucleo-icons.css";


class root extends Component {
    state = {
        isAuthenticated: false
    };

    static getDerivedStateFromProps(props) {
        const {isAuth} = props;

        if (isAuth) {
            return {isAuthenticated: true};
        } else {
            return {isAuthenticated: false};
        }
    }

    render() {
        // const {isAuthenticated} = this.state;
        return (
            <Router>
                <React.Fragment>
                    <Router>
                        <Switch>
                            {/*<Router history={hist}>*/}
                            {/*  <Switch>*/}

                            {/*    <Route path="/rtl" render={props => <RTLLayout {...props} />} />*/}
                            {/*    <Redirect from="/" to="/admin/dashboard" />*/}
                            {/*  </Switch>*/}
                            {/*</Router>*/}
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <PrivateRoute path="/admin" component={AdminLayout}/>
                            <Route path="/" component={Home}/>


                            <PrivateRoute exact path="/admin/Dashboard-profile" component={Dashboard}/>

                            <PrivateRoute exact path="/admin/user-profile" component={UserProfile}/>
                            <PrivateRoute exact path="/admin/map" component={Map} />
                            <PrivateRoute exact path="/admin/notifications" component={Notifications} />

                            {/*/!*<PrivateRoute*!/*/}
                            {/*/!*  path="/getAllDistances"*!/*/}
                            {/*/!*  exact component={AllDistancesByDate}/>*!/*/}
                            {/*<PrivateRoute path={"/getCalories"} exact component={Calories}/>*/}
                            {/*<PrivateRoute path={"/heartBeat"} exact component={HeartBeat}/>*/}

                            {/*<PrivateRoute*/}
                            {/*  path="/dashboardHEALTH"*/}
                            {/*  exact component={Acceuil}/>*/}


                        </Switch>
                    </Router>
                </React.Fragment>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated
    };
};

root.propTypes = {
    isAuth: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(root);
