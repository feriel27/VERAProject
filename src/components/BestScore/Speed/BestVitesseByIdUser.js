import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getBestScoreSpeedByIdUser} from "../../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountUp from "react-countup/build";

class BestVitesseByIdUser extends Component {

    componentDidMount() {
        this.props.getBestScoreSpeedByIdUser();

    }

    render() {

        const {best_speed_by_iduser} = this.props.best_speed_by_iduser;
        console.log(best_speed_by_iduser);


        if (best_speed_by_iduser === undefined || best_speed_by_iduser.best_speed === undefined) {
            return (
                <h4></h4>
            )
        }

        let circleStyle = {
            padding: 10,
            margin: 30,
            marginLeft: '60px',
            display: "inline-block",
            backgroundColor: '#0000',
            borderRadius: "50%",
            border: "4px solid #53F3CE",
            width: 180,
            height: 180,
            fontFamily: 'panton ,sans-serif',
            fontSize: '20px'
        };

        let titleP = {
            marginTop: '50px',
            textAlign: 'center',
            fontFamily: 'panton ,sans-serif',
            fontSize: '18px',
            textTransform: 'capitalize',

        };
        const {unit_format} = this.props.unit_format;


        return (

            <div style={circleStyle}>
                <h6 style={titleP}>Total Speed</h6>
                <div className="d-flex " style={{marginLeft: '40px'}}>
                    <h1 className="text-lowercase"
                        style={{
                            fontFamily: 'panton ,sans-serif', fontSize: '16px', marginLeft: '10px',
                        }}>
                        {unit_format ?
                            //kilometre
                            <h1
                                style={{
                                    fontFamily: 'panton ,sans-serif', fontSize: '16px',color:'white'
                                }}
                            >{best_speed_by_iduser.best_speed} </h1>
                            :
                            //metre
                            <h1
                                style={{
                                    fontFamily: 'panton ,sans-serif', fontSize: '16px',color:'white'
                                }}
                            >{best_speed_by_iduser.best_speed * 1000}</h1>
                        }
                    </h1>
                    <h6 className="text-center"
                        style={{
                            fontFamily: 'panton ,sans-serif', textTransform: 'capitalize',color:'white',
                            fontSize: '12px'
                        }}>
                        {unit_format ? 'Km' : 'm' }
                    </h6>
                </div>
            </div>


        );
    }
}

BestVitesseByIdUser.propTypes = {
    unit_format: PropTypes.bool,
    getBestScoreSpeedByIdUser: PropTypes.func.isRequired,
    best_speed_by_iduser: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    best_speed_by_iduser: state.best_speed_by_iduser,
    unit_format:state.unit_format

});
export default connect(
    mapStateToProps,
    {getBestScoreSpeedByIdUser})(BestVitesseByIdUser);