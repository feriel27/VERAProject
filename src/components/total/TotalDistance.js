import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getTotalDistances} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner";
import {Label} from "reactstrap";

class TotalDistance extends Component {

    componentDidMount() {
        this.props.getTotalDistances();

    }

    render() {
        let circleStyle = {
            padding: 10,
            margin: 20,
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

        const {totalDistances} = this.props.totalDistances;
        console.log(totalDistances);


        if (totalDistances === undefined) {
            return (
                <Spinner color="success"/>

            )
        }


        return (


            <div style={circleStyle}>
                <h6 style={titleP}>Total Distance</h6>
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
                            >  {totalDistances.totalD}</h1>
                            :
                            //metre
                            <h1
                                style={{
                                    fontFamily: 'panton ,sans-serif', fontSize: '16px',color:'white'
                                }}
                            >  {totalDistances.totalD*1000}</h1>
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

TotalDistance.propTypes = {
    unit_format: PropTypes.bool,

    getTotalDistances: PropTypes.func.isRequired,
    totalDistances: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    totalDistances: state.totalDistances,
    unit_format:state.unit_format

});
export default connect(
    mapStateToProps,
    {getTotalDistances})(TotalDistance);