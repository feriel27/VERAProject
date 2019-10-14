import React, {Component} from "react";
import {connect} from "react-redux";
import {
    getWeekByUser,
    getMonthVitesseByUser,
    getGameInfo,
} from "../../../store/actions/profileActions";
import PropTypes from "prop-types";
import classNames from "classnames";

import moment from 'moment';
import {Card, CardBody, CardHeader, Col, Button, Row, ButtonGroup, CardTitle} from "reactstrap";
import {Bar, Line} from "react-chartjs-2";
import Spinner from "react-bootstrap/Spinner";


const chart = (x, y) => {
    // let ctx = document.getElementById('chart').getContext('2d');
    //
    // let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    //
    // gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    // gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    // gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    return {
        labels: x,
        datasets: [
            {
                label: "Calories",
                fill: true,
                backgroundColor: "rgba(72,72,176,0.1)",
                hoverBackgroundColor: "rgba(72,72,176,0.1)",
                borderColor: "#d048b6",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                data: y
            }
        ]
    };
};

class ChartVitesse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bigChartData: 'date1',
            data: []
        };
    }

    componentDidMount() {
        this.props.getWeekByUser();
        this.props.getMonthVitesseByUser();
        this.props.getGameInfo();


    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("weeeeeeeeeeeeeeeeeek");
        const {weekUsers} = this.props.weekUsers;

        console.log("week console", weekUsers);

        if (weekUsers === undefined) {
            return (
                <Spinner color="success"/>
            )
        }

        let listDate = [];
        for (var i = 0; i < weekUsers.ListDate.length; i++) {
            listDate.push(moment(weekUsers.ListDate[i]).format("MM/DD"));

        }
        console.log(listDate);
        this.state.data = chart(listDate, weekUsers.listTotalVitesse);
    }

    onChangeChart = name => {

        console.log("weeeeeeeeeeeeeeeeeek");
        const {weekUsers} = this.props.weekUsers;

        console.log("week console", weekUsers);

        if (weekUsers === undefined) {
            return (
                <Spinner color="success"/>
            )
        }

        let listDate = [];
        for (var i = 0; i < weekUsers.ListDate.length; i++) {
            listDate.push(moment(weekUsers.ListDate[i]).format("MM/DD"));

        }
        console.log(listDate);
        if (name === 'data1') {
            console.log("this weeek");
            //month
            this.setState({
                data: chart(listDate, weekUsers.listTotalVitesse)
            })
        }


        console.log("mooooooooooooooooonth");
        const {monthVitesse} = this.props.monthVitesse;

        console.log("mooooooooooooooooonth console", monthVitesse);

        if (monthVitesse === undefined) {
            return (
                <Spinner color="success"/>
            )
        }
        let listTotal =[];
        listTotal.push(monthVitesse.listTotalWeek1);
        listTotal.push(monthVitesse.listTotalWeek2);
        listTotal.push(monthVitesse.listTotalWeek3);
        listTotal.push(monthVitesse.listTotalWeek4);
        console.log(listTotal);
        if (name === 'data2') {
            console.log("same 2");
            //month
            this.setState({
                data: chart(monthVitesse.ListDate, listTotal)
            })
        }


        //aaaallll
        console.log("aaaaaaaaall");
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
                    <Spinner color="success"/>
                </h5>
            );

        }

        let listeCalorie = [];
        let listeDateAll = [];
        for (let i = 0; i < dist_temps.liste_dist.length; i++)

            listeCalorie.push(dist_temps.liste_dist[i].vitesse);
        console.log(listeCalorie);

        for (let i = 0; i < dist_temps.liste_dist.length; i++)

            listeDateAll.push(moment(dist_temps.liste_dist[i].Date).format("DD/MM/YYYY"));
        if (name === 'data3') {
            console.log("same 3");
            //month

            this.setState({
                data: chart(listeDateAll, listeCalorie)
            })

        }

    };


    render() {


        return (
            <>
                <>
                    <div className="content">
                        <Row>
                            <Col sm="6">
                                <Card className="card-chart">
                                    <CardHeader>
                                        <Row>
                                            <Col className="text-left" sm="6">
                                                {/*<h5 className="card-category">Total Shipments</h5>*/}
                                                {/*<CardTitle tag="h6">Performance</CardTitle>*/}
                                            </Col>
                                            <Col sm="6">
                                                <ButtonGroup
                                                    className="btn-group-toggle float-right"
                                                    data-toggle="buttons"
                                                >
                                                    <Button
                                                        style={{
                                                            fontFamily: 'panton regular',
                                                            fontSize: '15px',
                                                            color: '#53F3CE',
                                                            borderColor: '#53F3CE'
                                                        }}
                                                        tag="label"
                                                        className={classNames("btn-simple", {
                                                            active: this.state.bigChartData === "data1"
                                                        })}
                                                        color="info"
                                                        id="0"
                                                        size="sm"
                                                        onClick={() => this.onChangeChart("data1")}
                                                    >
                                                        <input
                                                            defaultChecked
                                                            className="d-none"
                                                            name="options"
                                                            type="radio"
                                                        />
                                                        <span
                                                            className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            This Week
                          </span>
                                                        <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02"/>
                          </span>
                                                    </Button>
                                                    <Button
                                                        style={{
                                                            fontFamily: 'panton regular',
                                                            fontSize: '15px',
                                                            color: '#53F3CE',
                                                            borderColor: '#53F3CE'
                                                        }}
                                                        color="info"
                                                        id="1"
                                                        size="sm"
                                                        tag="label"
                                                        className={classNames("btn-simple", {
                                                            active: this.state.bigChartData === "data1"
                                                        })}
                                                        onClick={() => this.onChangeChart("data2")}
                                                    >
                                                        <input
                                                            className="d-none"
                                                            name="options"
                                                            type="radio"
                                                        />
                                                        <span
                                                            className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            This month
                          </span>
                                                        <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2"/>
                          </span>
                                                    </Button>
                                                    <Button
                                                        style={{
                                                            fontFamily: 'panton regular',
                                                            fontSize: '15px',
                                                            color: '#53F3CE',
                                                            borderColor: '#53F3CE'
                                                        }}
                                                        color="info"
                                                        id="2"
                                                        size="sm"
                                                        tag="label"
                                                        className={classNames("btn-simple", {
                                                            active: this.state.bigChartData === "data3"
                                                        })}
                                                        onClick={() => this.onChangeChart("data3")}
                                                    >
                                                        <input
                                                            className="d-none"
                                                            name="options"
                                                            type="radio"
                                                        />
                                                        <span
                                                            className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            All Time
                          </span>
                                                        <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02"/>
                          </span>
                                                    </Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="chart-area">
                                            <Bar
                                                data={this.state.data}
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
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </>
            </>

        );
    }
}


ChartVitesse.propTypes = {
    getWeekByUser: PropTypes.func.isRequired,
    weekUsers: PropTypes.object.isRequired,
    getMonthVitesseByUser: PropTypes.func.isRequired,
    //  monthUsers: PropTypes.object.isRequired,
    monthVitesse: PropTypes.object.isRequired,
    getGameInfo: PropTypes.func.isRequired,
    dist_temps: PropTypes.object.isRequired

};
const mapStateToProps = (state) => ({
    weekUsers: state.weekUsers,
    // monthUsers: state.monthUsers,
    dist_temps: state.dist_temps,
    monthVitesse: state.monthVitesse
});
export default connect(
    mapStateToProps,
    {getWeekByUser, getMonthVitesseByUser,  getGameInfo})(ChartVitesse);