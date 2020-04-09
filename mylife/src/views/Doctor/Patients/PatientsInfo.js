import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import IconButton from '@material-ui/core/IconButton';
import Table from "components/Table/Table.js";
import ArrowBack from '@material-ui/icons/ArrowBackIos';


import Patients from "views/Doctor/Patients/Patients.js";

class PatientsInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPatient: props.currentPatient,
            return: false,
            stats: [
                props.currentPatient.weight_goal
            ]
        }
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
			backgroundColor: "#00acc1"
		}
	};

    render() {
        if(this.state.return) return <Patients />
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
                        <Card profile>
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
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <h4 style={this.classes.cardTitleWhite}><i className="fas fa-heartbeat"></i>  Health measures</h4>
                                <p style={this.classes.cardCategoryWhite}>Overview of patient vital signs</p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["", "Measure", "Value"]}
                                    tableData={this.state.stats}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default PatientsInfo;