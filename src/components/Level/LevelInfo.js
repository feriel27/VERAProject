import React, {Component} from 'react';
import Menu from "../../components/Menu/Menu";
import 'react-circular-progressbar/dist/styles.css';
import {


    Row,

    Card,
    CardHeader,

    CardBody, Col,
} from "reactstrap";
import CountUp from 'react-countup';

import {connect} from 'react-redux';
import {getLevelInfoByUser, getProgressGOAL, SortedUserByIdUser} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';


class LevelInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

    }

    componentDidMount() {
        this.props.getLevelInfoByUser();
        this.props.getProgressGOAL();
        this.props.SortedUserByIdUser();
    }

    next(e) {
        const {levelInfo} = this.props.levelInfo;
        console.log("levelInfo.listLevel.length", levelInfo.listLevel.length)
        e.preventDefault();

        if (this.animating) return;
        const nextIndex = this.state.activeIndex === levelInfo.listLevel.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    previous(e) {
        const {levelInfo} = this.props.levelInfo;
        e.preventDefault();
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? levelInfo.listLevel.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});

    }


    render() {
        const {activeIndex} = this.state;
        console.log("active index melowl", activeIndex);
        console.log(activeIndex);

        const {levelInfo} = this.props.levelInfo;
        const {progressGOAL} = this.props.progressGOAL;
        const {bestAll} = this.props.bestAll;

        const {unit_format} = this.props.unit_format;
        console.log('uniiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit', unit_format);
        if (unit_format === undefined) {
            console.log('eheheheh')
        }
        console.log(levelInfo);
        console.log(progressGOAL);
        console.log(bestAll);

        if (bestAll === undefined) {
            return (
                <h4></h4>
            )
        }
        if (bestAll.listeDistance === undefined) {
            return (
                <h4></h4>
            )
        }
        if (bestAll.listeCalories === undefined) {
            return (
                <h4></h4>
            )
        }
        if (levelInfo.liste === undefined) {
            return (
                <h4></h4>
            )
        }
        if (progressGOAL === undefined) {
            return (
                <h4></h4>

            )
        }


        return (
            <>
                <Card>
                    <CardHeader className="d-flex flex-row justify-content-lg-start "
                                style={{paddingTop: '0%', paddingBottom: '0%'}}>
                        <i onClick={this.previous} style={{marginTop: '15px', marginLeft: '10px'}}
                           className="fas fa-caret-left fa-3x icon-resize-full"></i>
                        <label tags="h6" style={{
                            fontFamily: 'panton ,sans-serif',
                            fontSize: '25px', marginTop: '20px',
                            marginLeft: '25px', marginRight: '25px'
                        }}>
                            {levelInfo.liste[this.state.activeIndex].level.nameLevel}
                        </label>
                        <i onClick={this.next} style={{marginTop: '15px'}}
                           className="fas fa-caret-right fa-3x icon-resize-full"></i>
                    </CardHeader>

                    <CardBody style={{marginTop: '0%', paddingLeft: '0%', paddingTop: '0%'}}>
                        <Row className="d-flex flex-row justify-content-start">
                            <Col md="4" style={{
                                width: '50%',
                                height: '40px',
                                marginTop: '20px',
                                marginBottom: '20px'
                            }}>
                                <Row className="d-flex flex-row justify-content-sm-start" style={{marginLeft: '105px'}}>
                                    <Col md="10">
                                        <Row>
                                            <img alt={"logo-cal"} src={require('../../assets/img/speed.png')}
                                                 style={{
                                                     height: 'auto',
                                                     width: 'auto',
                                                     display: 'block',
                                                     maxWidth:'30px',
                                                     maxHeight:'30px'
                                                 }}/>
                                            <h1 style={{
                                                fontFamily: 'panton ,sans-serif',
                                                fontSize: '30px', marginLeft: '10px'
                                            }}>


                                                {unit_format ?
                                                    //kilometre
                                                    <CountUp
                                                        end={parseInt(levelInfo.liste[this.state.activeIndex].vitesse)}/>
                                                    :
                                                    //metre
                                                    <CountUp
                                                        end={parseInt(levelInfo.liste[this.state.activeIndex].vitesse)/1000}/>
                                                }
                                            </h1>
                                            <h6 style={{
                                                fontFamily: 'panton,sans-serif', textTransform: 'capitalize'
                                            }}>
                                                {unit_format ? 'Km/h' : 'm/h'}
                                            </h6>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" style={{
                                width: '50%',
                                height: '40px',
                                marginTop: '20px',
                                marginBottom: '20px'
                            }}>
                                <Row className="d-flex flex-row justify-content-sm-start" style={{marginLeft: '107px'}}>
                                    <Col lg="6">
                                        <Row>
                                            <img alt={"logo-cal"} src={require('../../assets/img/time.png')}
                                                 style={{
                                                     height: 'auto',
                                                     width: 'auto',
                                                     display: 'block',
                                                     maxWidth:'30px',
                                                     maxHeight:'30px'
                                                 }}/>
                                            <h1 style={{
                                                fontFamily: 'panton ,sans-serif',
                                                fontSize: '30px', marginLeft: '10px'
                                            }}><CountUp
                                                end={parseInt(levelInfo.listeTempsEnMinutes[this.state.activeIndex])}/>
                                            </h1>
                                            <h6 style={{
                                                fontFamily: 'panton ,sans-serif', textTransform: 'capitalize'
                                            }}>
                                                Min</h6>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6" style={{
                                height: '40px', paddingLeft: '135px'
                            }}>
                                <Row className="d-flex flex-row justify-content-start">
                                    <Col lg="10" style={{marginLeft: '0px',}}>
                                        <Row>
                                            <img alt={"logo-cal"} src={require('../../assets/img/Distance.png')}
                                                 style={{
                                                     height: 'auto',
                                                     width: 'auto',
                                                     display: 'block',
                                                     maxWidth:'30px',
                                                     maxHeight:'30px'
                                                 }}/>
                                            <h1 style={{
                                                fontFamily: 'panton ,sans-serif',
                                                fontSize: '30px', marginLeft: '10px'}}>
                                                {unit_format ?
                                                    //kilometre
                                                    <CountUp
                                                        end={parseInt(levelInfo.liste[this.state.activeIndex].distance)}/>
                                                    :
                                                    //metre
                                                    <CountUp
                                                        end={parseInt(levelInfo.liste[this.state.activeIndex].distance) / 1000}/>
                                                }
                                            </h1>
                                            <h6 style={{
                                                fontFamily: 'panton ,sans-serif', textTransform: 'capitalize'
                                            }}>
                                                {unit_format ? 'Km' : 'm'}

                                            </h6>


                                            <div className="flex-column justify-content-sm-start"
                                                 style={{marginTop: '5px', marginLeft: '5px',}}
                                            >
                                                <img alt={"logo-cal"}
                                                     src={require('../../assets/img/leader board2.png')}
                                                     style={{
                                                         height: '20px',
                                                         width: '20px'
                                                     }}/>
                                            </div>
                                            <div className="flex-column justify-content-around"
                                                 style={{
                                                     width: '100px',
                                                     paddingTop: '3px',
                                                     paddingButtom: '0%',
                                                     paddingRight: '0px'
                                                 }}>
                                                <div className="d-flex flex-column">
                                                    <font size="1"
                                                          style={{fontFamily: 'panton ,sans-serif', marginLeft: '3px'}}>
                                                        Peek Distance
                                                    </font>
                                                    <font style={{
                                                        fontFamily: 'panton ,sans-serif', marginTop: '-5px',
                                                        marginLeft: '3px', textTransform: 'capitalize',
                                                    }}>

                                                        {unit_format ?
                                                            //kilometre
                                                            <CountUp end={parseInt(bestAll.listeDistance[0].distance)}/>
                                                            :
                                                            //metre
                                                            <CountUp
                                                                end={parseInt(bestAll.listeDistance[0].distance) / 1000}/>
                                                        }
                                                        {unit_format ? 'Km' : 'm'}
                                                    </font>
                                                </div>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" style={{
                                width: '50%',
                                height: '40px', marginLeft: '-35px'
                            }}>
                                <Row className="d-flex flex-row justify-content-start">
                                    <Col lg="8" style={{marginLeft: '-20px'}}>
                                        <Row>
                                            <img alt={"logo-cal"} src={require('../../assets/img/callorie.png')}
                                                 style={{
                                                     height: 'auto',
                                                     width: 'auto',
                                                     display: 'block',
                                                     maxWidth:'30px',
                                                     maxHeight:'30px'
                                                 }}/>

                                            <h1 style={{
                                                fontFamily: 'panton ,sans-serif',
                                                fontSize: '30px', marginLeft: '10px'
                                            }}>
                                                <CountUp
                                                    end={parseInt(levelInfo.liste[this.state.activeIndex].calorie)}/>
                                            </h1>
                                            <h6 style={{
                                                fontFamily: 'panton ,sans-serif',
                                                textTransform: 'capitalize'
                                            }}>
                                                Cal
                                            </h6>

                                            <div className="flex-column justify-content-sm-start"
                                                 style={{marginTop: '5px', marginLeft: '5px',}}>
                                                <img alt={"logo-cal"}
                                                     src={require('../../assets/img/leader board2.png')}
                                                     style={{
                                                         height: '20px',
                                                         width: '20px'
                                                     }}/>
                                            </div>
                                            <div className="flex-column justify-content-around"
                                                 style={{width: '100px', paddingTop: '3px', paddingButtom: '0%'}}>
                                                <div className="d-flex flex-column">
                                                    <font size="1"
                                                          style={{fontFamily: 'panton ,sans-serif', marginLeft: '3px'}}>
                                                        Peek Calorie
                                                    </font>
                                                    <font style={{
                                                        fontFamily: 'panton ,sans-serif', marginTop: '-5px',
                                                        marginLeft: '3px', textTransform: 'capitalize'

                                                    }}>
                                                        <CountUp
                                                            end={parseInt(bestAll.listeCalories[0].calorie)}/>Cal</font>
                                                </div>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row >
                            <Menu/>
                        </Row>
                    </CardBody>


                </Card>
            </>
        );
    }
}

LevelInfo.propTypes = {
    unit_format: PropTypes.bool,
    getLevelInfoByUser: PropTypes.func.isRequired,
    levelInfo: PropTypes.object.isRequired,
    getProgressGOAL: PropTypes.func.isRequired,
    progressGOAL: PropTypes.object.isRequired,
    SortedUserByIdUser: PropTypes.func.isRequired,
    bestAll: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
    levelInfo: state.levelInfo,
    progressGOAL: state.progressGOAL,
    bestAll: state.bestAll,
    unit_format: state.unit_format

});
export default connect(
    mapStateToProps,
    {getLevelInfoByUser, getProgressGOAL, SortedUserByIdUser})(LevelInfo);