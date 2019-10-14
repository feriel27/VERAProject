import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getProgressGOAL} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import module and default styles
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class ProgressGoal extends Component {

    componentDidMount() {
        this.props.getProgressGOAL();
    }

    render() {

        const {progressGOAL} = this.props.progressGOAL;
        console.log(progressGOAL);
        const percentage = progressGOAL.pourcentageALL;


        if (progressGOAL === undefined) {
            return (
                <></>
            )
        }


        return (
            <div>
                <div style={{width: "60%",marginLeft:'10%',marginTop:'-20px'}}>
                    <CircularProgressbar value={percentage} percentage={percentage} text={`Total goals Achieved  ${percentage}%`}
                                         styles={{
                                             // Customize the root svg element
                                             root: {},
                                             // Customize the path, i.e. the "completed progress"
                                             path: {
                                                 // Path color
                                                 // stroke: `rgba(212, 115, 212, ${percentage / 100})`,
                                                 // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                 // strokeLinecap: 'butt',
                                                 // // Customize transition animation
                                                 // transition: 'stroke-dashoffset 0.5s ease 0s',
                                             },
                                             // Customize the circle behind the path, i.e. the "total progress"
                                             // trail: {
                                             //     // Trail color
                                             //     stroke: '#53F3CE',
                                             //     blockSize:'5px'
                                             // },
                                             // Customize the text
                                             text: {
                                                 // Text color
                                                 fill: '#53F3CE',
                                                 // Text size
                                                 fontSize: '7px',
                                             },
                                             // Customize background - only used when the `background` prop is true






                                         }}/>
                </div>
            </div>


        );
    }
}

ProgressGoal.propTypes = {

    getProgressGOAL: PropTypes.func.isRequired,
    progressGOAL: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    progressGOAL: state.progressGOAL,

});
export default connect(
    mapStateToProps,
    {getProgressGOAL})(ProgressGoal);