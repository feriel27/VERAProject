import React, {Component} from "react";
import {
    CardBody, CardTitle,
     Row, CardHeader, Col, Label
} from "reactstrap";
import {connect} from "react-redux";
import {
    getBestScoreDistance
} from "../../../store/actions/profileActions";
import PropTypes from "prop-types";
import {MDBProgress} from 'mdbreact';
import '../../../App.css';

import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

class BestScoreDistance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topfive: true,
        };
    }

    componentDidMount() {
        this.props.getBestScoreDistance();
    }

    render() {
        console.log("best score distannnnnnnnnnnnnnnnnnnnnnce");
        const {user} = this.props.auth;
        console.log(user.userId);
        const {unit_format} = this.props.unit_format;

        const {best_score_distance} = this.props.best_score_distance;
        console.log(best_score_distance);

        if (best_score_distance === undefined) {
            return (
                <div>

                </div>
            )
        }
        if (best_score_distance.length === 0) {
            return (
                <div>
                    {/*<Spinner color="success"/>*/}
                    <div></div>

                </div>

            )
        }

        let firstOne = [];

        for (var commonBrand in best_score_distance) {
            console.log(commonBrand)
            firstOne.push(best_score_distance[commonBrand][0])
        }


        for (let i = 0; i < firstOne.length; i++) {
            if (firstOne[i].user._id === user.userId) {
                console.log("id user", firstOne[i].user._id);
                console.log("same user", i);
                if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4) {
                    console.log("true");
                    this.state.topfive = true;
                } else {
                    console.log("false");
                    this.state.topfive = false;
                }

            }
        }
        console.log("firstOne", firstOne);
        // console.log("secondOne",secondOne);
        const circleStyleTwo = {
            padding: 10,
            margin: 20,
            marginTop:'26px',
            display: "inline-block",
            backgroundColor: '#272942',
            width: 130,
            height: 170,
            border:'none',
        };
        const circleStyleMiddle = {
            padding: 10,
            margin: 20,
            display: "inline-block",
            backgroundColor: '#272942',
            width: 130,
            height: 190,
            marginTop: '5%',
            border:'none',
        };
        const circleStyleThree = {
            padding: 10,
            margin: 20,
            marginTop:'36px',
            display: "inline-block",
            backgroundColor: '#272942',
            width: 130,
            height: 160,
            border:'none',
        };

        return (

            <>
                <div className="d-flex flex-column justify-content-start">
                    <Row className="d-flex flex-row justify-content-sm-center"
                         style={{marginTop: '10px',marginLeft:'-40px'}}>
                        <Col sm="2">
                            <div className="card-user d-flex flex-column justify-content-center" style={circleStyleTwo}>
                                <img style={{marginBottom: '0px', marginLeft: '0px',width:'110px',height:'100px'}}
                                     alt="..."
                                     className="avatar"
                                     src={firstOne[1].user.imageProfile}
                                />
                                <h6 className="text-lowercase text-center "
                                    style={{
                                        marginBottom: '0px',
                                        fontFamily: 'panton ,sans-serif',
                                        fontSize: '14px ',
                                    }}>{firstOne[1].user.name}</h6>
                                <h6 className="text-lowercase text-center "
                                    style={{
                                        fontFamily: 'panton, sans-serif',
                                        fontSize: '14px ',
                                        marginBottom: '0px',
                                    }}>{firstOne[1].distance}</h6>
                                <h4 style={{
                                    fontSize: '14px ',
                                    fontFamily: 'panton ,sans-serif',marginBottom: '-15px',
                                    paddingBottom: '0px'
                                }}
                                    className="title text-center ">
                                    2
                                </h4>
                            </div>
                        </Col>
                        <Col sm="2" style={{marginRight:'-10px', marginLeft: '-10px'}}>
                            <div className="card-user d-flex flex-column justify-content-center"
                                 style={circleStyleMiddle}>
                                <img style={{marginBottom: '5px', marginLeft: '0px',width:'110px',height:'100px'}}
                                     alt="..."
                                     className="avatar"
                                     src={firstOne[0].user.imageProfile}
                                />
                                <h6 className="text-lowercase text-center "
                                    style={{
                                        fontFamily: 'panton , sans-serif',
                                        fontSize: '14px ',marginBottom: '0px'
                                    }}>{firstOne[0].user.name}</h6>
                                <h6 className="text-lowercase text-center "
                                    style={{
                                        fontFamily: 'panton , sans-serif',
                                        fontSize: '14px ',marginBottom: '0px',
                                    }}>{firstOne[0].distance}</h6>
                                <h4 style={{
                                    fontFamily: 'panton ,sans-serif',marginBottom: '-25px',
                                    fontSize: '14px '
                                }} className="title text-center ">
                                    1
                                </h4>
                            </div>
                        </Col>
                        <Col sm="2">
                            <div className="card-user d-flex flex-column justify-content-center"
                                 style={circleStyleThree}>
                                <img style={{marginBottom: '0px', marginLeft: '0px',width:'110px',height:'100px'}}
                                     alt="..."
                                     className="avatar"
                                     src={firstOne[2].user.imageProfile}
                                />
                                <h6 className="text-lowercase text-center "
                                    style={{
                                        marginBottom: '0px',
                                        fontFamily: 'panton , sans-serif',
                                        fontSize: '14px ',
                                    }}>{firstOne[2].user.name}</h6>
                                <h6 className="text-lowercase text-center "
                                    style={{
                                        fontFamily: 'panton ,sans-serif',
                                        fontSize: '14px ',
                                        marginBottom: '0px',
                                    }}>{firstOne[2].distance}</h6>
                                <h4 style={{
                                    fontFamily: 'panton , sans-serif',marginBottom: '-10px',
                                    fontSize: '14px '
                                }} className="title text-center ">
                                    3
                                </h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="d-flex flex-row justify-content-center" style={{marginLeft:'10px',marginTop: '-10px'}}>
                        <Col md="10">
                            <CardHeader>
                                <CardTitle tag="h4" style={{
                                    fontFamily: 'panton ,sans-serif',
                                    fontSize: '15px '
                                }}>Table Distance Rank</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table striped={"true"} style={{paddingLeft: '0px'}}>
                                    <Thead className="">
                                        <Tr style={{
                                            fontFamily: 'panton  ,sans-serif',
                                            fontSize: '11px ', color: 'white'
                                        }}>
                                            <Th style={{width: '20%'}} className="text-center">Player</Th>
                                            <Th style={{width: '40%'}} className="text-center">Rank</Th>
                                            <Th style={{width: '20%'}} className="text-center">Distance</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {firstOne.map((ranking, idx) => {
                                            {
                                                if (idx === 3) return (
                                                    <Tr key={idx} className="text-center">
                                                        <Td>
                                                            <img
                                                                style={{width: '50px', height: '50px'}}
                                                                alt="..."
                                                                className="avatar"
                                                                src={ranking.user.imageProfile}
                                                            />
                                                        </Td>
                                                        <Td>
                                                            <Row style={{marginLeft: '5px'}}>
                                                                <h6 style={{
                                                                    fontFamily: 'panton  ,sans-serif',
                                                                    fontSize: '11px '
                                                                }}>4.</h6>
                                                                <h6 style={{
                                                                    fontFamily: 'panton  ,sans-serif',
                                                                    fontSize: '11px '
                                                                }}>
                                                                    {ranking.user.name}</h6>
                                                            </Row>
                                                            <MDBProgress material  animated  value={40} height="10px"
                                                                         style={{Color: '#53F3CE'}}>
                                                                40%
                                                            </MDBProgress>

                                                        </Td>
                                                        <Td>
                                                            {unit_format ? <Label style={{
                                                                fontFamily: 'panton  ,sans-serif', color: 'white',
                                                                fontSize: '18px '
                                                            }}>
                                                                {ranking.distance}
                                                            </Label>
                                                                :
                                                                <Label style={{
                                                                    fontFamily: 'panton  ,sans-serif', color: 'white',
                                                                    fontSize: '18px '
                                                                }}>
                                                                    {ranking.distance*1000}
                                                                </Label>
                                                            }

                                                            <Label style={{
                                                                fontFamily: 'panton ,sans-serif',   color: 'white',
                                                                fontSize: '10px '
                                                            }}>{unit_format ? 'Km' : 'm'}</Label>
                                                        </Td>
                                                    </Tr>
                                                );
                                                if (idx === 4) return (
                                                        <Tr key={idx} className="text-center">
                                                            <Td>
                                                                <img
                                                                    style={{width: '50px', height: '50px'}}
                                                                    alt="..."
                                                                    className="avatar"
                                                                    src={ranking.user.imageProfile}
                                                                />
                                                            </Td>
                                                        <Td>
                                                            <Row style={{marginLeft: '5px'}}>
                                                                <h6 style={{
                                                                    fontFamily: 'panton  ,sans-serif',
                                                                    fontSize: '11px '
                                                                }}>5.</h6>
                                                                <h6 style={{
                                                                    fontFamily: 'panton  ,sans-serif',
                                                                    fontSize: '11px '
                                                                }}>
                                                                    {ranking.user.name}</h6>
                                                            </Row>
                                                            <MDBProgress material animated value={50} height="10px"
                                                                         style={{Color: '#53F3CE'}}>
                                                                50%
                                                            </MDBProgress>

                                                        </Td>
                                                        <Td>
                                                            {unit_format ? <Label style={{
                                                                    fontFamily: 'panton  ,sans-serif', color: 'white',
                                                                    fontSize: '18px '
                                                                }}>
                                                                    {ranking.distance}
                                                                </Label>
                                                                :
                                                                <Label style={{
                                                                    fontFamily: 'panton  ,sans-serif', color: 'white',
                                                                    fontSize: '18px '
                                                                }}>
                                                                    {ranking.distance*1000}
                                                                </Label>
                                                            }

                                                            <Label style={{
                                                                fontFamily: 'panton ,sans-serif',   color: 'white',
                                                                fontSize: '10px '
                                                            }}>{unit_format ? 'Km' : 'm'}</Label>
                                                        </Td>
                                                    </Tr>
                                                );
                                            }
                                        })}
                                    </Tbody>
                                </Table>
                            </CardBody>
                        </Col>
                    </Row>
                    {this.state.topfive === false &&
                    <Row className="d-flex flex-row justify-content-center" style={{marginLeft:'15px',marginTop: '-20px'}}>
                        <Col md="10">
                            <CardHeader>
                                <CardTitle tag="h4" style={{
                                    fontFamily: 'panton ,sans-serif',
                                    fontSize: '15px '
                                }}>My current Rank</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table striped={"true"} style={{paddingLeft: '0px'}}>
                                    <Thead className="">
                                        <Tr style={{
                                            fontFamily: 'panton, sans-serif',
                                            fontSize: '11px ', color: 'white'
                                        }}>
                                            <Th style={{width: '20%'}} className="text-center">Player</Th>
                                            <Th style={{width: '40%'}} className="text-center">Rank</Th>
                                            <Th style={{width: '20%'}} className="text-center">Distance</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {firstOne.map((ranking, idx) => {
                                            {
                                                if (ranking.user._id === user.userId) {
                                                    return (
                                                        <Tr key={idx} className="text-center">
                                                            <Td>
                                                                <img
                                                                    style={{width: '50px', height: '50px'}}
                                                                    alt="..."
                                                                    className="avatar"
                                                                    src={ranking.user.imageProfile}
                                                                />
                                                            </Td>
                                                            <Td>
                                                                <Row style={{marginLeft: '5px'}}>
                                                                    <h6 style={{
                                                                        fontFamily: 'panton  ,sans-serif',
                                                                        fontSize: '11px '
                                                                    }}>{(idx + 1)}.</h6>
                                                                    <h6 style={{
                                                                        fontFamily: 'panton ,sans-serif',
                                                                        fontSize: '11px '
                                                                    }}>
                                                                        {ranking.user.name}</h6>
                                                                </Row>
                                                                <MDBProgress animated material value={(idx + 1) * 10}
                                                                             height="10px"
                                                                             style={{Color: '#53F3CE'}}>
                                                                    {(idx + 1) * 10}%
                                                                </MDBProgress>

                                                            </Td>
                                                            <Td>
                                                                {unit_format ?  <Label style={{
                                                                    fontFamily: 'panton ,sans-serif', color: 'white',
                                                                    fontSize: '18px '
                                                                }}>
                                                                    {ranking.distance}
                                                                </Label> :
                                                                    <Label style={{
                                                                        fontFamily: 'panton ,sans-serif', color: 'white',
                                                                        fontSize: '18px '
                                                                    }}>
                                                                        {ranking.distance*1000}
                                                                    </Label>
                                                                }

                                                                <Label style={{
                                                                fontFamily: 'panton ,sans-serif',   color: 'white',
                                                                fontSize: '10px '
                                                            }}>{unit_format ? 'Km' : 'm'}</Label>
                                                            </Td>
                                                        </Tr>
                                                    );
                                                }
                                            }
                                        })}
                                    </Tbody>
                                </Table>
                            </CardBody>
                        </Col>
                    </Row>}
                </div>
            </>

        );
    }
}

BestScoreDistance.propTypes = {
    getBestScoreDistance: PropTypes.func.isRequired,
    best_score_distance: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    unit_format: PropTypes.bool,

};
const mapStateToProps = (state) => ({
    best_score_distance: state.best_score_distance,
    auth: state.auth,
    unit_format:state.unit_format
});
export default connect(
    mapStateToProps,
    {getBestScoreDistance})(BestScoreDistance);