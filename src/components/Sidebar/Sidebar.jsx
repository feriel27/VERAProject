import React from "react";
import {NavLink,  withRouter} from "react-router-dom";
// nodejs library to set properties for components
import {PropTypes} from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import {Button, Collapse, Container, Label, Nav, Navbar, NavbarBrand} from "reactstrap";

import '../../App.css'
import {connect} from "react-redux";
import {logoutUser} from "../../store/actions/authActions";
import classNames from "classnames";

var ps;

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            modalSearch: false,
            color: "navbar-transparent"
        };

        this.activeRoute.bind(this);
    }

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.sidebar, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateColor);

        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }

    linkOnClick = () => {
        document.documentElement.classList.remove("nav-open");
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

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


    render() {
        const {bgColor, routes, rtlActive, logo} = this.props;
        let logoImg = null;
        let logoText = null;
        // if (logo !== undefined) {
        //     // if (logo.outterLink !== undefined) {
        //     //     logoImg = (
        //     //         <a
        //     //             href={logo.outterLink}
        //     //             className="simple-text logo-mini"
        //     //             target="_blank"
        //     //             onClick={this.props.toggleSidebar}
        //     //         >
        //     //             <div className="logo-img">
        //     //                 <img src={logo.imgSrc} alt="react-logo"/>
        //     //             </div>
        //     //         </a>
        //     //     );
        //     //     logoText = (
        //     //         <a
        //     //             href={logo.outterLink}
        //     //             className="simple-text"
        //     //             // target="_blank"
        //     //             style={{marginLeft: '50px', color: '#53F3CE', fontSize: '25px', font: 'Panton Regular'}}
        //     //             onClick={this.props.toggleSidebar}
        //     //         >
        //     //             {logo.text}
        //     //         </a>
        //     //     );
        //     // } else {
        //         // logoImg = (
        //         //   <Link
        //         //     to={logo.innerLink}
        //         //     className="simple-text logo-mini"
        //         //     onClick={this.props.toggleSidebar}
        //         //   >
        //         //     <div className="logo-img">
        //         //       <img src={logo.imgSrc} alt="react-logo" />
        //         //     </div>
        //         //   </Link>
        //         // );
        //         logoText = (
        //             <Link
        //                 // to={logo.innerLink}
        //                 className="simple-text logo-normal"
        //                 style={{fontFamily:'Panton regular',size:'60'}}
        //                 onClick={this.props.toggleSidebar}
        //             >
        //                 {logo.text}
        //             </Link>
        //         );
        //     }
        // }
        const {user} = this.props.auth;
        console.log(user);
        return (
            <>
            <Navbar
                className={classNames("navbar-absolute", this.state.color)} height="500px">
                <Container fluid>
                    <div className="navbar-wrapper">
                        <div
                            className={classNames("navbar-toggle d-inline", {
                                toggled: this.props.sidebarOpened
                            })}
                        >
                            <button
                                className="navbar-toggler"
                                type="button"
                                onClick={this.props.toggleSidebar}
                            >
                                <span className="navbar-toggler-bar bar1"/>
                                <span className="navbar-toggler-bar bar2"/>
                                <span className="navbar-toggler-bar bar3"/>
                            </button>
                        </div>
                        <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                            {/*{this.props.brandText}*/}
                        </NavbarBrand>
                    </div>
                    <button
                        aria-expanded={false}
                        aria-label="Toggle navigation"
                        className="navbar-toggler"
                        data-target="#navigation"
                        data-toggle="collapse"
                        id="navigation"
                        type="button"
                        onClick={this.toggleCollapse}
                    >
                        <span className="navbar-toggler-bar navbar-kebab"/>
                        <span className="navbar-toggler-bar navbar-kebab"/>
                        <span className="navbar-toggler-bar navbar-kebab"/>
                    </button>
                    <Collapse navbar isOpen={this.state.collapseOpen}>

                    </Collapse>
                </Container>
                <div className="sidebar">
                    <div className="sidebar-wrapper" ref="sidebar">
                        <div className="d-flex  flex-column justify-content-lg-center" >
                            <div className="logo-img" style={{marginTop: '50px',marginLeft:'15px'}}>
                                <img alt={"logo-cal"} src={require('../../assets/img/logo.png')}
                                style={{width:'180px',height:'35px'}}
                                />
                            </div>
                            <div className="d-flex flex-row justify-content-start "
                                 style={{
                                     marginTop: '20px',
                                     // marginButtom: '0%',
                                     marginLeft: '20px'
                                 }}>
                                <div className="photo">
                                    <img alt="..." src={user.imageProfile}/>
                                </div>
                                <div className="text-left"
                                     style={{color: 'white', marginTop: '5px', marginLeft: '10px'}}>
                                  <Label>  {user.name}</Label>
                                </div>
                            </div>
                        </div>
                        <Nav style={{marginTop: '40px'}}>
                            {routes.map((prop, key) => {
                                if (prop.redirect) return null;
                                return (
                                    <li
                                        className={
                                            this.activeRoute(prop.path) +
                                            (prop.pro ? " active-pro" : "")
                                        }
                                        key={key}
                                    >
                                        <NavLink
                                            to={prop.layout + prop.path}
                                            className="nav-link"
                                            onClick={this.props.toggleSidebar}
                                        >
                                            <div className="d-flex flex-row justify-content-start">

                                                <img alt={'logo'} src={prop.icon} width={prop.width}
                                                     height={prop.height}/>
                                                <p style={{
                                                    width: '50px',
                                                    marginTop: '-3px',
                                                    marginLeft: '13px',
                                                    fontSize: '13px',
                                                    fontWeight:'normal',
                                                    fontFamily: "panton ,sans-serif"
                                                }}>{prop.name}</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </Nav>
                        <Nav className=" active-pro"
                             onClick={this.props.toggleSidebar}
                             style={{marginTop: '170px', backgroundColor: 'red'}}
                        >
                            <li className="active-pro">
                                <Button
                                    style={{
                                        position: 'absolute',
                                        marginLeft: '15px',
                                        hoverBackgroundColor: "transparent",
                                        backgroundColor: 'Transparent',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        outline: 'none',
                                        backgroundImage: 'none'
                                    }}
                                    className="nav-link"
                                    onClick={this.onLogoutClick}

                                >
                                    <div className="d-flex flex-row justify-content-between">
                                        <img alt="logo-logout"
                                             height='20px'
                                        width='20px'
                                             style={{
                                                 marginLeft: '-8px',}}
                                         src={require("../../assets/img/log out.png")}/>
                                    <p
                                        style={{
                                            width: '50px',
                                            marginTop: '-3px',
                                            paddingLeft: '12px',
                                            fontSize: '13px',
                                            fontWeight:'normal',
                                            fontFamily: "panton ,sans-serif"
                                        }}>{"Log out"}</p>
                    </div>
                </Button>
            </li>
            </Nav>
    </div>
    </div>
    </Navbar>
    </>

    )
        ;
    }
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
    auth: state.auth,

});
export default withRouter(connect(
    mapStateToProps,
    {logoutUser}
)(Sidebar));

//
// Sidebar.defaultProps = {
//   rtlActive: false,
//   bgColor: "primary",
//   routes: [{}]
// };
//
// Sidebar.propTypes = {
//   // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
//   // insde the links of this component
//   rtlActive: PropTypes.bool,
//   bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
//   routes: PropTypes.arrayOf(PropTypes.object),
//   logo: PropTypes.shape({
//     // innerLink is for links that will direct the user within the app
//     // it will be rendered as <Link to="...">...</Link> tag
//     innerLink: PropTypes.string,
//     // outterLink is for links that will direct the user outside the app
//     // it will be rendered as simple <a href="...">...</a> tag
//     outterLink: PropTypes.string,
//     // the text of the logo
//     text: PropTypes.node,
//     // the image src of the logo
//     imgSrc: PropTypes.string
//   })
// };
//
// export default Sidebar;
