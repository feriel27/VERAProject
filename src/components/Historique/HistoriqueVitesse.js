import React, {Component} from "react";
import {connect} from "react-redux";
import {
    getWeekByUser,
    getMonthVitesseByUser,
    getGameInfo,
} from "../../store/actions/profileActions";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Card, CardBody, CardHeader, Col, Button, Row, ButtonGroup, Table, Label} from "reactstrap";
import Moment from "react-moment";

import '../../App.css';
import BestVitesseByIdUser from "../BestScore/Speed/BestVitesseByIdUser";

class HistoriqueVitesse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bigChartData: 'date1',
            listWeeek: [],
            listMonth: [],
            listAll: [],

        };
    }

    componentDidMount() {
        this.props.getWeekByUser();
        this.props.getMonthVitesseByUser();
        this.props.getGameInfo();


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.bigChartData = "data1"
    }

    onChangeChart = (name) => {
        this.setState({bigChartData: name})
    };


    render() {

        console.log("data fel render", this.state.bigChartData);
        console.log("weeeeeeeeeeeeeeeeeek");
        const {weekUsers} = this.props.weekUsers;
        const {dist_temps} = this.props.dist_temps;
        const {unit_format} = this.props.unit_format;

        if (dist_temps === undefined) {
            return (
                <h4></h4>
            );
        }
        if (dist_temps.liste_dist === undefined) {
            return (
                <h4></h4>
            );
        }
        console.log("week console", weekUsers);
        if (weekUsers === undefined) {
            return (
                <h4></h4>
            );
        }
        let listVITESSE = [];
        for (let j = 0; j < weekUsers.ListDate.length; j++) {
            listVITESSE.push({
                    date: weekUsers.ListDate[j],
                    speed: weekUsers.listTotalVitesse[j]
                }
            );
        }

        if (weekUsers.listVitesseByDate === undefined) {
            return (
                <h4>undefined</h4>
            );
        }
        if (weekUsers.listTotalVitesse.length === 0) {
            return (
                <h4>0</h4>
            );
        }

        const {monthVitesse} = this.props.monthVitesse;

        if (monthVitesse.ListDate === undefined) {
            return (
                <h4>undefined</h4>
            );
        }
        console.log("monthVitesse", monthVitesse);

        let listVITESSEMONTH = [];
        for (let j = 0; j < monthVitesse.ListDate.length; j++) {
            listVITESSEMONTH.push({
                    date: monthVitesse.ListDate[j],
                    speed: monthVitesse.listTotalWeek1[j]
                }
            );
        }


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
                                        active: this.state.bigChartData === "data2"
                                    })}
                                    style={{
                                        fontFamily: 'panton ,sans-serif',
                                        fontSize: '12px',
                                        color: '#53F3CE',
                                        borderColor: '#53F3CE'
                                    }}
                                    id="0"
                                    size="sm"
                                    onClick={() => this.onChangeChart("data2")}
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
                                        color: '#53F3CE',
                                        borderColor: '#53F3CE'
                                    }}
                                    id="1"
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
                                        color: '#53F3CE',
                                        borderColor: '#53F3CE'
                                    }}
                                    id="2"
                                    size="sm"
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: this.state.bigChartData === "data1"
                                    })}
                                    onClick={() => this.onChangeChart("data1")}
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
                    <Row style={{marginLeft: '50px'}}>

                        <Col className="chart-area" style={{marginLeft: '15px', width: '500px', height: '310px'}}>
                            {this.state.bigChartData === 'data2' ?
                                <Table striped style={{width: '400px'}}>
                                    <thead className="text-primary">
                                    <tr>
                                        <th style={{
                                            fontFamily: 'panton  ,sans-serif', color: 'white',
                                            fontSize: '14px ', textAlign: 'center', textTransform: 'capitalize'
                                        }}>
                                            Date
                                        </th>
                                        <th style={{
                                            fontFamily: 'panton  ,sans-serif', color: 'white',
                                            fontSize: '14px ', textAlign: 'center', textTransform: 'capitalize'
                                        }}>
                                            Value
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {listVITESSE.map(function (game, idx) {
                                        return (
                                            <tr key={idx} style={{
                                                fontFamily: 'panton semibold',
                                                fontSize: '14px '
                                            }}>
                                                <td className="text-center"
                                                    style={{width: '70px', textAlign: 'center'}}>
                                                    <Moment style={{
                                                        fontFamily: 'panton  ,sans-serif', color: 'white',
                                                        fontSize: '14px ', textTransform: 'capitalize'
                                                    }} format="DD-MM-YYYY">
                                                        {game.date}
                                                    </Moment>
                                                </td>
                                                <td className="text-center" style={{
                                                    width: '70px',

                                                }}>
                                                    {unit_format ?
                                                        <Label style={{fontFamily: 'panton  ,sans-serif',
                                                            color: 'white',
                                                            fontSize: '14px ',
                                                            textTransform: 'capitalize'
                                                        }}>{game.speed}</Label>
                                                        :
                                                        <Label style={{fontFamily: 'panton  ,sans-serif',
                                                            color: 'white',
                                                            fontSize: '14px ',
                                                            textTransform: 'capitalize'
                                                        }}>{game.speed*1000}</Label>

                                                    }

                                                    <Label style={{
                                                        fontFamily: 'panton  ,sans-serif',
                                                        color: 'white',
                                                        fontSize: '10px ',
                                                        textAlign: 'center',
                                                        textTransform: 'capitalize'
                                                    }}>
                                                        {unit_format ? 'Km' : 'm'}
                                                    </Label>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                                : (this.state.bigChartData === 'data3') ?
                                    <Table striped style={{width: '400px'}}>
                                        <thead className="text-primary">
                                        <tr>
                                            <th style={{
                                                fontFamily: 'panton  ,sans-serif', color: 'white',
                                                fontSize: '14px ', textAlign: 'center', textTransform: 'capitalize'
                                            }}>
                                                Date
                                            </th>
                                            <th style={{
                                                fontFamily: 'panton  ,sans-serif', color: 'white',
                                                fontSize: '14px ', textAlign: 'center', textTransform: 'capitalize'
                                            }}>
                                                Value
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {listVITESSEMONTH.map(function (game, idx) {
                                            return (
                                                <tr key={idx} style={{
                                                    fontFamily: 'panton semibold',
                                                    fontSize: '14px '
                                                }}>
                                                    <td className="text-center"
                                                        style={{width: '70px', textAlign: 'center'}}>
                                                        <Moment style={{
                                                            fontFamily: 'panton  ,sans-serif', color: 'white',
                                                            fontSize: '14px ', textTransform: 'capitalize'
                                                        }} format="DD-MM-YYYY">
                                                            {game.date}
                                                        </Moment>
                                                    </td>
                                                    <td className="text-center" style={{
                                                        width: '70px',

                                                    }}>


                                                        {unit_format ?
                                                            <Label style={{fontFamily: 'panton  ,sans-serif',
                                                                color: 'white',
                                                                fontSize: '14px ',
                                                                textTransform: 'capitalize'
                                                            }}>{game.speed}</Label>
                                                            :
                                                            <Label style={{fontFamily: 'panton  ,sans-serif',
                                                                color: 'white',
                                                                fontSize: '14px ',
                                                                textTransform: 'capitalize'
                                                            }}>{game.speed*1000}</Label>

                                                        }

                                                        <Label style={{
                                                            fontFamily: 'panton  ,sans-serif',
                                                            color: 'white',
                                                            fontSize: '10px ',
                                                            textAlign: 'center',
                                                            textTransform: 'capitalize'
                                                        }}>
                                                            {unit_format ? 'Km/h' : 'm'}
                                                        </Label>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                    : (this.state.bigChartData === 'data1') ?
                                        <Table striped style={{width: '400px'}}>
                                            <thead className="text-primary">
                                            <tr>

                                                <th style={{
                                                    fontFamily: 'panton  ,sans-serif', color: 'white',
                                                    fontSize: '14px ', textAlign: 'center', textTransform: 'capitalize'
                                                }}>
                                                    Date
                                                </th>
                                                <th style={{
                                                    fontFamily: 'panton  ,sans-serif', color: 'white',
                                                    fontSize: '14px ', textAlign: 'center', textTransform: 'capitalize'
                                                }}>
                                                    Value
                                                </th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            {dist_temps.liste_dist.map(function (game, idx) {
                                                return (
                                                    <tr key={idx} style={{
                                                        fontFamily: 'panton semibold',
                                                        fontSize: '14px ',

                                                    }}>
                                                        <td className="text-center"
                                                            style={{width: '70px', textAlign: 'center'}}>
                                                            <Moment style={{
                                                                fontFamily: 'panton  ,sans-serif', color: 'white',
                                                                fontSize: '14px ', textTransform: 'capitalize'
                                                            }} format="DD-MM-YYYY">
                                                                {game.Date}
                                                            </Moment>
                                                        </td>
                                                        <td className="text-center" style={{
                                                            width: '70px',
                                                            fontFamily: 'panton  ,sans-serif',
                                                            color: 'white',
                                                            fontSize: '14px ',
                                                            textTransform: 'capitalize'
                                                        }}>
                                                            {unit_format ?
                                                                <Label style={{fontFamily: 'panton  ,sans-serif',
                                                                    color: 'white',
                                                                    fontSize: '14px ',
                                                                    textTransform: 'capitalize'
                                                                }}>{game.vitesse}</Label>
                                                                :
                                                                <Label style={{fontFamily: 'panton  ,sans-serif',
                                                                    color: 'white',
                                                                    fontSize: '14px ',
                                                                    textTransform: 'capitalize'
                                                                }}>{game.vitesse*1000}</Label>

                                                            }

                                                            <Label style={{
                                                                fontFamily: 'panton  ,sans-serif',
                                                                color: 'white',
                                                                fontSize: '10px ',
                                                                textAlign: 'center',
                                                                textTransform: 'capitalize'
                                                            }}>
                                                                {unit_format ? 'Km' : 'm'}
                                                            </Label>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </Table>
                                        : null
                            }
                        </Col>

                        <Col>
                            <BestVitesseByIdUser/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>


        );
    }
}


HistoriqueVitesse.propTypes = {
    getWeekByUser: PropTypes.func.isRequired,
    weekUsers: PropTypes.object.isRequired,
    getMonthVitesseByUser: PropTypes.func.isRequired,
    monthVitesse: PropTypes.object.isRequired,
    getGameInfo: PropTypes.func.isRequired,
    dist_temps: PropTypes.object.isRequired,
    unit_format: PropTypes.bool,

};
const mapStateToProps = (state) => ({
    weekUsers: state.weekUsers,
    dist_temps: state.dist_temps,
    monthVitesse: state.monthVitesse,
    unit_format: state.unit_format,

});
export default connect(
    mapStateToProps,
    {getWeekByUser, getMonthVitesseByUser, getGameInfo})(HistoriqueVitesse);