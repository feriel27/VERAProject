import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getPourcentageAllGoals} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import module and default styles
import { Row} from "reactstrap";
import "react-circular-progressbar/dist/styles.css";
import '../../App.css';
import "antd/dist/antd.css";
import { CircularProgressbarWithChildren} from "react-circular-progressbar";

class ProgressGA extends Component {

    componentDidMount() {
        this.props.getPourcentageAllGoals();
    }

    render() {

        const {progressALL} = this.props.progressALL;
        console.log(progressALL);
        const percentage = Number.parseInt(progressALL.pourcentageALL);


        if (progressALL === undefined) {
            return (
                <></>
            )
        }


        return (
            <Row style={{width: '230px', marginLeft: '10%', marginTop: '-45px'}}>

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
                                fontSize: '20px',
                                textTransform: 'capitalize',
                                fontWeight: 'normal',
                                textAlign: 'start',
                                color: '#53F3CE'
                            }}>Progress Goals</h6><br/>
                        <h6
                            style={{
                                marginTop:'-30px',
                                marginLeft: '55px',
                                fontFamily: 'panton,sans-serif',
                                textTransform: 'capitalize',
                                fontSize: '20px',
                                fontWeight: 'normal',
                                textAlign: 'start',
                                color: '#53F3CE'
                            }}>Achieved</h6><br/>
                        <h2 className="text-center"
                            style={{
                                marginTop: '-25px',
                                fontFamily: 'panton,sans-serif',
                                fontSize: '30px',
                                fontWeight: 'normal'
                            }}>{percentage}%</h2>
                    </div>
                </CircularProgressbarWithChildren>
            </Row>
        );
    }
}

ProgressGA.propTypes = {

    getPourcentageAllGoals: PropTypes.func.isRequired,
    progressALL: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    progressALL: state.progressALL,

});
export default connect(
    mapStateToProps,
    {getPourcentageAllGoals})(ProgressGA);