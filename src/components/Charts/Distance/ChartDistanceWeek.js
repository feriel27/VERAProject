import React, {Component} from "react";
import {connect} from "react-redux";
import {getWeekByUser} from "../../../store/actions/profileActions";
import PropTypes from "prop-types";
import moment from "moment";
import {Bar} from "react-chartjs-2";


class ChartDistanceWeek extends Component {

    componentDidMount() {
        this.props.getWeekByUser();
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

        console.log("weeeeeeeeeeeeeeeeeek");
        const {weekUsers} = this.props.weekUsers;

        console.log("week console", weekUsers);

        if (weekUsers === undefined) {
            return (
                <h4>waiiiiit</h4>
            )
        }

        let listDate= [];
        for(var i = 0;i<weekUsers.ListDate.length;i++){
            listDate.push(moment(weekUsers.ListDate[i]).format("MM/DD"));

        }
        console.log(listDate);

        return (


            <>

                <Bar
                    data={{
                        labels: listDate,
                        datasets: [
                            {
                                label: "Calorie",
                                fill: true,
                                borderColor: "#1f8ef1",
                                borderWidth: 2,
                                borderDash: [],
                                borderDashOffset: 0.0,
                                data: weekUsers.listTotalDistance
                            }
                        ]

                    }}

                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                        tooltips: {
                            backgroundColor: "#f5f5f5",
                            titleFontColor: "#333",
                            bodyFontColor: "#666",
                            bodySpacing: 4,
                            xPadding: 12,
                            mode: "nearest",
                            intersect: 0,
                            position: "nearest"
                        },
                        responsive: true,
                        scales: {
                            yAxes: [
                                {
                                    gridLines: {
                                        drawBorder: false,
                                        color: "rgba(225,78,202,0.1)",
                                        zeroLineColor: "transparent"
                                    },
                                    ticks: {
                                        suggestedMin: 60,
                                        suggestedMax: 120,
                                        padding: 20,
                                        fontColor: "#9e9e9e"
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        drawBorder: false,
                                        color: "rgba(225,78,202,0.1)",
                                        zeroLineColor: "transparent"
                                    },
                                    ticks: {
                                        padding: 20,
                                        fontColor: "#9e9e9e"
                                    }
                                }
                            ]
                        }
                    }}
                />
            </>


        );
    }
}


ChartDistanceWeek.propTypes = {
    getWeekByUser: PropTypes.func.isRequired,
    weekUsers: PropTypes.object.isRequired,

};
const mapStateToProps = (state) => ({
    weekUsers: state.weekUsers

});
export default connect(
    mapStateToProps,
    {getWeekByUser})(ChartDistanceWeek);