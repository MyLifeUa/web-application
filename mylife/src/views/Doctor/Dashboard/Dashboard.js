import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import config from "variables/config.js"
import utils from "variables/utils.js";
import doctorRouter from "routers/doctorRouter.js";

class Dashboard extends React.Component {

    constructor() {
        super();
        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        console.log(this.authUser);
        this.today = new Date();

        this.dayLabel = this.dayLabel.bind(this);
    }

    classes = {
        cardHeader: {
            backgroundColor: "#00acc1",
            color: "white",
            fontSize: "18px",
        }
    }

    dayLabel() {
        switch (parseInt(String(this.today.getUTCDate()).charAt(String(this.today.getUTCDate()).length - 1))) {
            case 1:
                return "st"
            case 2:
                return "nd"
            case 3:
                return "rd"
            default:
                return "th"
        }
    }


    render() {
        return (
            <div id="doctor-dashboard">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={1}>
                        <img style={{ height: "40px", borderRadius: "50%" }} src={"data:image;base64," + config.defaultUser} alt={this.authUser.userInfo.name} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8} style={{ marginTop: "-20px", marginLeft: "-30px" }}>
                        <h3> Welcome, <a href="#i" onClick={() => this.setState({ redirectProfile: true })}>{this.authUser.userInfo.first_name + " " + this.authUser.userInfo.last_name}!</a></h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-5px" }}>
                        <p><i className="fas fa-calendar-alt" style={{ color: "#00acc1" }}></i> {utils.weekday[this.today.getDay()]}, {this.today.getUTCDate()}{this.dayLabel()} of {utils.monthNames[this.today.getMonth()] + " " + this.today.getFullYear()}</p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-20px" }}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <i className="fas fa-heartbeat"></i> <strong>Dashboard menu</strong>
                            </CardHeader>
                        </Card>

                    </GridItem>
                </GridContainer>
            </div>
        );
    }

}


export default Dashboard;