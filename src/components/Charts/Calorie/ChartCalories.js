import React, {Component} from "react";
import {connect} from "react-redux";
import {
    getWeekByUser,
    getMonthCalorieByUser,
    getTempsEnMinutes,
    getGameInfo,
} from "../../../store/actions/profileActions";
import PropTypes from "prop-types";
import classNames from "classnames";
import '../../../App.css';
import moment from 'moment';
import {Card, CardBody, CardHeader, Col, Button, Row, ButtonGroup} from "reactstrap";
import { Line} from "react-chartjs-2";
import Spinner from "react-bootstrap/Spinner";
import TotalCalories from "../../total/TotalCalories";


const chart = (x, y) => {
    let ctx = document.getElementById('chart').getContext('2d');

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);


    gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors


    return {
        labels: x,
        datasets: [
            {
                label: "Calories",
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: "#00d6b4",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#00d6b4",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#00d6b4",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: y
            }
        ]
    };
};

class ChartCalories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bigChartData: 'date1',
            data: []
        };
    }

    componentDidMount() {
        this.props.getWeekByUser();
        this.props.getMonthCalorieByUser();
        this.props.getTempsEnMinutes();
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
        this.state.data = chart(listDate, weekUsers.listTotalCal);
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
        console.log("liste date", listDate);
        for (var i = 0; i < weekUsers.ListDate.length; i++) {
            listDate.push(moment(weekUsers.ListDate[i]).format("MM/DD"));

        }
        console.log(listDate);
        if (name === 'data1') {
            console.log("this weeek");
            //month
            this.setState({
                data: chart(listDate, weekUsers.listTotalCal)
            })
        }


        console.log("mooooooooooooooooonth");
        const {monthCalorie} = this.props.monthCalorie;

        console.log("mooooooooooooooooonth console", monthCalorie);

        if (monthCalorie === undefined) {
            return (
                <Spinner color="success"/>
            )
        }
        let listTotal = [];

        if (name === 'data2') {
            console.log("same 2");
            //month
            this.setState({
                data: chart(monthCalorie.ListDate, monthCalorie.listTotalWeek1)
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

            listeCalorie.push(dist_temps.liste_dist[i].calorie);
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

            <Card className="card-chart">
                <CardHeader>
                    <Row>
                        <Col sm="7">
                            <ButtonGroup
                                className="btn-group-toggle float-right"
                                data-toggle="buttons"
                            >
                                <Button
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: this.state.bigChartData === "data1"
                                    })}
                                    style={{
                                        fontFamily: 'panton ,sans-serif',
                                        fontSize: '12px',
                                        color: '#53F3CE', borderColor: '#53F3CE'
                                    }}
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
                                        fontFamily: 'panton ,sans-serif',
                                        fontSize: '12px',
                                        color: '#53F3CE', borderColor: '#53F3CE'
                                    }}
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
                                        fontFamily: 'panton ,sans-serif',
                                        fontSize: '12px',
                                        color: '#53F3CE', borderColor: '#53F3CE'
                                    }}
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
                <CardBody className="d-flex flex-row justify-content-around">
                    <Row style={{marginLeft: '-80px'}}>
                        <Col className="chart-area" style={{marginLeft: '5px', height:'300px'}}>
                            <Line id="chart"
                                  data={this.state.data}
                                  options={
                                      {
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
                                                      barPercentage: 1.6,
                                                      gridLines: {
                                                          drawBorder: false,
                                                          color: "rgba(29,140,248,0.0)",
                                                          zeroLineColor: "transparent"
                                                      },
                                                      ticks: {
                                                          suggestedMin: 50,
                                                          suggestedMax: 125,
                                                          padding: 20,
                                                          fontColor: "#9e9e9e"
                                                      }
                                                  }
                                              ],

                                              xAxes: [
                                                  {
                                                      barPercentage: 1.6,
                                                      gridLines: {
                                                          drawBorder: false,
                                                          color: "rgba(0,242,195,0.1)",
                                                          zeroLineColor: "transparent"
                                                      },
                                                      ticks: {
                                                          padding: 20,
                                                          fontColor: "#9e9e9e"
                                                      }
                                                  }
                                              ]
                                          }
                                      }
                                  }

                            />
                        </Col>
                        <Col>
                            <TotalCalories/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

        );
    }
}


ChartCalories.propTypes = {
    getWeekByUser: PropTypes.func.isRequired,
    weekUsers: PropTypes.object.isRequired,
    getMonthCalorieByUser: PropTypes.func.isRequired,
    //  monthUsers: PropTypes.object.isRequired,
    monthCalorie: PropTypes.object.isRequired,
    getTempsEnMinutes: PropTypes.func.isRequired,
    tempsMinutes: PropTypes.object.isRequired,
    getGameInfo: PropTypes.func.isRequired,
    dist_temps: PropTypes.object.isRequired

};
const mapStateToProps = (state) => ({
    weekUsers: state.weekUsers,
    // monthUsers: state.monthUsers,
    tempsMinutes: state.tempsMinutes,
    dist_temps: state.dist_temps,
    monthCalorie: state.monthCalorie
});
export default connect(
    mapStateToProps,
    {getWeekByUser, getMonthCalorieByUser, getTempsEnMinutes, getGameInfo})(ChartCalories);