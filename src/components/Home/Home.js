import React from "react";
import {connect} from "react-redux";
import {logoutUser} from "../../store/actions/authActions";
import {withRouter, Link} from "react-router-dom";


class Home extends React.Component {
    state = {
        isOpen: false
    };
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div id="page">

                <Link
                    to="/login"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        color: "blue"
                    }}
                    className="btn btn-large btn-flat waves-effect white black-text"
                >
                    <span>Sign In</span>
                </Link>


            </div>


    );

    }
    }

    const mapStateToProps = (state, ownProps) => {
        return {
        user: state.auth.user
        // invitations: state.profile.invitations
    };
    };

    Home.propTypes = {
        // logoutUser: PropTypes.func.isRequired,
        // user: PropTypes.object.isRequired
    };

    export default withRouter(connect(
    mapStateToProps,
    {logoutUser}
    )(Home));
