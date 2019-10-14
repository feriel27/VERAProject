import React, {Component} from "react";
import {connect} from "react-redux";
import {getGameInfo, getTempsEnMinutes} from "../../../store/actions/profileActions";
import {Bar} from "react-chartjs-2";
import PropTypes from "prop-types";
import moment from "moment";


class ChartCaloriesAllTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            chartData: [],
            listeD: [],
            listeT: []

        };
        this.toggle = this.toggle.bind(this);


    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount() {
        this.props.getTempsEnMinutes();
        this.props.getGameInfo();

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

        const {tempsMinutes} = this.props.tempsMinutes;
        const {dist_temps} = this.props.dist_temps;

        console.log(tempsMinutes);
        console.log(dist_temps.liste_dist);
        if (tempsMinutes === undefined) {

            return (
                <div>
                    {/*<Spinner color="success"/>*/}
                    <h4></h4>
                </div>
            );

        }
        if (dist_temps.liste_dist === undefined) {

            return (
                <h5>
                    undefined
                </h5>
            );

        }

        let listeCalorie = [];
        let listeDate = [];
        for (let i = 0; i < dist_temps.liste_dist.length; i++)

            listeCalorie.push(dist_temps.liste_dist[i].calorie);
        console.log(listeCalorie);

        for (let i = 0; i < dist_temps.liste_dist.length; i++)

            listeDate.push(moment(dist_temps.liste_dist[i].Date).format("DD/MM"));

        return (
            <Bar
                data={{
                    labels: listeDate,
                    datasets: [
                        {
                            label: "chart calories",
                            fill: true,
                            borderColor: "#53F3CE",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: listeCalorie
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
        );
    }
}


ChartCaloriesAllTime.propTypes = {
    getTempsEnMinutes: PropTypes.func.isRequired,
    tempsMinutes: PropTypes.object.isRequired,
    getGameInfo: PropTypes.func.isRequired,
    dist_temps: PropTypes.object.isRequired

};
const mapStateToProps = (state) => ({
    tempsMinutes: state.tempsMinutes,
    dist_temps: state.dist_temps

});
export default connect(
    mapStateToProps,
    {getTempsEnMinutes, getGameInfo})(ChartCaloriesAllTime);