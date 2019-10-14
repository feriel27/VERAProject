import React, {Component} from "react";
import {
    Col,
    Label,
} from "reactstrap";
import {connect} from "react-redux";
import {
    calculHeartRate
} from "../../store/actions/profileActions";
import PropTypes from "prop-types";
import {
    CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../../App.css';
import RadialSeparators from '../total/Separator';
import HSBar from "react-horizontal-stacked-bar-chart";
import { Tooltip } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class LastHeartRate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltipOpenLight: false,
            tooltipOpenVLight: false,
            tooltipOpenModerate: false,
            tooltipOpenHard: false,
            tooltipOpenMax: false,
            tooltipValueLight:'',
            tooltipValueVLight:'',
            tooltipValueModerate:'',
            tooltipValueMax:'',
            tooltipValueHard:''
        };

        this.toggleLight = this.toggleLight.bind(this);
        this.toggleVLight = this.toggleVLight.bind(this);
        this.toggleModerate = this.toggleModerate.bind(this);
        this.toggleHard = this.toggleHard.bind(this);
        this.toggleMax = this.toggleMax.bind(this);

    }

    componentDidMount() {

        this.props.calculHeartRate();
    }
    toggleLight() {
        this.setState({
            tooltipOpenLight: !this.state.tooltipOpenLight
        });
    }
    toggleVLight() {
        this.setState({
            tooltipOpenVLight: !this.state.tooltipOpenVLight
        });
    }
    toggleModerate() {
        this.setState({
            tooltipOpenModerate: !this.state.tooltipOpenModerate
        });
    }
    toggleHard() {
        this.setState({
            tooltipOpenHard: !this.state.tooltipOpenHard
        });
    }
    toggleMax() {
        this.setState({
            tooltipOpenMax: !this.state.tooltipOpenMax
        });
    }
    render() {

        const {last_heartRate} = this.props.last_heartRate;
        console.log(last_heartRate);

        if (last_heartRate === undefined) {
            return (
                <div>
                </div>

            )
        }
        const heart_rate = Number.parseInt(last_heartRate.heartRate);

        if (heart_rate > 99 && heart_rate < 127) {
            console.log('in 99..127 ligth');

            this.state.tooltipValueLight = 'you are on the light zone';
        }
        else
        if (heart_rate > 128 && heart_rate < 147) {
            console.log('in 128..147 very light');
            this.state.tooltipValueVLight = 'you are on the light zone';

        }
        else
        if (heart_rate > 148 && heart_rate < 166) {
            console.log('in 148..166 moderate');
            this.state.tooltipValueModerate = 'you are on the light zone';

        }
        else
        if (heart_rate > 167 && heart_rate < 180) {
            console.log('in 167..180 hard');
            this.state.tooltipValueHard = 'you are on the light zone';

        }
        else
        if (heart_rate > 181 && heart_rate < 197) {
            console.log('in 181..197 max');
            this.state.tooltipValueMax = 'you are on the light zone';

        }


        if (heart_rate === undefined) {
            return (
                <></>
            )
        }
        let divCircleProgress = {
            marginLeft: '60px',
            marginTop: '-40px',
            width: 250,
            height: 150,

        };

        let divProgress = {
            marginLeft: '30px',
            marginTop: '20px',
            width: 150,
            height: 150,

        };

        return (
            <>
                <Col md="7" style={divCircleProgress}>
                    <CircularProgressbarWithChildren value={heart_rate}
                                                     strokeWidth={4}
                                                     styles={{
                                                         // Customize the root svg element
                                                         root: {},
                                                         // Customize the path, i.e. the "completed progress"
                                                         path: {
                                                             //     // Path color
                                                             stroke: `none`,
                                                             //     // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                             strokeLinecap: 'round',
                                                             //     // // Customize transition animation
                                                             transition: 'stroke-dashoffset 0.5s ease 0s',
                                                         },
                                                         // Customize the circle behind the path, i.e. the "total progress"
                                                         trail: {
                                                             // Trail color
                                                             stroke: 'none',
                                                             // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                             strokeLinecap: 'butt',
                                                             // Rotate the trail
                                                             transform: 'rotate(0.25turn)',
                                                             transformOrigin: 'center center',
                                                         },
                                                         // Customize the text

                                                         // background: {
                                                         //     // fill: '#d473d4',
                                                         //     width:'100px',
                                                         //     height:'100px',
                                                         //     fill:'none'
                                                         // }
                                                         // Customize background - only used when the `background` prop is true


                                                     }}>
                        <RadialSeparators
                            key={""}
                            count={30}
                            strokeWidth={10}
                            style={{
                                background: '#53F3CE',
                                width: '2px',
                                // This needs to be equal to props.strokeWidth
                                height: `${10}%`,
                            }}/>
                        <div className="d-flex flex-row justify-content-center" style={{marginTop: '0px'}}>
                            <div className="d-flex flex-column">
                                <Label style={{
                                    textTransform: 'capitalize',
                                    fontFamily: 'panton,sans-serif',
                                    fontSize: '30px',
                                    color: 'white',
                                    fontWeight: 'normal'
                                }}>{heart_rate}</Label>
                            </div>
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-column" style={{marginTop: '10px'}}>
                                    <img alt={"logo-cal"} src={require('../../assets/img/heart rate.png')}
                                         style={{
                                             height: '10px',
                                             width: '15px'
                                         }}/>
                                    <Label style={{
                                        textTransform: 'capitalize',
                                        fontFamily: 'panton,sans-serif',
                                        fontSize: '10px',
                                        color: 'white',
                                        fontWeight: 'normal'
                                    }}>bpm</Label>
                                </div>

                            </div>
                        </div>

                    </CircularProgressbarWithChildren>
                </Col>
                <Col md="6" style={divProgress}>
                    <div className="d-flex flex-row justify-content-start"
                         style={{
                             marginTop: '30px', width: '285px',
                         }}>
                        <img alt={"logo-cal"} src={require('../../assets/img/heart rate.png')}
                             style={{
                                 height: '30px',
                                 width: '30px'
                             }}/>
                        <Label style={{
                            marginLeft: '10px',
                            marginTop: '5px',
                            textTransform: 'capitalize',
                            fontFamily: 'panton,sans-serif',
                            fontSize: '10px',
                            fontWeight: 'normal'
                        }}>AVG Heart rate</Label>
                    </div>
                    <div
                        style={{
                            width: "300px",
                            height: "5px",
                            borderRadius: "10px",
                            marginLeft: "-30px"
                        }}
                    >
                        <HSBar
                            height="8px"
                            showTextDown
                            style={{
                                height: "20px",
                                width: "70%",
                                // marginLeft: "-30px",
                                // padding: "10px"
                            }}
                            id="hsbarExample"
                            data={[
                                {value: 200, description: "Light", color: "#53F3CE"},
                                {value: 200, description: "Very light", color: "#4dc8ff"},
                                {value: 200, description: "Moderate", color: "#008dcc"},
                                {value: 200, description: "Hard", color: "#006d9e"},
                                {value: 200, description: "Maximum", color: "#1e1e2f"}
                            ]}
                        />
                    </div>
                    <div className="d-flex flex-row justify-content-around"
                         style={{paddingLeft: '15px', marginTop: '40px'}}>
                        <div className="d-flex flex-row ">
                            <div id="TooltipExampleLight"
                                style={{
                                marginLeft: '90px',
                                // marginTop: '-5px',
                                height: '15px',
                                width: '15px',
                                backgroundColor: '#53F3CE'
                            }}></div>
                            <Tooltip placement="top" isOpen={this.state.tooltipOpenLight} target="TooltipExampleLight"
                                     toggle={this.toggleLight}>
                                {this.state.tooltipValueLight}
                            </Tooltip>
                            <Label style={{
                                marginTop: '1px',
                                marginRight: '5px',
                                marginLeft: '3px',
                                textTransform: 'capitalize',
                                fontFamily: 'panton,sans-serif',
                                fontSize: '10px',
                                color: '#53F3CE',
                                fontWeight: 'bold'
                            }}>Light</Label>
                        </div>
                        <div className="d-flex flex-row ">
                            <div
                                id="TooltipExampleVlight"
                                style={{
                                height: '15px',
                                width: '15px',
                                backgroundColor: '#4dc8ff'
                            }}></div>
                            <Tooltip placement="top" isOpen={this.state.tooltipOpenVLight} target="TooltipExampleVlight"
                                     toggle={this.toggleVLight}>
                                {this.state.tooltipValueVLight}
                            </Tooltip>
                            <Label style={{
                                marginTop: '1px',
                                marginLeft: '3px',
                                marginRight: '5px',
                                textTransform: 'capitalize',
                                fontFamily: 'panton,sans-serif',
                                fontSize: '10px',
                                color: '#4dc8ff',
                                width: '45px',
                                fontWeight: 'normal'
                            }}>Very light</Label>
                        </div>
                        <div className="d-flex flex-row ">
                            <div id="TooltipExampleModerate"
                                style={{
                                height: '15px',
                                width: '15px',
                                backgroundColor: '#008dcc'
                            }}></div>
                            <Tooltip placement="right" isOpen={this.state.tooltipOpenModerate} target="TooltipExampleModerate"
                                     toggle={this.toggleModerate}>
                                {this.state.tooltipValueModerate}
                            </Tooltip>
                            <Label style={{
                                marginTop: '1px',
                                marginRight: '5px',
                                marginLeft: '3px',
                                textTransform: 'capitalize',
                                fontFamily: 'panton,sans-serif',
                                fontSize: '10px',
                                color: '#008dcc',
                                fontWeight: 'normal'
                            }}>Moderate</Label>
                        </div>
                        <div className="d-flex flex-row ">
                            <div id="TooltipExampleHard"
                                style={{
                                height: '15px',
                                width: '15px',
                                backgroundColor: '#006d9e'
                            }}></div>
                            <Tooltip placement="right" isOpen={this.state.tooltipOpenHard} target="TooltipExampleHard"
                                     toggle={this.toggleHard}>
                                {this.state.tooltipValueHard}
                            </Tooltip>
                            <Label style={{
                                marginTop: '1px',
                                marginRight: '5px',
                                marginLeft: '3px',
                                textTransform: 'capitalize',
                                fontFamily: 'panton,sans-serif',
                                fontSize: '10px',
                                color: '#006d9e',
                                fontWeight: 'bold'
                            }}>Hard</Label>
                        </div>
                        <div className="d-flex flex-row ">
                            <div id="TooltipExampleMax"
                                style={{
                                height: '15px',
                                width: '15px',
                                backgroundColor: '#004766'
                            }}></div>
                            <Tooltip placement="right" isOpen={this.state.tooltipOpenMax} target="TooltipExampleMax"
                                     toggle={this.toggleMax}>
                                {this.state.tooltipValueMax}
                            </Tooltip>
                            <Label style={{
                                marginLeft: '3px',
                                marginTop: '1px',
                                textTransform: 'capitalize',
                                fontFamily: 'panton,sans-serif',
                                fontSize: '10px',
                                color: '#004766',
                                fontWeight: 'normal'
                            }}>Maximum</Label>
                        </div>
                    </div>
                </Col>

            </>

        );
    }
}

LastHeartRate.propTypes = {


    calculHeartRate: PropTypes.func.isRequired,

    last_heartRate: PropTypes.object.isRequired


};
const mapStateToProps = (state) => ({
    last_heartRate: state.last_heartRate

});
export default connect(
    mapStateToProps,
    {calculHeartRate})(LastHeartRate);