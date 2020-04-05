import React from "react";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import baseURI from "variables/baseURI.js";  

class Doctors extends React.Component {

    constructor() {
        super();
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            doctors: []
        }
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
        },
        picture: {
            height: "40px", width: "40px", borderRadius: "50%"
        }
    };

    componentDidMount() {
        
        fetch(baseURI.restApi.hospitalDoctors, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + this.state.authUser.token
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();

            })
            .then(data => {
                var doctors = data.message;

                for(var i = 0; i < doctors.length; i++) {
                    doctors[i] = [
                        <img style={this.classes.picture} src={"data:image;base64," + doctors[i].photo} alt={doctors[i].name}/>,
                        doctors[i].name,
                        doctors[i].email,
                        doctors[i].phone_number,
                        doctors[i].hospital,
                        <i style={{color: "#00acc1", fontSize: "16px"}} class="fas fa-user-edit"></i>,
                        <i style={{color: "#f44336", fontSize: "16px"}} class="fas fa-trash-alt"></i>
                    ]
                }

                this.setState({
                    authUser: this.state.authUser,
                    doctors: doctors
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
            
    }

    
    render() {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader style={this.classes.cardHeader}>
                            <h4 style={this.classes.cardTitleWhite}><i class="fas fa-user-md"></i>  Doctors list</h4>
                            <p style={this.classes.cardCategoryWhite}>Manage all doctors from your hospital</p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="info"
                                tableHead={["", "Name", "Email", "Phone Number", "Hospital", "Edit", "Delete"]}
                                tableData={this.state.doctors}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }

}

export default Doctors;