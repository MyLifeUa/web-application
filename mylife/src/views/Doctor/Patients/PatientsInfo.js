import React from 'react';

import Chart from 'react-apexcharts'

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import IconButton from '@material-ui/core/IconButton';
import Table from "components/Table/Table.js";
import ArrowBack from '@material-ui/icons/ArrowBackIos';


import utils from "variables/utils.js";

import metric3 from "assets/img/client-dashboard/metric-3.png"
import metric4 from "assets/img/client-dashboard/metric-4.png"

import baseUri from "variables/baseURI.js";

import Patients from "views/Doctor/Patients/Patients.js";

class PatientsInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPatient: props.currentPatient,
            return: false,
            nutrientsTotal: [
                [<span><i className="fas fa-circle" style={{ color: "#007280" }}></i> Carbs</span>, 0, 0, 0],
                [<span><i className="fas fa-circle" style={{ color: "#00acc1" }}></i> Fats</span>, 0, 0, 0],
                [<span><i className="fas fa-circle" style={{ color: "#00cde6" }}></i> Proteins</span>, 0, 0, 0],
                [<span><i className="fas fa-circle" style={{ color: "#1ae6ff" }}></i> Calories</span>, 0, 0, 0]
            ],
            pieChart: {
                series: [1, 1, 1, 1],
                options: {
                    chart: {
                        width: 300,
                        type: 'pie',
                    },
                    labels: ['Carbs', 'Fats', 'Proteins', 'Others'],
                    colors: ['#007280', '#00acc1', '#00cde6', '#1ae6ff'],
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
                    }],

                }
            },
        }

        console.log(this.state.currentPatient)
        this.toggleReturn = this.toggleReturn.bind(this);
    }

    toggleReturn() {
        this.setState({
            return: true
        })
    }

    classes = {
        cardCategoryWhite: {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            fontWeight: "500",
            marginTop: "0",
            marginBottom: "0"
        },
        cardTitleWhite: {
            color: "#FFFFFF",
            marginTop: "0px",
            minHeight: "auto",
            fontWeight: "500",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            marginBottom: "3px",
            textDecoration: "none"
        },
        cardHeader: {
            backgroundColor: "#00acc1",
            color: "white",
            fontSize: "18px",
        }
    };

    render() {
        if (this.state.return) return <Patients />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><IconButton aria-label="back">
                            <ArrowBack onClick={() => this.toggleReturn()} style={{ color: "#00acc1" }} fontSize="medium" />
                        </IconButton>
                        Patient details</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card profile style={{ paddingBottom: "105px" }}>
                            <CardAvatar profile>
                                <a href="#pablo" >
                                    <img className="profile-picture" src={"data:image;base64," + this.state.currentPatient.photo} alt="Edit profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}><h3>{this.state.currentPatient.name}</h3></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><a href={"mailto:" + this.state.currentPatient.email}><strong>{this.state.currentPatient.email}</strong></a></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-ruler-vertical"></i> {this.state.currentPatient.height} cm</p></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-weight"></i>  {this.state.currentPatient.current_weight} kg</p></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-phone"></i> {this.state.currentPatient.phone_number}</p></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class={this.state.currentPatient.sex === "M" ? "fas fa-male" : "fas fa-female"}></i> {this.state.currentPatient.sex === "M" ? "Male" : "Female"}</p></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card profile>
                                    <CardAvatar profile style={{ height: "100px", width: "100px" }}>
                                        <a href="#i" onClick={this.changeProfilePicture}>
                                            <img className="profile-picture" src={metric4} alt="Edit profile" />
                                        </a>
                                    </CardAvatar>
                                    <CardBody profile>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}><h4>{this.state.currentPatient.height !== null && this.state.currentPatient.height !== "" ? this.state.currentPatient.height + " m" : "Not found"}</h4></GridItem>
                                            <GridItem xs={12} sm={12} md={6}><h4>{this.state.currentPatient.current_weight !== null && this.state.currentPatient.current_weight !== "" ? this.state.currentPatient.current_weight + " kg" : "Not found"}</h4></GridItem>
                                            <GridItem xs={12} sm={12} md={6} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Height</h6></GridItem>
                                            <GridItem xs={12} sm={12} md={6} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Weight</h6></GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} style={{marginTop: "85px"}}>
                                <Card profile>
                                    <CardAvatar profile style={{ height: "100px", width: "100px" }}>
                                        <a href="#i" onClick={this.changeProfilePicture}>
                                            <img className="profile-picture" src={metric3} alt="Edit profile" />
                                        </a>
                                    </CardAvatar>
                                    <CardBody profile>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}><h4>{this.state.currentPatient.heart_rate !== null && this.state.currentPatient.weight_goal !== "" ? this.state.currentPatient.weight_goal + " kg" : "Not found"}</h4></GridItem>
                                            <GridItem xs={12} sm={12} md={12} style={{  marginTop: "-40px", color: "#00acc1" }}><h6>Weight Goal</h6></GridItem>

                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <i className="fas fa-apple-alt"></i> Nutrients
                            </CardHeader>
                            <CardBody>
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Chart options={this.state.pieChart.options} series={this.state.pieChart.series} type="pie" width={300} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={["Nutrient", "Total", "Goal", "Difference"]}
                                            tableData={this.state.nutrientsTotal}
                                        />
                                    </GridItem>

                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>


                </GridContainer>
            </div >
        )
    }
}

export default PatientsInfo;