import React from "react";
import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col, Modal, ModalHeader, ModalBody, Label,
} from "reactstrap";
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Swal from 'sweetalert2';
import moment from "moment";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addGOAL} from "../../../src/store/actions/authActions";
import classnames from "classnames";
import {getAllGoals} from "../../store/actions/profileActions";
import '../../canvas.css';
import '../../App.css';

class AddGoal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            calorieGOAL: "",
            distanceGOAL: "",
            dateGOAL: '',
            errors: {},
            modal: false,
            disabled: false,
        };
        this.toggle = this.toggle.bind(this);
    
    }

    componentDidMount() {
        this.props.getAllGoals();
    }

    toggle() {
        console.log("add console");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    onChangeDate = e => this.setState({dateGOAL: e.target.value});
    onChangeDistance = e => this.setState({distanceGOAL: e.target.value});
    onChangeCalorie = e => this.setState({calorieGOAL: e.target.value});


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }


    onSubmit = e => {
        e.preventDefault();

        const goal1 = {
            distanceGOAL: this.state.distanceGOAL,
            dateGOAL: this.state.dateGOAL,
            calorieGOAL: this.state.calorieGOAL,
        };
        console.log(goal1);
        const {all_goals} = this.props.all_goals;


        const {errors} = this.state;
        this.props.addGOAL(goal1);

        if (errors.distanceGOAL === "" || errors.calorieGOAL === "" || errors.dateGOAL ==="" || errors.dateGOAL==="jj/mm/aaaa") {
            console.log('vide');
            window.location.reload();


        } else {
            console.log('not vide');
            this.props.addGOAL(goal1);


        }


    }


    render() {

        const dateActuelle = new Date();
        const {all_goals} = this.props.all_goals;
        if (all_goals.length === 0) {
            return (
                <div>
                    <h4></h4>
                </div>

            )
        }
        console.log(all_goals.Liste);
        console.log(all_goals.Liste[all_goals.Liste.length - 1]);
        const {errors} = this.state;
        console.log(errors);
        console.log("date goal", moment(all_goals.last_one[0].dateGOAL).format("DD-MM-YYYY"));
        console.log("date actuelle", moment(dateActuelle).format("DD-MM-YYYY"));
        if (moment(dateActuelle).format("DD-MM-YYYY") > moment(all_goals.last_one[0].dateGOAL).format("DD-MM-YYYY")) {
            console.log("bouton not disabled");
            this.state.disabled = false;
        } else {
            console.log(" bouton disabled");
            this.state.disabled = true;
        }


        return (
            <>
                <div>
                    {this.state.disabled ? <h1></h1> :
                        <button id={"btnSave"} disabled={this.state.disabled} style={{marginLeft: '150px'}}
                                onClick={this.toggle}>
                            <i className="fas fa-plus fa-sm"></i>
                            <Label style={{
                                fontFamily: 'panton ,sans-serif',
                                color: 'white',
                                fontSize: '15px'
                            }}
                                   className="text-left">
                                Add Goal
                            </Label>
                        </button>}
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                        <ModalBody style={{backgroundColor: '#1F243C'}}>
                            <ModalHeader toggle={this.toggle}>
                                <img
                                    style={{marginTop: '-110px', marginLeft: '140px', width: '100px', height: '100px'}}
                                    alt="..."
                                    className="avatar"
                                    src={require('../../assets/img/goals.png')}
                                />
                                <label style={{
                                    color: 'white',
                                    fontSize: '24px',
                                    marginTop: '-10px',
                                    marginLeft: '130px',
                                    fontFamily: 'panton,sans-serif'
                                }}>Add Goal</label>
                            </ModalHeader>
                            <Form onSubmit={this.onSubmit}>


                                <div className="form-group px-md-5 ">
                                    {/*<Label style={{color: 'white', fontFamily:'panton,sans-serif',fontSize: '18px'}}>Distance</Label>*/}
                                    <Input
                                        placeholdertextcolor="green"
                                        placeholder="distance (m)"
                                        onChange={this.onChangeDistance}
                                        value={this.state.distanceGOAL}
                                        error={
                                            errors.distanceGOAL}
                                        id="distanceGOAL"
                                        type="number"
                                        className={classnames("", {
                                            invalid: errors.distanceGOAL
                                        })}
                                    />
                                    <span className="d-flex flex-row justify-content-start"
                                          style={{
                                              fontSize: '12px',
                                              fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                          }}>
                                                {errors.distanceGOAL}</span>
                                </div>
                                <div className="form-group px-md-5 ">
                                    {/*<Label style={{color: 'white',fontFamily:'panton,sans-serif',fontSize: '18px'}}>Calorie</Label>*/}
                                    <Input
                                        onChange={this.onChangeCalorie}
                                        value={this.state.calorieGOAL}
                                        placeholder="calorie (cal)"
                                        error={
                                            errors.calorieGOAL}
                                        id="calorieGOAL"
                                        type="number"
                                        className={classnames("", {
                                            invalid: errors.calorieGOAL
                                        })}
                                    />
                                    <span className="d-flex flex-row justify-content-start"
                                          style={{
                                              fontSize: '12px',
                                              fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                          }}>
                                                {errors.calorieGOAL}</span>


                                </div>
                                <div className="form-group px-md-5 ">
                                    {/*<Label style={{color: 'white', fontFamily:'panton,sans-serif',fontSize: '18px'}}>Date</Label>*/}
                                    <Input
                                        onChange={this.onChangeDate}
                                        value={this.state.dateGOAL}
                                        error={errors.dateGOAL}
                                        id="dateGOAL"
                                        type="date"
                                        className={classnames("", {
                                            invalid: errors.dateGOAL
                                        })}
                                    />
                                    <span className="d-flex flex-row justify-content-start"
                                          style={{
                                              fontSize: '12px',
                                              fontFamily: 'panton ,sans-serif', color: "#53F3CE"
                                          }}>
                                                {errors.dateGOAL}</span>

                                </div>
                                <div className="form-group px-md-5 ">
                                    <button id={"btnSignup"}
                                            style={{
                                                marginTop: "1rem",
                                                marginLeft: '40px',
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

            </>


        );
    }
}

AddGoal.propTypes = {
    getAllGoals: PropTypes.func.isRequired,
    all_goals: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    all_goals: state.all_goals

});
export default connect(
    mapStateToProps,
    {addGOAL, getAllGoals}
)(AddGoal);
