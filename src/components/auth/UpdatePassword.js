import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updatePassword} from "../../store/actions/authActions";
import classnames from "classnames";
import {Input, Form, Modal, ModalHeader, ModalBody, Label} from "reactstrap";
import "../../App.css";


import "bootstrap/dist/css/bootstrap.min.css";


class UpdatePassword extends Component {
    constructor(props) {

        super(props);
        this.state = {

            oldpassword: "",
            newpassword2: "",
            errors: {},
            newpassword: "",
            modal: false,
            backdrop: true


        };
        this.toggle = this.toggle.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

    }

    handleClose = () => {
        this.setState({model: false})
    }

    toggle() {
        if (this.state.modal === false) {
            this.setState(prevState => ({
                errors: ''
            }));
        }
        this.setState(prevState => ({
            modal: !prevState.modal,

        }));
    }

    toggleGender = (e) => {
        const checked = e.currentTarget.checked;

        const name = e.currentTarget.name;
        console.log(checked);
        console.log(name);
        const newVal = name === "Female" && checked ? true : name === "Male" && checked ? false : null;
        this.setState(prevState => ({
            gender: newVal,
            genderValue: name
        }));
    };
    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            newpassword: this.state.newpassword,
            newpassword2: this.state.newpassword2,
            oldpassword: this.state.oldpassword,
        };
        console.log(newUser);
        // return <Redirect to='/admin/user-profile'/>
        this.props.updatePassword(newUser,this.props.history);



    };

    render() {

        const {errors} = this.state;
        console.log(errors);
        console.log("modaaaaaaaaaaaaaaaaaal", this.state.modal);
        return (
            <div>

                <button color="Blue" onClick={this.toggle} id={"btnSave"}
                        style={{marginLeft: '20px', paddingLeft: '13px', paddingRight: '13px', width: '150px'}}>
                    <Label style={{
                        fontFamily: 'panton ,sans-serif',
                        fontSize: '15px', color: 'white'
                    }}
                           className="text-left">
                        Change password
                    </Label>
                </button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} id="modalUpdate"
                       onClose={this.handleClose}
                       className={this.props.className}>
                    {/*<ModalHeader toggle={this.toggle}*/}
                    {/*             style={{backgroundColor: '#1F243C'}}>*/}
                    {/*    <label style={{*/}
                    {/*        color: 'white',*/}
                    {/*        fontFamily: 'panton ,sans-serif', fontSize: '20px', marginLeft: '10px'*/}
                    {/*    }}>Change your Password</label>*/}

                    {/*</ModalHeader>*/}
                    <ModalBody style={{backgroundColor: '#1F243C'}}>
                        <ModalHeader toggle={this.toggle}>
                            <img
                                style={{
                                    marginTop: '-110px', marginLeft: '170px',
                                    width: '50px', height: '50px'
                                }}
                                alt="..."
                                className="avatar"
                                src={require('../../assets/img/edit.png')}
                            />
                            <h1 style={{
                                color: 'white',
                                fontSize: '24px',
                                marginTop: '-20px',
                                marginLeft: '60px',
                                marginBottom: '20px',
                                fontFamily: 'panton,sans-serif'
                            }}>Change your Password</h1>
                        </ModalHeader>
                        <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                            <div className="form-group px-md-5 ">
                                <Input
                                    style={{
                                        fontSize: '12px',
                                        fontFamily: 'panton ,sans-serif',
                                    }}
                                    placeholder={"old password"}
                                    onChange={this.onChange}
                                    value={this.state.oldpassword}
                                    error={
                                        errors.oldpassword}
                                    id="oldpassword"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.oldpassword || errors.passwordincorrect
                                    })}
                                />
                                <span className="d-flex flex-row justify-content-start"
                                      style={{
                                          fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                      }}>
                                    {errors.oldpassword}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="form-group px-md-5 ">
                                <Input
                                    placeholder={"new password"}
                                    style={{
                                        fontSize: '12px',
                                        fontFamily: 'panton ,sans-serif'
                                    }}
                                    onChange={this.onChange}
                                    value={this.state.newpassword}
                                    error={
                                        errors.newpassword}
                                    id="newpassword"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.newpassword
                                    })}
                                />
                                <span className="d-flex flex-row justify-content-start"
                                      style={{
                                          fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                      }}>
                                    {errors.newpassword}</span>
                            </div>
                            <div className="form-group px-md-5 ">
                                <Input
                                    placeholder={"confirm password"}
                                    style={{
                                        fontSize: '12px',
                                        fontFamily: 'panton ,sans-serif'
                                    }}
                                    onChange={this.onChange}
                                    value={this.state.newpassword2}
                                    error={
                                        errors.newpassword2}
                                    id="newpassword2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.newpassword2
                                    })}
                                />
                                <span className="d-flex flex-row justify-content-start"
                                      style={{
                                          fontSize: '12px',
                                          fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                      }}>
                                    {errors.newpassword2}</span>
                            </div>
                            <div className="form-group px-md-5 ">

                                <button id={"btnSave"}
                                        style={{
                                            marginTop: "1rem",
                                            marginLeft: '45px',
                                            fontFamily: 'panton ,sans-serif',
                                            color: 'white',
                                            fontSize: '15px'
                                        }}>
                                    Sign up
                                </button>
                                <button id={"btnClose"} className="center"
                                        style={{
                                            marginTop: "1rem",
                                            marginLeft: '50px',
                                            fontFamily: 'panton ,sans-serif',
                                            color: 'white',
                                            fontSize: '15px'
                                        }} onClick={this.toggle}>
                                    Close
                                </button>
                            </div>
                        </Form>
                        {/*        </CardBody>*/}
                        {/*    </Card>*/}
                        {/*</Col>*/}
                    </ModalBody>
                    {/*<ModalFooter>*/}
                    {/*    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}*/}
                    {/*    <Button color="secondary" onClick={this.toggle}>Cancel</Button>*/}
                    {/*</ModalFooter>*/}
                </Modal>

            </div>
        );
    }
}

UpdatePassword.propTypes = {
    updatePassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {updatePassword}
)(UpdatePassword);