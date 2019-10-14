import React from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  Row,
  Col, CardHeader, CardTitle, Input
} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUserInfo, updateUser} from "../../../src/store/actions/authActions";
import moment from "moment";
import UpdatePassword from "../../components/auth/UpdatePassword";
import "../../App.css";
import classnames from "classnames";


class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeIn: true,
      name: "",
      errors: {},
      genderValue: "",
      poids: "",
      birthday: moment(),
      gender: "",
      imageProfile: "",
      colorBTNMale: 'white',
      colorBTNFemale: 'white',
      fontWMale: 'normal',
      fontWFemale: 'normal'
    };
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value});
  };
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

    }
    else if (this.state.gender === 'Female') {
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
  };
  toggleGender = (e) => {
    console.log("inside toggle");
    const checked = e.currentTarget.value;
    const name = e.currentTarget.name;
    console.log("checked", checked);
    console.log("name", name);
    const newVal = name === "Female" && checked ? true : name === "Male" && checked ? false : null;
    console.log(newVal);
    this.setState(prevState => ({
      gender: newVal,
      genderValue: name
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.imageProfile);
    if (this.state.gender === true) {
      console.log("gender trueeeeee");
      this.setState({gender: "Female"})
    }
    if (this.state.gender === false) {
      console.log("gender trueeeeee");
      this.setState({gender: "Male"})
    }
    const newUser = {
      name: this.state.name,
      gender: this.state.genderValue,
      birthday: this.state.birthday,
      poids: this.state.poids,
      imageProfile: this.state.imageProfile,

    };

    console.log(newUser);

    this.props.updateUser(newUser, this.props.history);


  };


  componentDidMount() {
    this.props.getUserInfo();
  }


  render() {
    const {userInfo} = this.props.userInfo;
    console.log(userInfo);
    const {errors} = this.state;
    console.log(errors);
    console.log("gender ", this.state.gender);
    if (userInfo === null) {
      return <></>;
    }


    return (
        <>
          <div className="content">
            <Row style={{marginLeft: '30px'}}>
              <Col md="8">
                <Card className="card-user" style={{height: '603px'}}>
                  <CardHeader className="d-flex flex-row justify-content-sm-between"
                              style={{
                                marginLeft: '10px',
                                marginTop: '5px',
                                paddingBottom: '0%',
                                paddingTop: '4%',
                                marginRight: '10px',
                                fontSize: '22px',
                                fontFamily: 'panton semibold'
                              }}>Update Profile
                  </CardHeader>
                  <CardBody style={{marginTop: '-3px'}}>
                    <CardTitle style={{
                      marginLeft: '20px', paddingTop: '-10px', textDecoration: 'underline',
                      fontSize: '20px',
                      fontFamily: 'panton regular'
                    }}>
                      Personnal information
                    </CardTitle>
                    <Form onSubmit={this.onSubmit}>
                      {/*<CardText/>*/}
                      <div className="d-flex flex-row justify-content-start">
                        <div
                            className="d-flex flex-column justify-content-center content left ml-4">
                          <img

                              alt="profileImg"
                              className="avatar"
                              src={this.state.imageProfile}
                          />
                          {/*<i  className="fas fa-plus  content left ml-4 "></i>*/}
                          <Button style={{
                            position: 'absolute',
                            top: '28%',
                            left: '13%',
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
                            <i className="fas fa-camera fa-2x"></i>

                          </Button>


                        </div>
                        <div className="d-flex flex-column justify-content-center content left "
                             style={{width: '450px', marginLeft: '30px'}}
                        >


                          <div className="form-group"
                               style={{marginTop: '-10px', paddingTop: '0px'}}>
                            {/*<label htmlFor="name">Name</label>*/}
                            <Input
                                onChange={this.onChange}
                                defaultValue={this.state.name}
                                error={
                                  errors.name}
                                style={{
                                  fontSize: '15px',
                                  fontFamily: 'panton regular'
                                }}
                                placeholder={'Name'}
                                id="name"
                                type="text"
                                className={classnames("", {
                                  invalid: errors.name
                                })}
                            />
                            <small className="red-text"
                                   style={{color: "red"}}>{errors.name}</small>
                          </div>
                          <div className="form-group">
                            {/*<label htmlFor="birthday">Date of birth</label>*/}
                            <Input
                                style={{
                                  fontSize: '15px',
                                  fontFamily: 'panton regular'
                                }}
                                onChange={this.onChange}
                                defaultValue={this.state.birthday}
                                error={errors.birthday}
                                id="birthday"
                                type="date"
                                className={classnames("", {
                                  invalid: errors.birthday
                                })}
                            />
                            <small className="red-text"
                                   style={{color: "red"}}>{errors.birthday}</small>
                          </div>
                          <div className="form-group">
                            {/*<label htmlFor="poids">Weight(KG)</label>*/}
                            <Input
                                style={{
                                  fontSize: '15px',
                                  fontFamily: 'panton regular'
                                }}
                                placeholder={'Weight(KG)'}
                                onChange={this.onChange}
                                defaultValue={this.state.poids}
                                error={errors.poids}
                                id="poids"
                                type="number"
                                className={classnames("", {
                                  invalid: errors.poids
                                })}
                            />
                            <small className="red-text"
                                   style={{color: "red"}}>{errors.poids}</small>
                          </div>
                          <div className="form-group"
                               style={{

                                 paddingTop: '140px',
                                 position: 'absolute',
                                 marginLeft: '4px'
                               }}>

                            <label className="d-flex flex-row justify-content-start"
                                   style={{
                                     width: '200px',
                                     fontSize: '15px',
                                     fontFamily: 'panton regular',
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
                            <small className="red-text"
                                   style={{color: "red"}}>{errors.gender}</small>
                          </div>

                        </div>
                      </div>
                      <Row style={{marginTop: '40px', marginLeft: '35px'}}>
                        <Col className="px-0 ml-lg-auto">
                          <button className="" color="#53F3CE" id={"btnSave"}
                                  type="submit">
                            Save
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardBody style={{marginTop: '160px'}}>
                    <CardTitle style={{
                      marginLeft: '20px', textDecoration: 'underline', fontSize: '20px',
                      fontFamily: 'panton regular'
                    }}>
                      Account information
                    </CardTitle>
                    <UpdatePassword/>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
    );
  }
}

UserProfile.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  userInfo: state.userInfo,
  errors: state.errors
});
export default connect(
    mapStateToProps,
    {getUserInfo, updateUser}
)(UserProfile);
