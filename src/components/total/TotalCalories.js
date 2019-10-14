import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getTotalCalories} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner";

class TotalCalories extends Component {

    componentDidMount() {
        this.props.getTotalCalories();

    }

    render() {

        const {totalCalories} = this.props.totalCalories;
        console.log(totalCalories);


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
        if (totalCalories === undefined) {
            return (
                <Spinner color="success"/>

            )
        }


        return (
            <div style={circleStyle}>
                <h6 style={titleP}>Total Burned Calories</h6>
                <div className="d-flex " style={{marginLeft: '40px'}}>
                    <h1 className="text-lowercase"
                        style={{ color:'white',
                            fontFamily: 'panton ,sans-serif', fontSize: '16px', marginLeft: '10px',
                        }}>{totalCalories.totalC}

                    </h1>
                    <h6 className="text-center"
                        style={{
                            fontFamily: 'panton ,sans-serif', textTransform: 'capitalize',color:'white',
                            fontSize: '12px'
                        }}>Cal</h6>
                </div>
            </div>


        );
    }
}

TotalCalories.propTypes = {

    getTotalCalories: PropTypes.func.isRequired,
    totalCalories: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    totalCalories: state.totalCalories,

});
export default connect(
    mapStateToProps,
    {getTotalCalories})(TotalCalories);