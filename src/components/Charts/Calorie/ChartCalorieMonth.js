import React, {Component} from "react";
import { connect } from "react-redux";
import { getMonthCalorieByUser } from "../../../store/actions/profileActions";
import PropTypes from "prop-types";


class ChartCalorieMonth extends Component {

    componentDidMount() {
        this.props.getMonthCalorieByUser();
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

        let { monthUsers } = this.props.monthCalorie;

        console.log(monthUsers);

        if (monthUsers === undefined) {
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


ChartCalorieMonth.propTypes = {
    getMonthCalorieByUser: PropTypes.func.isRequired,
    monthCalorie: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
    monthCalorie: state.monthCalorie

});
export default connect(
    mapStateToProps,
    {getMonthCalorieByUser})(ChartCalorieMonth);