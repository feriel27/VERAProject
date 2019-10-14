import React, {Component} from "react";
import {connect} from "react-redux";
import {
    getWeekByUser,
    getMonthHeartByUser,
    getGameInfo,
} from "../../store/actions/profileActions";
import PropTypes from "prop-types";
import classNames from "classnames";

import {Card, CardBody, CardHeader, Col, Button, Row, ButtonGroup,  Table} from "reactstrap";
import Moment from "react-moment";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class HistoriqueHeartBeat extends Component {

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
        this.props.getMonthHeartByUser();
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
        let listHeart = [];
        for (let j = 0; j < weekUsers.ListDate.length; j++) {
            listHeart.push({
                    date: weekUsers.ListDate[j],
                    heartBeat: weekUsers.listTotalHeart[j]
                }
            );
        }

        if (weekUsers.listTotalHeart === undefined) {
            return (
                <h4>undefined</h4>
            );
        }
        if (weekUsers.listTotalHeart.length === 0) {
            return (
                <h4>0</h4>
            );
        }

        const {monthHeart} = this.props.monthHeart;

        if (monthHeart.ListDate === undefined) {
            return (
                <h4>undefined</h4>
            );
        }
        console.log("monthHeart", monthHeart);

        let listMONTH = [];
        for (let j = 0; j < monthHeart.ListDate.length; j++) {
            listMONTH.push({
                    date: monthHeart.ListDate[j],
                    heartBeat: monthHeart.listTotalWeek1[j]
                }
            );
        }
        console.log("listMONTH",listMONTH);

        const optionsData1 = {
            page: 1,  // which page you want to show as default
            // sizePerPageList: [ {
            //     text: '5', value: 5
            // }, {
            //     text: '10', value: 10
            // }, {
            //     text: 'All', value: dist_temps.liste_dist.length
            // } ], // you can change the dropdown list for size per page
            hideSizePerPage: true,
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 0, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            // paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            //  paginationPosition: 'buttom'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };

        return (

            <Card className="card-chart">
                <CardHeader className="text-left">
                    <Row>
                        <Col sm="6">
                            {/*<h5 className="card-category">Total Shipments</h5>*/}
                            {/*<CardTitle tag="h6">Performance</CardTitle>*/}
                        </Col>
                        <Col sm="6" style={{marginLeft: '145px'}}>
                            <ButtonGroup
                                className="btn-group-toggle float-right"
                                data-toggle="buttons"
                            >
                                <Button
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: this.state.bigChartData === "data2"
                                    })}
                                    color="info"
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
                                    color="info"
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
                                    color="info"
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
                <Row>
                    <CardBody style={{display: 'flex', justifyContent: 'flex-around'}}>
                        <div className="chart-area" style={{marginLeft: '20px', width: '600px'}}>
                            {this.state.bigChartData === 'data2' ?
                                <Table striped>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            heartBeat
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {listHeart.map(function (game, idx) {
                                        return (
                                            <tr key={idx}>
                                                <td>
                                                    <Moment format="YYYY/MM/DD">
                                                        {game.date}
                                                    </Moment>
                                                </td>
                                                <td>
                                                    {game.heartBeat}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                                : (this.state.bigChartData === 'data3') ?
                                    <Table striped>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>
                                                Date
                                            </th>
                                            <th>
                                                heartBeat
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {listMONTH.map(function (game, idx) {
                                            return (
                                                <tr key={idx}>
                                                    <td>
                                                        {game.date}
                                                    </td>
                                                    <td>
                                                        {game.heartBeat}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                    : (this.state.bigChartData === 'data1') ?
                                        <BootstrapTable data={dist_temps.liste_dist} pagination={true}
                                                        options={optionsData1} stripped table
                                                        style={{height: '100px'}}
                                        >
                                            <TableHeaderColumn dataField='Date' isKey>Date</TableHeaderColumn>
                                            <TableHeaderColumn dataField='heartBeat'>Heart</TableHeaderColumn>
                                        </BootstrapTable>
                                        : null
                            }
                        </div>
                    </CardBody>
                    <CardBody>

                    </CardBody>
                </Row>
            </Card>


        );
    }
}


HistoriqueHeartBeat.propTypes = {
    getWeekByUser: PropTypes.func.isRequired,
    weekUsers: PropTypes.object.isRequired,
    getMonthHeartByUser: PropTypes.func.isRequired,
    monthHeart: PropTypes.object.isRequired,
    getGameInfo: PropTypes.func.isRequired,
    dist_temps: PropTypes.object.isRequired

};
const mapStateToProps = (state) => ({
    weekUsers: state.weekUsers,
    dist_temps: state.dist_temps,
    monthHeart: state.monthHeart
});
export default connect(
    mapStateToProps,
    {getWeekByUser, getMonthHeartByUser, getGameInfo})(HistoriqueHeartBeat);