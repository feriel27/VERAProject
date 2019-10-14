import React from "react";
import {
    Card,
    Row,
    Col, CardHeader, Label,
} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getGameInfo, getAllGoals} from "../../../src/store/actions/profileActions";
import HistoriqueGoals from "./HistoriqueGoals";
import AddGoal from "./AddGoal";
import ProgressGoalAchieved from "./ProgressGoalAchieved";
import CountUp from "react-countup/build";

class ActiveGoals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};


    }

    componentDidMount() {
        this.props.getGameInfo();
        this.props.getAllGoals();
    }


    render() {
        const {dist_temps} = this.props.dist_temps;
        console.log("dist temps", dist_temps);

        if (dist_temps.length === 0) {
            return (
                <div>
                    {/*<Spinner color="success"/>*/}
                    <h4></h4>
                </div>

            )
        }

        const {all_goals} = this.props.all_goals;
        if (all_goals.length === 0) {
            return (
                <div>
                    {/*<Spinner color="success"/>*/}
                    <h4></h4>
                </div>

            )
        }
        console.log(all_goals);

        const {unit_format} = this.props.unit_format;

        return (

            <Card className="card-user">
                <CardHeader className="text-left"
                            style={{
                                marginLeft: '10px',
                                marginTop: '10px',
                                paddingBottom: '0%',
                                paddingTop: '0%',
                                marginRight: '100px'
                            }}>
                    <Row>
                        <Col style={{
                            paddingLeft: '30px',
                            width: '500px'
                        }}>
                            <h3 style={{
                                marginRight: '120px',
                                marginTop: '7px', fontSize: '24px',
                                fontFamily: 'panton  ,sans-serif'
                            }}>Active Goal</h3>
                        </Col>
                        <Col md={'4'} style={{
                            width: '500px', paddingTop: '7px'
                        }}>
                            <AddGoal/>
                        </Col>
                    </Row>
                </CardHeader>

                <Row className="d-flex flex-row " style={{marginTop: '0px', paddingLeft: '10px'}}>
                    {/*// style={{marginLeft: '60px', marginTop: '0px', marginBottom: '10px', width: '20%'}}>*/}
                    <Col md="4" className="chart-area" >
                        <ProgressGoalAchieved/>
                    </Col>
                    <Col sm="2" className="d-flex flex-column justify-content-center">
                        <h4 style={{
                            color: '#53F3CE', fontSize: '20px',
                            fontFamily: 'panton  ,sans-serif'
                        }}>Distance</h4>
                        <div className="d-flex justify-content-lg-start">
                            <div className="d-flex ">
                                <h3 style={{
                                    fontSize: '20px',
                                    fontFamily: 'panton  ,sans-serif', color: 'white'
                                }}>

                                    {unit_format ?
                                        <CountUp end={parseInt(dist_temps.liste_dist[0].distance)}/>
                                        :
                                        <CountUp end={parseInt(dist_temps.liste_dist[0].distance) * 1000}/>
                                    }

                                </h3>
                                <h6 style={{
                                    fontFamily: 'panton  ,sans-serif', textTransform: 'capitalize', color: 'white'
                                }}>                                    {unit_format ? 'Km' : 'm'}

                                </h6>
                            </div>
                            <strong>/</strong>
                            <div className="d-flex">

                                {all_goals.diffDays === 0 ?
                                    <h3 style={{
                                        fontSize: '20px',
                                        fontFamily: 'panton  ,sans-serif', color: 'white'
                                    }}>0</h3>
                                    :
                                    <h3 style={{
                                        fontSize: '20px',
                                        fontFamily: 'panton  ,sans-serif', color: 'white'
                                    }}>
                                        {
                                            unit_format ?
                                                <CountUp end={parseInt(all_goals.first[0].distanceGOAL)}/> :
                                                <CountUp end={parseInt(all_goals.first[0].distanceGOAL) * 1000}/>
                                        }
                                    </h3>
                                }
                                <h6 style={{
                                    fontFamily: 'panton  ,sans-serif', textTransform: 'capitalize', color: 'white'
                                }}>
                                    {unit_format ? 'Km' : 'm'}

                                </h6>
                            </div>
                        </div>
                    </Col>
                    <Col sm="2" className="d-flex flex-column justify-content-center" style={{}}>
                        <h4 style={{
                            color: '#53F3CE', fontSize: '20px',
                            fontFamily: 'panton  ,sans-serif'
                        }}>Calorie</h4>
                        <div className="d-flex justify-content-lg-start">
                            <div className="d-flex">
                                <h3 style={{
                                    fontSize: '20px',
                                    fontFamily: 'panton  ,sans-serif', color: 'white'
                                }}>
                                    <CountUp end={parseInt(dist_temps.liste_dist[0].calorie)}/></h3>
                                <h6 style={{
                                    fontFamily: 'panton  ,sans-serif', textTransform: 'capitalize', color: 'white'
                                }}>Cal</h6>
                            </div>
                            <strong>/</strong>
                            <div className="d-flex">


                                {all_goals.diffDays === 0 ?
                                    <h3 style={{
                                        fontSize: '20px',
                                        fontFamily: 'panton  ,sans-serif', color: 'white'
                                    }}>0</h3>
                                    :
                                    <h3 style={{
                                        fontSize: '20px',
                                        fontFamily: 'panton  ,sans-serif', color: 'white'
                                    }}>
                                        <CountUp end={parseInt(all_goals.first[0].calorieGOAL)}/></h3>
                                }

                                <h6 style={{
                                    fontFamily: 'panton  ,sans-serif', textTransform: 'capitalize', color: 'white'
                                }}>Cal</h6>
                            </div>
                        </div>
                    </Col>
                    <Col sm="2" className="d-flex flex-column justify-content-center" style={{}}>
                        <h4 style={{
                            color: '#53F3CE', fontSize: '20px',
                            fontFamily: 'panton  ,sans-serif',
                        }}>Deadline</h4>
                        <div className="d-flex justify-content-lg-start">
                            <div className="d-flex flex-row ">
                                <h3 style={{
                                    fontSize: '20px', marginLeft: '20px',
                                    fontFamily: 'panton  ,sans-serif', color: 'white'
                                }}><CountUp end={all_goals.diffDays}/></h3>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '0px'}}>
                    <HistoriqueGoals/>
                </Row>
            </Card>

        );
    }
}

ActiveGoals.propTypes = {
    getGameInfo: PropTypes.func.isRequired,
    dist_temps: PropTypes.object.isRequired,
    getAllGoals: PropTypes.func.isRequired,
    all_goals: PropTypes.object.isRequired,
    unit_format: PropTypes.bool,

};
const mapStateToProps = state => ({
    dist_temps: state.dist_temps,
    all_goals: state.all_goals,
    unit_format: state.unit_format
});
export default connect(
    mapStateToProps,
    {getGameInfo, getAllGoals}
)(ActiveGoals);
