import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getTotalVitesse} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner";

class TotalVitesse extends Component {

    componentDidMount() {
        this.props.getTotalVitesse();

    }

    render() {
        var circleStyle = {
            padding: 10,
            margin: 20,


            display: "inline-block",
            backgroundColor: '#0000',
            borderRadius: "50%",
            border: "3px solid #1d8cf8",
            width: 180,
            height: 180,
        };

        var titleP = {
            marginTop: '50px',
            textAlign: 'center'
        };
        const {totalVitesse} = this.props.totalVitesse;
        console.log(totalVitesse);


        if (totalVitesse === undefined) {
            return (
                <Spinner color="success"/>

            )
        }


        return (

            <div style={circleStyle}>
                <h6 style={titleP}>Total Vitesse</h6>
                <div style={{display: 'flex', marginLeft: '40px'}}>
                    <h1 style={{}}>{totalVitesse.total}</h1><h6></h6>
                </div>
            </div>


        );
    }
}

TotalVitesse.propTypes = {

    getTotalVitesse: PropTypes.func.isRequired,
    totalVitesse: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    totalVitesse: state.totalVitesse,

});
export default connect(
    mapStateToProps,
    {getTotalVitesse})(TotalVitesse);