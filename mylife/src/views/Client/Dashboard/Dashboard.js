import React from 'react';

import Chart from 'react-apexcharts'

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import utils from "variables/utils.js";

import metric1 from "assets/img/client-dashboard/metric-1.png"
import metric2 from "assets/img/client-dashboard/metric-2.png"
import metric3 from "assets/img/client-dashboard/metric-3.png"
import metric4 from "assets/img/client-dashboard/metric-4.png"



class Dashboard extends React.Component {

    constructor() {
        super();
        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.today = new Date();


        this.state = {
            pieChart: {
                series: [44, 55, 13, 43, 22],
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            }
        };

    }

    classes = {
        cardHeader: {
            backgroundColor: "#00acc1",
            color: "white",
            fontSize: "18px",
        }
    }

    render() {
        return (
            <div id="client-dashboard">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={1}>
                        <img style={{ height: "40px", borderRadius: "50%" }} src={"data:image;base64," + this.authUser.message.photo} alt={this.authUser.message.name} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8} style={{ marginTop: "-20px", marginLeft: "-30px" }}>
                        <h3> Welcome, <a href="/client/profile">{this.authUser.message.name}!</a></h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-5px" }}>
                        <p><i className="fas fa-calendar-alt" style={{ color: "#00acc1" }}></i> {utils.weekday[this.today.getDay()]}, {this.today.getUTCDate()}th of {utils.monthNames[this.today.getMonth()] + " " + this.today.getFullYear()}</p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-20px" }}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <i className="fas fa-heartbeat"></i> Your daily health measures
                            </CardHeader>
                        </Card>

                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "25px" }}>
                        <Card profile>
                            <CardAvatar profile style={{ height: "100px", width: "100px" }}>
                                <a href="#pablo" onClick={this.changeProfilePicture}>
                                    <img className="profile-picture" src={metric1} alt="Edit profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}><h4>{this.authUser.message.heart_rate !== null && this.authUser.message.heart_rate !== "" ? this.authUser.message.heart_rate + " bpm" : "Not found"}</h4></GridItem>
                                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Heart Rate</h6></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "25px" }}>
                        <Card profile>
                            <CardAvatar profile style={{ height: "100px", width: "100px" }}>
                                <a href="#pablo" onClick={this.changeProfilePicture}>
                                    <img className="profile-picture" src={metric2} alt="Edit profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}><h4>{this.authUser.message.steps !== null && this.authUser.message.steps !== "" ? this.authUser.message.steps : 0}</h4></GridItem>
                                    <GridItem xs={12} sm={12} md={6}><h4>{this.authUser.message.distance !== null && this.authUser.message.distance !== "" ? this.authUser.message.distance : 0} km</h4></GridItem>
                                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Steps</h6></GridItem>
                                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Distance</h6></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: "25px" }}>
                        <Chart options={this.state.pieChart.options} series={this.state.pieChart.series} type="pie" width={380} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "25px" }}>
                        <Card profile>
                            <CardAvatar profile style={{ height: "100px", width: "100px" }}>
                                <a href="#pablo" onClick={this.changeProfilePicture}>
                                    <img className="profile-picture" src={metric4} alt="Edit profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}><h4>{this.authUser.message.height !== null && this.authUser.message.height !== "" ? this.authUser.message.height + " m" : "Not found"}</h4></GridItem>
                                    <GridItem xs={12} sm={12} md={6}><h4>{this.authUser.message.current_weight !== null && this.authUser.message.current_weight !== "" ? this.authUser.message.current_weight + " kg" : "Not found"}</h4></GridItem>
                                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Height</h6></GridItem>
                                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Weight</h6></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "25px" }}>
                        <Card profile>
                            <CardAvatar profile style={{ height: "100px", width: "100px" }}>
                                <a href="#pablo" onClick={this.changeProfilePicture}>
                                    <img className="profile-picture" src={metric3} alt="Edit profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}><h4>{this.authUser.message.heart_rate !== null && this.authUser.message.weight_goal !== "" ? this.authUser.message.weight_goal + " kg" : "Not found"}</h4></GridItem>
                                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Weight Goal</h6></GridItem>

                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }

}

export default Dashboard;