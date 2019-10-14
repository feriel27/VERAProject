import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setFormat} from "../../src/store/actions/profileActions";

import {getUserInfo, updateUser} from "../../src/store/actions/authActions";
import classnames from "classnames";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import {
    Input,
    Button,
    Form,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardTitle, Row, Label,
} from "reactstrap";
import 'toasted-notes/src/styles.css'; // optional styles

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import UpdatePassword from "../components/auth/UpdatePassword";

class UserProfile extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            errors: {},
            genderValue: "",
            poids: '',
            birthday: moment(),
            gender: "",
            imageProfile: "",
            colorBTNMale: 'white',
            colorBTNFemale: 'white',
            fontWMale: 'normal',
            fontWFemale: 'normal',
            colorButton: '#344675',
            unitF: true

        };

    }

    componentDidMount() {
        this.props.getUserInfo();
        // this.props.setFormat();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.userInfo) {
            const profile = nextProps.userInfo.userInfo.user;
            console.log("profile", profile);
            // Set component fields state
            this.setState({
                name: profile.name,
                poids: profile.poids,
                birthday: profile.birthday,
                gender: profile.gender,
                imageProfile: profile.imageProfile,
            });
        }
        if (this.state.gender === 'Male') {
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

        } else if (this.state.gender === 'Female') {
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

    }

    toggleGender = (e) => {
        console.log("inside toggle");
        const checked = e.currentTarget.value;
        const name = e.currentTarget.name;
        console.log("checked", checked);
        console.log("name", name);
        const newVal = name === "Female" && checked ? true : name === "Male" && checked ? false : null;
        console.log("newVal", newVal);
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
        } else if (newVal === true) {
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
    onChangeName = e => {
        this.setState({name: e.target.value});
    };
    onChangeDate = e => {
        this.setState({birthday: e.target.value});
        console.log(this.state.birthday);
    };


    onChangePoids = e => {
        this.setState({poids: e.target.value});
        console.log(this.state.poids);
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
        console.log("clicked button");
        e.preventDefault();
        console.log(this.state.imageProfile);
        const newUser = {
            name: this.state.name,
            gender: this.state.genderValue,
            birthday: this.state.birthday,
            poids: this.state.poids.toString(),
            imageProfile: this.state.imageProfile
        };

        console.log(newUser);

        this.props.updateUser(newUser);


    };
    formater = (e, f) => {
        e.preventDefault();
        this.setState({
            unitF: f
        })
        console.log("heya el unit format", f);
        this.props.setFormat(f)
    }

    render() {
        const {userInfo} = this.props.userInfo;

        console.log(userInfo);
        const {errors} = this.state;
        console.log(errors);
        console.log("gender ", this.state.gender);
        if (userInfo === null) {
            return this.loading();
        }
        if (this.state.gender === 'Male') {
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

        } else if (this.state.gender === 'Female') {
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

        return (
            <>
                <Row className="content">
                    <Card className="card-user" style={{height: '603px'}}>
                        <CardHeader className="d-flex flex-row justify-content-sm-between"
                                    style={{
                                        marginLeft: '10px',
                                        marginTop: '-30px',
                                        paddingBottom: '0%',
                                        paddingTop: '4%',
                                        marginRight: '10px',

                                    }}>
                            <Label style={{fontFamily: 'panton ,sans-serif', color: 'white', fontSize: '24px'}}
                                   className="text-left">
                                Parametric
                            </Label>
                        </CardHeader>
                        <CardBody>

                            <CardTitle style={{
                                marginLeft: '20px', marginTop: '-10px',
                                fontSize: '18px',
                                fontFamily: 'panton ,sans-serif'
                            }}>
                                Unit Format
                            </CardTitle>
                            <Col md="4" style={{height: '70px', paddingTop: '10px'}}>
                                <Row className="d-flex flex-row justify-content-around">
                                    <button id={"btnFormat"}
                                            style={{
                                                width: "80px", marginTop: '1px', paddingBottom: '3px',
                                                paddingTop: '3px', height: '33px',
                                            }}
                                            onClick={e => this.formater(e, true)}
                                    >
                                        <Label
                                            style={{fontFamily: 'panton ,sans-serif', color: 'white', fontSize: '12px'}}
                                            className="text-left">
                                            Kilometer
                                            {this.state.unitF === true ?
                                                <hr color="#53F3CE" style={{width:'50px',marginLeft:'0px',height:'1px',marginTop:'-1px'}}/> : <hr/>}
                                        </Label>
                                    </button>
                                    <button id={"btnFormat"}
                                            onClick={e => this.formater(e, false)}
                                            style={{
                                                width: "80px", marginTop: '1px', paddingBottom: '3px',
                                                paddingTop: '3px', height: '33px',paddingLeft:'0px'
                                            }}>

                                            {this.state.unitF === false ?
                                                <Label
                                                    style={{paddingLeft:'20px',
                                                        fontFamily: 'panton ,sans-serif', color: 'white', fontSize: '12px'}}
                                                    className="text-left">
                                                    Meter
                                                    <hr color="#53F3CE" style={{marginLeft:'1px',
                                                    width:'30px',height:'1px',marginTop:'-1px'}}/></Label>
                                                :
                                                <Label
                                                    style={{paddingLeft:'5px',
                                                        fontFamily: 'panton ,sans-serif', color: 'white', fontSize: '12px'}}
                                                    className="text-left">
                                                    Meter</Label>
                                            }

                                    </button>
                                </Row>
                            </Col>
                            <CardTitle style={{
                                marginLeft: '10px',
                                paddingTop: '0px',
                                fontSize: '18px',
                                fontFamily: 'panton regular'
                            }}>
                                <Label style={{fontFamily: 'panton ,sans-serif', color: 'white', fontSize: '24px'}}
                                       className="text-left">
                                    Update Profile
                                </Label>
                            </CardTitle>
                            <CardTitle style={{
                                marginLeft: '20px', paddingTop: '20px',
                                fontSize: '18px', marginTop: '-20px',
                                fontFamily: 'panton ,sans-serif'
                            }}>
                                Personnal information
                            </CardTitle>
                            <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                                <div className="d-flex flex-row justify-content-start">
                                    <Col sm={"2"}
                                         style={{marginTop: "20px", marginLeft: '20px'}}>
                                        <img
                                            alt="profileImg"
                                            className="avatar"
                                            src={this.state.imageProfile}
                                        />
                                        <Button
                                            style={{
                                                position: 'absolute',
                                                top: '20%',
                                                left: '30%',
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
                                            <div className="d-flex flex-row justify-content-start">
                                                <i className="fas fa-plus fa-border-icon"></i>
                                                <i style={{marginLeft: '-2px'}} className="fas fa-camera fa-2x"></i>
                                            </div>
                                        </Button>
                                    </Col>
                                    <Col sm="6"
                                         style={{marginLeft: '20px'}}>
                                        <div className="form-group">

                                            <Input
                                                style={{
                                                    fontSize: '12px',
                                                    fontFamily: 'panton ,sans-serif'
                                                }}
                                                placeholder={"Name"}
                                                onChange={this.onChangeName}
                                                defaultValue={this.state.name}
                                                error={
                                                    errors.name}
                                                id="name"
                                                type="text"
                                                className={classnames("", {
                                                    invalid: errors.name
                                                })}
                                            />
                                            <span className="d-flex flex-row justify-content-start"
                                                  style={{
                                                      fontSize: '12px',
                                                      fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                                  }}>                                                {errors.name}
                                            </span>
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                style={{
                                                    fontSize: '12px',
                                                    fontFamily: 'panton ,sans-serif'
                                                }}
                                                placeholder={'Weight(KG)'}
                                                onChange={this.onChangePoids}
                                                defaultValue={this.state.poids}
                                                error={errors.poids}
                                                id="poids"
                                                type="number"
                                                className={classnames("", {
                                                    invalid: errors.poids
                                                })}
                                            />
                                            <span className="d-flex flex-row justify-content-start"
                                                  style={{
                                                      fontSize: '12px',
                                                      fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                                  }}>
                                                {errors.poids}</span>
                                        </div>
                                        <div className="form-group">
                                            {/*<label htmlFor="birthday">Date of birth</label>*/}
                                            <Input
                                                onChange={this.onChangeDate}
                                                value={this.state.birthday}
                                                error={errors.birthday}
                                                id="birthday"
                                                type="date"
                                                className={classnames("", {
                                                    invalid: errors.birthday
                                                })}
                                                style={{
                                                    fontSize: '12px',
                                                    fontFamily: 'panton ,sans-serif'
                                                }}
                                            />
                                            <span className="d-flex flex-row justify-content-start"
                                                  style={{
                                                      fontSize: '12px',
                                                      fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                                  }}>
                                                {errors.birthday}</span>
                                        </div>
                                        <div className="form-group">


                                            <label className="d-flex flex-row justify-content-start"
                                                   style={{
                                                       width: '200px',
                                                       fontSize: '15px',
                                                       fontFamily: 'panton ,sans-serif',
                                                       position: 'absolute',
                                                       marginTop: '8px'
                                                   }}> Gender : </label>

                                            <button type="button" id={"btnGenderFemaleUpdate"}
                                                    style={{
                                                        marginLeft: '110px',
                                                        paddingRight: '15px',
                                                        paddingLeft: '15px',
                                                        fontWeight: this.state.fontWFemale,
                                                        paddingTop: '3px'

                                                    }}
                                                    name="Female"
                                                    value={this.state.gender === true}
                                                    onClick={this.toggleGender}
                                                    error={errors.gender}
                                                    className={classnames("", {
                                                        invalid: errors.gender
                                                    })}
                                            >
                                                <Label style={{
                                                    fontFamily: 'panton ,sans-serif',
                                                    color: this.state.colorBTNFemale,
                                                    fontSize: '12px'
                                                }}
                                                       className="text-left">
                                                    Female
                                                </Label>
                                            </button>
                                            <button type="button" id={"btnGenderMaleUpdate"}
                                                    style={{
                                                        //    transform: 'translate(-50%, -50%)',
                                                        fontWeight: this.state.fontWMale,
                                                        marginLeft: '30px',
                                                        paddingRight: '15px',
                                                        paddingLeft: '15px',
                                                        paddingTop: '3px'

                                                    }}
                                                    name="Male"
                                                    value={this.state.gender === false}
                                                    onClick={this.toggleGender}
                                                    error={errors.gender}
                                                    className={classnames("", {
                                                        invalid: errors.gender
                                                    })}
                                            >
                                                <Label style={{
                                                    fontFamily: 'panton ,sans-serif',
                                                    color: this.state.colorBTNMale,
                                                    fontSize: '12px'
                                                }}
                                                       className="text-left">
                                                    Male
                                                </Label>
                                            </button>
                                            <span className="d-flex flex-row justify-content-start"
                                                  style={{
                                                      fontSize: '12px',
                                                      fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                                  }}>
                                                {errors.gender}</span>
                                        </div>
                                        <div className="form-group">
                                            <NotificationContainer/>

                                            <button id={"btnSave"}
                                                    className="text-center"
                                                    style={{
                                                        width: "80px",
                                                        marginTop: "13px",
                                                        fontFamily: 'panton ,sans-serif',
                                                        color: 'white',
                                                        fontSize: '15px'
                                                    }}
                                                    type="submit">
                                                Save
                                            </button>
                                        </div>
                                    </Col>
                                </div>

                            </Form>
                        </CardBody>
                        <CardBody>
                            <CardTitle style={{
                                marginLeft: '20px', fontSize: '18px',
                                fontFamily: 'panton ,sans-serif', marginTop: '110px',
                            }}>
                                Account information
                            </CardTitle>
                            <UpdatePassword/>
                        </CardBody>
                    </Card>
                </Row>
            </>

        );

    }
}

UserProfile.propTypes = {
    setFormat: PropTypes.func.isRequired,

    updateUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,


};
const mapStateToProps = state => ({
    errors: state.errors, userInfo: state.userInfo,
    // unit_format: state.unit_format,
});
export default connect(
    mapStateToProps,
    {getUserInfo, setFormat, updateUser}
)(UserProfile);
