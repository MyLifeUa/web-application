import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import utils from "variables/utils.js";

class Dashboard extends React.Component {

    constructor() {
        super();
        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.today = new Date();
    }

    render() {
        return (
            <div id="client-dashboard">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={1}>
                        <img style={{ height: "40px", borderRadius: "50%" }} src={"data:image;base64," + this.authUser.message.photo} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={11} style={{ marginTop: "-20px", marginLeft: "-30px" }}>
                        <h3> Welcome, <a>{this.authUser.message.name}!</a></h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-20px"}}>
                        <h4><i className="fas fa-calendar-alt" style={{color: "#00acc1"}}></i> {utils.weekday[this.today.getDay()]}, {this.today.getUTCDate()}th of {utils.monthNames[this.today.getMonth()] + " " + this.today.getFullYear()}</h4>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }

}

export default Dashboard;