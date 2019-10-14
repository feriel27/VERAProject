/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {

    Row,

} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addGOAL} from "../../src/store/actions/authActions";

import ActiveGoals from "../components/Goal/ActiveGoals";

class Notifications extends React.Component {


    render() {


        return (
            <>
                <div className="content">
                    <Row>
                        <ActiveGoals/>
                    </Row>

                </div>
            </>
        );
    }
}

Notifications.propTypes = {
    addGOAL: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {addGOAL}
)(Notifications);
