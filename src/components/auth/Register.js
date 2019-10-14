import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../../store/actions/authActions";
import classnames from "classnames";
import {Input, Button, Form, Card, CardHeader, CardBody, FormGroup,} from "reactstrap";
import "../../App.css";

import "bootstrap/dist/css/bootstrap.min.css";


import moment from "moment";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderF: false,
            genderM: "",
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {},
            genderValue: "",
            poids: "",
            birthday: moment(),
            modal: false,
            gender: "",
            imageProfile: "",
            colorBTNMale: 'white',
            colorBTNFemale: 'white',
            fontWMale: 'normal',
            fontWFemale: 'normal'

        };

    }


    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/admin/Dashboard");
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }


    toggleGender = (e) => {
        console.log("inside toggle");
        const checked = e.currentTarget.value;
        const name = e.currentTarget.name;
        console.log("checked", checked);
        console.log("name", name);
        const newVal = name === "Female" && checked ? true : name === "Male" && checked ? false : null;
        console.log("newVal",newVal);
        this.setState(prevState => ({
            gender: newVal,
            genderValue: name
        }));
        if (newVal === false) {
            console.log("west el male");

            this.setState({
                gender: false,
                genderValue: 'Male',
                colorBTNMale: '#53F3CE',
                fontWMale: 'bold',
                colorBTNFemale: 'white',
                fontWFemale: 'normal',
            });

            console.log("gender west el if", this.state.gender, this.state.fontWMale)
        } else if (newVal=== true) {
            console.log("west el female");
            this.setState({
                gender: true,
                genderValue: 'Female',
                colorBTNFemale: '#53F3CE',
                fontWFemale: 'bold',
                colorBTNMale: 'white',
                fontWMale: 'normal'
            });
            console.log("gender west el if", this.state.gender, this.state.fontWFemale)
        }
    };
    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };


    onChangeDate = e => {
        this.setState({birthday: e.target.value});
        console.log(this.state.birthday);
    };


    saveImg = e => {

        console.log("clickeeeeeeeeeeeeeed");
        window.cloudinary.createUploadWidget({
                cloudName: 'oscproject',
                uploadPreset: 'ml_default',
                folder: 'ProfilePictures'
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    this.setState(
                        {
                            imageProfile: result.info.secure_url
                        }
                    );
                }
            }
        ).open();
    }
    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.imageProfile);
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            gender: this.state.genderValue,
            birthday: this.state.birthday,
            poids: this.state.poids,
            imageProfile: this.state.imageProfile
        };

        console.log(newUser);

        this.props.registerUser(newUser, this.props.history);

    };


    render() {

        const {errors} = this.state;
        console.log(errors);
        console.log("imageProfile", this.state.imageProfile);

        return (

            <div className="d-flex flex-row justify-content-lg-center">
                <div className="card text-center" id={'divBackRegister'}
                     style={{marginTop: "30px", height: '600px', width: "500px"}}>
                    <h1 style={{
                        marginTop: '60px', fontSize: '50px',
                        fontFamily: 'panton ,sans-serif', color: 'white'
                    }}>VERA</h1>
                    <h4 style={{
                        marginTop: '70px', fontSize: '40px',
                        fontFamily: 'panton ,sans-serif', color: 'white'
                    }}>Already have an account</h4>
                    <p style={{
                        marginTop: '-20px', fontSize: '22px',
                        fontFamily: 'panton ,sans-serif', color: 'white'
                    }}>Please connect with your personnal info </p>
                    <p>
                        <Link to="/login"
                              style={{fontFamily: 'Panton ,sans-serif', fontSize: '15px', color: 'white',marginTop: '90px'}} id={'btnLogin'}>Connect</Link>
                    </p>
                </div>
                <Card className="card text-center" style={{marginTop: "30px", height: '550px', width: "500px"}}>
                    <CardHeader className="d-flex flex-row justify-content-sm-between"
                                style={{
                                    marginLeft: '40px',
                                    marginTop: '1px',
                                    paddingBottom: '0%',
                                    paddingTop: '1%',
                                    marginRight: '10px',
                                    fontSize: '22px',
                                    fontFamily: 'panton ,sans-serif ',
                                    fontWeight: 'bold',
                                    color: '#53F3CE'
                                }}>Create Account
                    </CardHeader>
                    <CardBody style={{marginTop: "0px", marginLeft: '40px'}}>
                        <Form onSubmit={this.onSubmit} encType="multipart/form-data"
                              style={{marginTop: '0px', paddingTop: '0px'}}>

                            <div className="form-group d-flex flex-row justify-content-start ">
                                {this.state.imageProfile === "" ?
                                    <img
                                        style={{width: '100px', height: '100px', marginLeft: '150px',marginTop:'-10px'}}
                                        alt="profileImg"
                                        className="avatar" src={require("../../assets/img/defaultimage.jpg")}/>
                                    :
                                    <img
                                        alt="profileImg"
                                        className="avatar"
                                        style={{width: '100px', height: '100px'}}
                                        src={this.state.imageProfile}
                                    />}
                                <Button style={{
                                    position: 'absolute',
                                    marginLeft: '40%',
                                    marginTop: '5%',
                                    //    transform: 'translate(-50%, -50%)',
                                    msTransform: 'translate(-50%, -50%)',
                                    // backgroundColor: "#555",
                                    // color: 'white',
                                    fontSize: '12px',
                                    padding: '12px 12px',
                                    borderRadius: '55px',
                                    hoverBackgroundColor: "transparent",
                                    backgroundColor: 'Transparent',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    outline: 'none',
                                    backgroundImage: 'none'
                                }}
                                        type="button" className="cloudinary-button"
                                        onClick={this.saveImg}>
                                    <div className="d-flex flex-row justify-content-start" >
                                        <i  className="fas fa-plus fa-border-icon"></i>
                                        <i style={{marginLeft:'-2px'}}className="fas fa-camera fa-2x"></i>
                                    </div>
                                </Button>
                            </div>

                            <div className="form-group"
                                 style={{marginTop: '-10px', paddingTop: '0px'}}>
                                {/*<label htmlFor="name">Name</label>*/}
                                <Input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={
                                        errors.name}
                                    style={{
                                        fontSize: '15px',
                                        fontFamily: 'panton ,sans-serif'
                                    }}
                                    placeholder={'name'}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <span className="d-flex flex-row justify-content-start"
                                      style={{   fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif',color: "#53F3CE"}}>
                                    {errors.name}
                                </span>
                            </div>
                            <div className="form-group">
                                {/*<label htmlFor="birthday">Date of birth</label>*/}
                                <Input
                                    style={{
                                        fontSize: '12px',
                                        fontFamily: 'panton ,sans-serif',color:'white'
                                    }}
                                    onChange={this.onChangeDate}
                                    value={this.state.birthday}
                                    error={errors.birthday}
                                    id="birthday"
                                    type="date"
                                    className={classnames("", {
                                        invalid: errors.birthday
                                    })}
                                />
                                <span className="d-flex flex-row justify-content-start"
                                      style={{   fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif',color: "#53F3CE"}}>{errors.birthday}</span>
                            </div>
                            <div className="form-group">
                                {/*<label htmlFor="poids">Weight(KG)</label>*/}
                                <Input
                                    style={{
                                        fontSize: '15px',
                                        fontFamily: 'panton ,sans-serif'
                                    }}
                                    placeholder={'weight(KG)'}
                                    onChange={this.onChange}
                                    value={this.state.poids}
                                    error={errors.poids}
                                    id="poids"
                                    type="number"
                                    className={classnames("", {
                                        invalid: errors.poids
                                    })}
                                />
                                <span className="d-flex flex-row justify-content-start"
                                      style={{   fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif',color: "#53F3CE"}}>{errors.poids}</span>
                            </div>
                            <div className="form-group"
                                 style={{


                                     position: 'absolute',
                                     marginLeft: '4px'}}>

                                <label className="d-flex flex-row justify-content-start"
                                       style={{
                                           width:'200px',
                                           fontSize: '13px',
                                           fontFamily: 'panton ,sans-serif',
                                           position: 'absolute',
                                           marginTop: '8px'
                                       }}> Gender : </label>



                                <button type="button" id={"btnGenderFemale"}
                                        style={{
                                            position: 'absolute',
                                            marginLeft: '110px',
                                            paddingRight: '15px',
                                            paddingLeft: '15px',
                                            //    transform: 'translate(-50%, -50%)',
                                            // backgroundColor: "#555",
                                            color: this.state.colorBTNFemale,
                                            fontWeight: this.state.fontWFemale,
                                            fontSize: '12px',
                                            // padding: '12px 12px',
                                            // borderRadius: '55px',
                                            backgroundRepeat: 'no-repeat',
                                            width: '70px',
                                            // border: 'none',
                                            // cursor: 'pointer',

                                        }}
                                        name="Female"
                                        value={this.state.gender === true}
                                        onClick={this.toggleGender}
                                        error={errors.gender}
                                        className={classnames("", {
                                            invalid: errors.gender
                                        })}
                                >
                                    Female
                                </button>

                                <button type="button" id={"btnGenderMale"}
                                        style={{
                                            position: 'absolute',
                                            marginLeft: '185px',
                                            paddingRight: '15px',
                                            paddingLeft: '15px',
                                            //    transform: 'translate(-50%, -50%)',
                                            color: this.state.colorBTNMale,
                                            fontWeight: this.state.fontWMale,
                                            // color: 'white',
                                            fontSize: '12px',
                                            // padding: '12px 12px',
                                            // borderRadius: '55px',
                                            backgroundRepeat: 'no-repeat',
                                            width: '70px',
                                            // border: 'none',
                                            // cursor: 'pointer',


                                        }}
                                        name="Male"
                                        value={this.state.gender === false}
                                        onClick={this.toggleGender}
                                        error={errors.gender}
                                        className={classnames("", {
                                            invalid: errors.gender
                                        })}
                                >
                                    Male
                                </button>
                                <span className="d-flex flex-row justify-content-start"
                                      style={{ paddingTop:'26px',  fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif',color: "#53F3CE"}}>{errors.gender}</span>
                            </div>
                            {/*email*/}
                            <div className="form-group" style={{marginTop:'60px'}}>
                                {/*<label htmlFor="email">Email</label>*/}
                                <Input
                                    style={{
                                        fontSize: '15px',
                                        fontFamily: 'panton ,sans-serif'
                                    }}
                                    placeholder={'email'}
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <span className="d-flex flex-row justify-content-start"
                                      style={{   fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif',color: "#53F3CE"}}>{errors.email}</span>
                            </div>
                            <div className="form-group">
                                {/*<label htmlFor="password">Password</label>*/}
                                <Input
                                    style={{
                                        fontSize: '15px',
                                        fontFamily: 'panton ,sans-serif'
                                    }}
                                    placeholder={'password'}
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                                <span className="d-flex flex-row justify-content-start"
                                      style={{   fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif',color: "#53F3CE"}}>{errors.password}</span>
                            </div>
                            <div className="form-group">
                                {/*<label htmlFor="password2">Confirm Password</label>*/}
                                <Input
                                    style={{
                                        fontSize: '15px',
                                        fontFamily: 'panton ,sans-serif'
                                    }}
                                    placeholder={'confirm password'}
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <span className="d-flex flex-row justify-content-start"
                                      style={{   fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif',color: "#53F3CE"}}>{errors.password2}</span>
                            </div>




                            <div className="form-group" style={{fontSize:'15px',marginTop: "10px",
                                marginLeft:'0%',
                                fontFamily:'panton ,sans-serif'}}>
                                <button id={"btnSave"}
                                        style={{
                                            width: "150p",fontFamily:'panton ,sans-serif',color:'white',fontSize:'15px',
                                            marginTop: "10px",   marginLeft:'-73%'      }}
                                        type="submit">
                                    Register
                                </button>
                            </div>


                        </Form>
                    </CardBody>
                </Card>
            </div>


        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {registerUser}
)(Register);