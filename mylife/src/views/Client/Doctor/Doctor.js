import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "components/CustomButtons/Button.js";

import config from "variables/config.js";

class Doctor extends React.Component {

    constructor() {
        super();
        this.state = {
            doctor: {
                name: "Vasco Ramos",
                email: "vascoalramos@ua.pt",
                photo: config.vascoRamos,
                hospital: "Hospital de Aveiro"
            }
        }

    }

    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                    <h3><i className="fas fa-user-md" style={{ color: "#00acc1", marginRight:"10px"}}></i> Doctor details</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}></GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card profile>
                            <CardAvatar profile>
                                <a href="#pablo" >
                                    <img className="profile-picture" src={"data:image;base64," + this.state.doctor.photo} alt="Edit profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}><h3>Dr. {this.state.doctor.name}</h3></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><a href={"mailto:" + this.state.doctor.email}><strong>{this.state.doctor.email}</strong></a></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-hospital"></i> {this.state.doctor.hospital}</p></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><Button color="danger" round><DeleteIcon /> Remove doctor</Button></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }

}

export default Doctor;