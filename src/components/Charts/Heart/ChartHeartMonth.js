import React, {Component} from "react";
import { connect } from "react-redux";
import { getMonthHeartByUser } from "../../../store/actions/profileActions";
import PropTypes from "prop-types";


class ChartDistanceMonth extends Component {

    componentDidMount() {
        this.props.getMonthHeartByUser();
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

        let { monthHeart } = this.props.monthHeart;

        console.log(monthHeart);

        if (monthHeart === undefined) {
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
    getMonthHeartByUser: PropTypes.func.isRequired,
    monthHeart: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
    monthHeart: state.monthHeart

});
export default connect(
    mapStateToProps,
    {getMonthHeartByUser})(ChartDistanceMonth);