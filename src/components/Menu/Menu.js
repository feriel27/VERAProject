import React, {Component} from 'react';
import {
    TabContent, TabPane, Row, Col,  NavLink,  Label, Card, CardBody,
} from "reactstrap";
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChartCalories from "../Charts/Calorie/ChartCalories";
import ChartDistance from "../Charts/Distance/ChartDistance";
import HistoriqueVitesse from "../Historique/HistoriqueVitesse";
import classnames from 'classnames';
import ChartHeart from "../Charts/Heart/ChartHeart";
import '../../App.css';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',

        };

        this.toggle = this.toggle.bind(this);


    }

    componentDidMount() {

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {


        return (
            <>
                <div className="content-center"
                     style={{marginLeft: '40px', marginTop: '-50px', width: '880px'}}>
                    <Card className="card-chart" style={{ marginTop: '50px'}}>
                        <Row lg="12" >
                            <CardBody>
                                <div id={"nav"}
                                     style={{marginTop:'20px'}}
                                     className="d-flex flex-row justify-content-around">
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === '1'})}
                                        onClick={() => {
                                            this.toggle('1');
                                        }}>
                                        <div className="d-flex flex-row">
                                            <img alt={"logo-cal"} src={require('../../assets/img/Distance.png')}
                                                 style={{
                                                     height: '20px',
                                                     width: '20px'
                                                 }}/>
                                            <Label
                                                style={{
                                                    fontSize: '15px ',
                                                    fontWeight: 'normal',
                                                    color: 'white',
                                                    marginLeft: '7px',
                                                    fontFamily: 'panton ,sans-serif',
                                                }}>
                                                Distance
                                                {
                                                    this.state.activeTab === '1'? <hr color="#53F3CE" style={{height:'1px',marginTop:'2px'}}/>:<hr/>
                                                }
                                            </Label>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === '2'})}
                                        onClick={() => {
                                            this.toggle('2');
                                        }}>

                                        <div className="d-flex flex-row">
                                            <img alt={"logo-cal"} src={require('../../assets/img/callorie.png')}
                                                 style={{
                                                     height: '20px',
                                                     width: '20px'
                                                 }}/>
                                            <Label
                                                style={{
                                                    fontSize: '15px ',
                                                    fontWeight: 'normal',
                                                    color: 'white',
                                                    marginLeft: '7px',
                                                    fontFamily: 'panton ,sans-serif',
                                                }}>
                                                Calories
                                                {
                                                    this.state.activeTab === '2'? <hr color="#53F3CE" style={{height:'1px',marginTop:'2px'}}/>:<hr/>
                                                }
                                            </Label>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === '3'})}
                                        onClick={() => {
                                            this.toggle('3');
                                        }}>
                                        <div className="d-flex flex-row">
                                            <img alt={"logo-cal"} src={require('../../assets/img/speed.png')}
                                                 style={{
                                                     height: '20px',
                                                     width: '20px'
                                                 }}/>
                                            <Label
                                                style={{
                                                    fontSize: '15px ',
                                                    fontWeight: 'normal',
                                                    color: 'white',
                                                    marginLeft: '7px',
                                                    fontFamily: 'panton ,sans-serif',
                                                }}>
                                                Speed
                                                {
                                                    this.state.activeTab === '3'?
                                                        <hr color="#53F3CE" style={{height:'1px',marginTop:'2px'}}/>:<hr/>
                                                }
                                            </Label>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === '4'})}
                                        onClick={() => {
                                            this.toggle('4');
                                        }}>
                                        <div className="d-flex flex-row">
                                            <img alt={"logo-cal"} src={require('../../assets/img/heart rate.png')}
                                                 style={{
                                                     height: '20px',
                                                     width: '20px'
                                                 }}/>
                                            <Label
                                                style={{
                                                    fontSize: '15px ',
                                                    fontWeight: 'normal',
                                                    color: 'white',
                                                    marginLeft: '7px',
                                                    fontFamily: 'panton ,sans-serif',
                                                }}>
                                                Heart
                                                {
                                                    this.state.activeTab === '4'?
                                                        <hr color="#53F3CE" style={{height:'1px',marginTop:'2px'}}/>:
                                                        <hr/>
                                                }
                                            </Label>
                                        </div>
                                    </NavLink>
                                </div>
                                <TabContent activeTab={this.state.activeTab} id={"table"}>
                                    <TabPane tabId="1" style={{marginTop:'40px'}}>
                                        <Row  style={{marginTop:'30px'}}>
                                            <Col sm="12" >
                                                <ChartDistance/>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                        <TabPane tabId="2" style={{marginTop:'40px'}} >
                                        <Row  style={{marginTop:'30px'}}>
                                            <Col sm="12" >
                                                <ChartCalories/>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="3" style={{marginTop:'40px'}}>
                                        <Row  style={{marginTop:'30px'}}>
                                            <Col sm="12" >
                                                <HistoriqueVitesse/>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="4" style={{marginTop:'40px'}}>
                                        <Row  style={{marginTop:'30px'}}>
                                            <Col sm="12"  >
                                                <ChartHeart/>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Row>
                    </Card>
                </div>

            </>


        );
    }
}

Menu.propTypes = {};
const mapStateToProps = (state) => ({});
export default connect(
    mapStateToProps,
    {})(Menu);