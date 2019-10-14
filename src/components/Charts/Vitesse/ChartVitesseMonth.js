import React, {Component} from "react";
import { connect } from "react-redux";
import { getMonthVitesseByUser } from "../../../store/actions/profileActions";
import PropTypes from "prop-types";


class ChartDistanceMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bigChartData: ''
        };
    }
    componentDidMount() {
        this.props.getMonthVitesseByUser();
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

        let { monthVitesse } = this.props.monthVitesse;

        console.log(monthVitesse);

        if (monthVitesse === undefined) {
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
    getMonthVitesseByUser: PropTypes.func.isRequired,
    monthVitesse: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
    monthVitesse : state.monthVitesse

});
export default connect(
    mapStateToProps,
    {getMonthVitesseByUser})(ChartDistanceMonth);