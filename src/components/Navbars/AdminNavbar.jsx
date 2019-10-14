
import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";
import { withRouter } from "react-router-dom";


class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {

    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };




  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { user } = this.props.auth;
    console.log(user);

    return (
      <>
        {/*<Navbar*/}
        {/*  className={classNames("navbar-absolute", this.state.color)}*/}
        {/*  expand="lg"*/}
        {/*>*/}
        {/*  <Container fluid>*/}
        {/*    <div className="navbar-wrapper">*/}
        {/*      <div*/}
        {/*        className={classNames("navbar-toggle d-inline", {*/}
        {/*          toggled: this.props.sidebarOpened*/}
        {/*        })}*/}
        {/*      >*/}
        {/*        <button*/}
        {/*          className="navbar-toggler"*/}
        {/*          type="button"*/}
        {/*          onClick={this.props.toggleSidebar}*/}
        {/*        >*/}
        {/*          <span className="navbar-toggler-bar bar1" />*/}
        {/*          <span className="navbar-toggler-bar bar2" />*/}
        {/*          <span className="navbar-toggler-bar bar3" />*/}
        {/*        </button>*/}
        {/*      </div>*/}
        {/*      <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>*/}
        {/*        /!*{this.props.brandText}*!/*/}
        {/*      </NavbarBrand>*/}
        {/*    </div>*/}
        {/*    <button*/}
        {/*      aria-expanded={false}*/}
        {/*      aria-label="Toggle navigation"*/}
        {/*      className="navbar-toggler"*/}
        {/*      data-target="#navigation"*/}
        {/*      data-toggle="collapse"*/}
        {/*      id="navigation"*/}
        {/*      type="button"*/}
        {/*      onClick={this.toggleCollapse}*/}
        {/*    >*/}
        {/*      <span className="navbar-toggler-bar navbar-kebab" />*/}
        {/*      <span className="navbar-toggler-bar navbar-kebab" />*/}
        {/*      <span className="navbar-toggler-bar navbar-kebab" />*/}
        {/*    </button>*/}
        {/*    <Collapse navbar isOpen={this.state.collapseOpen}>*/}

        {/*    </Collapse>*/}
        {/*  </Container>*/}
        {/*</Navbar>*/}
      </>
    );
  }
}

AdminNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth,

});
export default withRouter(connect(
    mapStateToProps,
    { logoutUser }
)(AdminNavbar));
