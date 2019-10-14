import React, {Component} from "react";
import { connect } from "react-redux";
import { getMonthDistanceByUser } from "../../../store/actions/profileActions";
import PropTypes from "prop-types";


class ChartDistanceMonth extends Component {

    componentDidMount() {
        this.props.getMonthDistanceByUser();
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: "right",
        labelsLegend: {
            fontColor: "#000"
        }
    };

    render() {

        let { monthDistance } = this.props.monthDistance;

        console.log(monthDistance);

        if (monthDistance === undefined) {
            return (
                <h4>waiiiiit</h4>
            )
        }

        // for(let i=0;i< monthusers.liste_dist.length;i++)
        //
        //     listeCalorie.push( dist_temps.liste_dist[i].calorie );
        // console.log(listeCalorie);
        //


        return (


            <></>


        );
    }
}


ChartDistanceMonth.propTypes = {
    getMonthDistanceByUser: PropTypes.func.isRequired,
    monthDistance: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
    monthDistance: state.monthDistance

});
export default connect(
    mapStateToProps,
    {getMonthDistanceByUser})(ChartDistanceMonth);