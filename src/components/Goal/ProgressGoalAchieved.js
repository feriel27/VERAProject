import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getProgressGOAL} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbarWithChildren} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class ProgressGoalAchieved extends Component {

    componentDidMount() {
        this.props.getProgressGOAL();
    }

    render() {

        const {progressGOAL} = this.props.progressGOAL;
        console.log(progressGOAL);
        const percentage = Number.parseInt(progressGOAL.progress);

        if (progressGOAL === undefined) {
            return (
                <></>
            )
        }


        return (

            <div style={{width: '150px', marginLeft: '20%', marginTop: '-15px'}}>
                <CircularProgressbarWithChildren value={percentage}
                                                 strokeWidth={4}
                                                 styles={{
                                                     width: '10px',
                                                     // Customize the root svg element
                                                     root: {},
                                                     // Customize the path, i.e. the "completed progress"
                                                     path: {
                                                         //     // Path color
                                                         stroke: `#53F3CE`,
                                                         //     // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                         strokeLinecap: 'round',
                                                         //     // // Customize transition animation
                                                         transition: 'stroke-dashoffset 0.5s ease 0s',
                                                     },
                                                     // Customize the circle behind the path, i.e. the "total progress"
                                                     trail: {
                                                         // Trail color
                                                         stroke: '#d6d6d6',
                                                         // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                         strokeLinecap: 'butt',
                                                         // Rotate the trail
                                                         transform: 'rotate(0.25turn)',
                                                         transformOrigin: 'center center',
                                                     },
                                                     // Customize the text
                                                     text: {
                                                         // Text color
                                                         fill: '#53F3CE',
                                                         // Text size
                                                         fontSize: '6px',
                                                         fontFamily: 'panton,sans-serif'
                                                     },
                                                     background: {
                                                         fill: '#d473d4',
                                                     }
                                                     // Customize background - only used when the `background` prop is true


                                                 }}>
                    <div style={{marginTop: '40px'}}>
                        <h6
                            style={{
                                fontFamily: 'panton,sans-serif',
                                textTransform: 'capitalize',
                                fontSize: '15px',
                                fontWeight: 'normal',
                                textAlign: 'start',
                                color: '#53F3CE'
                            }}>Goal Achieved</h6><br/>
                        <br/>
                        <h2 className="text-center"
                            style={{
                                marginTop: '-50px',
                                textTransform: 'capitalize',
                                fontFamily: 'panton,sans-serif',
                                fontSize: '25px',
                                fontWeight: 'normal'
                            }}>{percentage}%</h2>
                    </div>
                </CircularProgressbarWithChildren>
            </div>


        );
    }
}

ProgressGoalAchieved.propTypes = {

    getProgressGOAL: PropTypes.func.isRequired,
    progressGOAL: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    progressGOAL: state.progressGOAL,

});
export default connect(
    mapStateToProps,
    {getProgressGOAL})(ProgressGoalAchieved);