import React, {Component} from "react";
import {connect} from "react-redux";
import {getAllGoals} from "../../../src/store/actions/profileActions";
import PropTypes from "prop-types";
import {CardHeader, Col, Label, Row, Table} from "reactstrap";
import Moment from "react-moment";
import ProgressGA from "./ProgressGA";
import {Td} from "react-super-responsive-table";

class HistoriqueGoals extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getAllGoals();
    }


    render() {
        const {unit_format} = this.props.unit_format;
        const {all_goals} = this.props.all_goals;
        if (all_goals.length === 0) {
            return (
                <div>
                    {/*<Spinner color="success"/>*/}
                    <h4>wait</h4>
                </div>

            )
        }

        return (

            <>
                <CardHeader className="text-left"
                            style={{
                                marginLeft: '10px',
                                marginTop: '0px',
                                paddingBottom: '0%',
                                paddingTop: '0%',
                                marginRight: '100px'
                            }}>
                    <>
                        <Col style={{
                            paddingLeft: '30px',
                            width: '500px'
                        }}>
                            <h3 style={{
                                marginRight: '120px',
                                marginTop: '7px', fontSize: '24px',
                                fontFamily: 'panton  ,sans-serif'
                            }}>Historic Goals</h3>
                        </Col>

                    </>
                </CardHeader>
                <Row style={{marginLeft:'100px'}}>

                    <Col md="6" style={{width: '1000px',marginTop:'-30px'}}>
                        <Table striped style={{width: '400px', marginLeft: '0px'}}>
                            <thead className="text-primary">
                            <tr >
                                <th style={{
                                    fontFamily: 'panton  ,sans-serif',color:'white',
                                    fontSize: '14px ',textAlign:'center',textTransform: 'capitalize'
                                }}>
                                    Date
                                </th>
                                <th style={{
                                    fontFamily: 'panton  ,sans-serif',color:'white',
                                    fontSize: '14px ',textAlign:'center',textTransform: 'capitalize'
                                }}>
                                    Distance
                                </th>
                                <th style={{
                                    fontFamily: 'panton  ,sans-serif',color:'white',
                                    fontSize: '14px ',textAlign:'center',textTransform: 'capitalize'
                                }}>
                                    Calorie
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {all_goals.topFive.map(function (game, idx) {
                                if (all_goals.topFive.length === 0) {
                                    return (<h5></h5>)
                                } else {
                                    return (
                                        <tr key={idx} >
                                            <td style={{textAlign:'center'}}>
                                                <Moment style={{
                                                    fontFamily: 'panton  ,sans-serif',color:'white',
                                                    fontSize: '14px ',textTransform: 'capitalize'
                                                }} format="DD-MM-YYYY">
                                                    {game.dateGOAL}
                                                </Moment>
                                            </td>
                                            <td style={{textAlign:'center'}}>
                                            {unit_format ?  <Label style={{
                                                        fontFamily: 'panton ,sans-serif', color: 'white',
                                                        fontSize: '18px '
                                                    }}>
                                                        {game.distanceGOAL}
                                                    </Label> :
                                                    <Label style={{
                                                        fontFamily: 'panton ,sans-serif', color: 'white',
                                                        fontSize: '18px '
                                                    }}>
                                                        {game.distanceGOAL*1000}
                                                    </Label>
                                                }

                                                <Label style={{
                                                    fontFamily: 'panton ,sans-serif',   color: 'white',
                                                    fontSize: '10px '
                                                }}>{unit_format ? 'Km' : 'm'}</Label>


                                            </td>
                                            <td style={{textAlign:'center'}}>

                                            <Label style={{
                                                    fontFamily: 'panton ,sans-serif', color: 'white',
                                                    fontSize: '18px '
                                                }}>
                                                    {game.calorieGOAL}</Label>
                                                <Label style={{
                                                    fontFamily: 'panton ,sans-serif', color: 'white',
                                                    fontSize: '10px '
                                                }}>Cal</Label>
                                            </td>

                                        </tr>
                                    );
                                }

                            })}
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="4"  style={{ marginTop:'50px',marginLeft:'10px'}}>
                        <ProgressGA/>
                    </Col>


                </Row>
            </>


        );
    }
}


HistoriqueGoals.propTypes = {
    unit_format: PropTypes.bool,
    getAllGoals: PropTypes.func.isRequired,
    all_goals: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    all_goals: state.all_goals,
    unit_format:state.unit_format
});
export default connect(
    mapStateToProps,
    {getAllGoals})(HistoriqueGoals);