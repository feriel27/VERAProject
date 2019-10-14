import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Form, CardHeader, CardBody, Card, FormGroup, Input} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/authActions";
import classnames from "classnames";
import "../../App.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            showPassword: false,
            email: "",
            password: "",
            checkedValue: null,
            dossierValide: null,
            Avis: "",
            gender: null,
            type: null,
            typeValue: null,
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/admin/Dashboard");
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/admin/Dashboard"); // push user to dashboard when they login
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }


    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
        // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    render() {
        const {errors} = this.state;
        console.log(errors);
        return (

            <div className="d-flex flex-row justify-content-center">
                <div className="card text-center" id={'divBackLogin'}
                     style={{marginTop: "30px", height: '600px', width: "500px"}}>
                    <h1 style={{
                        marginTop: '60px', fontSize: '50px',
                        fontFamily: 'panton ,sans-serif', color: 'white'
                    }}>VERA</h1>
                    <h4 style={{
                        marginTop: '40px', fontSize: '30px',
                        fontFamily: 'panton ,sans-serif', color: 'white'
                    }}>
                        Welcome to VERA</h4>
                    <p style={{
                        marginTop: '40px', fontSize: '20px',
                        fontFamily: 'Panton ,sans-serif', color: 'white'
                    }}>If you want to join use<br/>Simply create your account </p>
                    <p>
                        <Link to="/register"
                              style={{fontFamily: 'Panton ,sans-serif', fontSize: '15px', color: 'white',marginTop: '90px'}}
                              id={'btnLogin'}>Register</Link>
                    </p>
                </div>
                <Card className="card text-center" style={{marginTop: "30px", height: '600px', width: "500px"}}>
                    <CardHeader className="d-flex flex-row justify-content-sm-between"
                                style={{
                                    marginLeft: '40px',
                                    marginTop: "30px",
                                    paddingBottom: '0%',
                                    paddingTop: '20%',
                                    marginRight: '10px',
                                    fontSize: '22px',
                                    fontFamily: 'panton ,sans-serif',
                                    fontWeight: 'bold',
                                    color: '#53F3CE'
                                }}>Sign in
                    </CardHeader>
                    <CardBody style={{marginTop: "2px", marginLeft: '40px'}}>
                        <Form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                {/*<Label htmlFor="email" style={{fontSize:'15px',*/}
                                {/*    fontFamily:'panton ,sans-serif'}}>Email</Label>*/}

                                <Input
                                    onChange={this.onChange}
                                    placeholder={'email'}
                                    value={this.state.email}
                                    error={errors.email}
                                    margin="normal"

                                    style={{
                                        fontSize: '15px',
                                        fontFamily: 'panton ,sans-serif'
                                    }}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />

                                <span className="d-flex flex-row justify-content-start"
                                      style={{   fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif',color: "#53F3CE"}}>
                                      {errors.email}
                                    {errors.emailnotfound}
                                    </span>
                            </div>
                            <FormGroup  className={classnames("", {
                                invalid: errors.password || errors.passwordincorrect
                            })}>
                                {/*<Label htmlFor="password" style={{fontSize:'15px',*/}
                                {/*    fontFamily:'panton ,sans-serif'}}>Password</Label>*/}
                                <Input
                                placeholder={'password'}
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />


                                <span className="d-flex flex-row justify-content-start"
                                    style={{   fontSize: '12px',
                                    fontFamily: 'panton ,sans-serif',color: "#53F3CE"}}>
                                    {errors.password}
                                    {errors.passwordincorrect}
                                    </span>


                            </FormGroup>
                            <div className="form-group align-content-start" style={{
                                fontSize: '15px', marginTop: "30px",

                                fontFamily: 'panton ,sans-serif'
                            }}>
                                <button id={"btnSave"}
                                        style={{
                                            fontFamily:'panton ,sans-serif',color:'white',fontSize:'15px',
                                            width: "150p",
                                            marginTop: "0px",
                                            marginLeft: '-320px'
                                        }}
                                        type="submit">
                                    Connect
                                </button>
                            </div>
                        </Form>
                        {/*<p className="grey-text text-darken-1" style={{fontSize:'20px',*/}
                        {/*    fontFamily:'panton ,sans-serif'}}>*/}
                        {/*    You are not registred? <Link to="/register" style={{color:'#53F3CE'}}>Register</Link>*/}
                        {/*</p>*/}
                    </CardBody>

                </Card>
            </div>


        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {loginUser}
)(Login);