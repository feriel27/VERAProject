import React from 'react';

import {

    Card, CardBody, Label,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import classnames from 'classnames';
import BestScoreDistance from "./Distance/BestScoreDistance";
import BestScoreVitesse from "./Speed/BestScoreVitesse";


export default class Resultat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
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


    componentDidMount = event => {

    }


    render() {
        return (


            <>
                <div className="content">
                    <Card className="card-chart">
                        <Row lg="12">
                            <CardBody>

                                <div  id={"nav"} className="d-flex flex-row justify-content-center">

                                    <NavLink
                                        className={classnames({active: this.state.activeTab === '1'})}
                                        style={{

                                        }}
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
                                                    fontFamily:'panton ,sans-serif',
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
                                        style={{
                                            marginLeft:'45px',marginRight:'45px'
                                        }}
                                        onClick={() => {
                                            this.toggle('2');
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
                                                    fontFamily:'panton ,sans-serif',
                                                }}>
                                                Speed
                                                {
                                                    this.state.activeTab === '2'? <hr color="#53F3CE" style={{height:'1px',marginTop:'2px'}}/>:<hr/>
                                                }
                                            </Label>
                                        </div>
                                    </NavLink>
                                    {/*<NavLink*/}
                                    {/*    className={classnames({active: this.state.activeTab === '3'})}*/}
                                    {/*    onClick={() => {*/}
                                    {/*        this.toggle('3');*/}
                                    {/*    }}*/}
                                    {/*    style={{*/}
                                    {/*    }}*/}
                                    {/*>*/}

                                    {/*    <div className="d-flex flex-row">*/}
                                    {/*        <img alt={"logo-cal"} src={require('../../assets/img/speed.png')}*/}
                                    {/*             style={{*/}
                                    {/*                 height: '20px',*/}
                                    {/*                 width: '20px'*/}
                                    {/*             }}/>*/}
                                    {/*        <Label*/}
                                    {/*            style={{*/}
                                    {/*                fontSize: '15px ',*/}
                                    {/*                fontWeight: 'normal',*/}
                                    {/*                color: 'white',*/}
                                    {/*                marginLeft: '7px',*/}
                                    {/*                fontFamily:'panton ,sans-serif',*/}
                                    {/*            }}>*/}
                                    {/*            Experience*/}
                                    {/*        </Label>*/}
                                    {/*    </div>*/}
                                    {/*</NavLink>*/}
                                </div>
                                <TabContent activeTab={this.state.activeTab} id={"table"}
                                            className="content-center" >
                                    <TabPane tabId="1" style={{marginTop:'-10px'}}>

                                        <BestScoreDistance/>

                                    </TabPane>
                                    <TabPane tabId="2" style={{marginTop:'-10px'}}>

                                        <BestScoreVitesse/>

                                    </TabPane>
                                    {/*<TabPane tabId="3" style={{marginTop:'-10px'}}>*/}

                                    {/*    <h4>Experience</h4>*/}

                                    {/*</TabPane>*/}

                                </TabContent>
                            </CardBody>

                        </Row>
                    </Card>


                </div>
            </>

        )
    }
}