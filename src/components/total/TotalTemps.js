import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getTotalTempsParcourus} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';


class TotalTemps extends Component {

    componentDidMount() {
        this.props.getTotalTempsParcourus();

    }


    render() {


        var titleP = {
            marginTop: '60px',
        };
        var circleStyle = {
            padding: 10,
            margin: 20,
            display: "inline-block",
            backgroundColor: '#0000',
            borderRadius: "50%",
            border: "3px solid black",
            width: 180,
            height: 180,
        };
        const {temps} = this.props.temps;
        console.log(temps);


        if (temps === undefined) {
            return (
                <div>
                    <h6></h6>
                </div>

            )
        }
        var TextStyle = {
            padding: 10,
            margin: 20,
            marginTop: '20px',
            display: "inline-block",
            backgroundColor: '#0000',
            borderRadius: "50%",
            width: 200,
            height: 100, marginBottom: '0px',
        };

        return (

            <div style={TextStyle}>
                <h6 style={titleP}>Time</h6>
                <div style={{display: 'flex', marginLeft: '40px'}}>
                    <h4 style={{}}>{temps.totalTemps}</h4><h6>Min</h6>
                </div>
            </div>


    )
        ;
    }
}

TotalTemps.propTypes = {
    getTotalTempsParcourus: PropTypes.func.isRequired,
    // distancesByDate: PropTypes.object.isRequired,
    temps: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    temps: state.temps,


});
export default connect(
    mapStateToProps,
    {getTotalTempsParcourus,})(TotalTemps);