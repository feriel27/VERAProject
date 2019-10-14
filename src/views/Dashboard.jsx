import React from "react";
import LevelInfo from "../components/Level/LevelInfo";
import {connect} from "react-redux";
import '../App.css';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "data1"
        };
    }


    render() {
        return (

            <div className="content">
                <LevelInfo/>
            </div>

        );
    }
}

Dashboard.propTypes = {};
const mapStateToProps = state => ({});
export default connect(
    mapStateToProps,
    {}
)(Dashboard);
