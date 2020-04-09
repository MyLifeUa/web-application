import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "components/CustomButtons/Button.js";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import baseUri from "variables/baseURI.js";
import config from "variables/config.js";

class Doctor extends React.Component {

    constructor() {
        super();
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            doctor: {
                name: null,
                email: null,
                photo: config.defaultUser,
                hospital: null
            },
            deleteDialog: false,
            successDialog: false
        }
        this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
        this.toggleSuccessDialog = this.toggleSuccessDialog.bind(this);
        this.removeDoctor = this.removeDoctor.bind(this);
    }

    componentDidMount() {

        fetch(baseUri.restApi.patientAssociation, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + this.state.authUser.token
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                return response.json();
            })
            .then(data => {
                console.log(data);
                var authUser = this.state.authUser;
                authUser.token = data.token
                localStorage.setItem('authUser', JSON.stringify(authUser));
                console.log(data);
                this.setState({
                    authUser: this.state.authUser,
                    doctor: {
                        name: data.message.name,
                        email: data.message.email,
                        photo: data.message.photo,
                        hospital: data.message.hospital
                    },
                    deleteDialog: false,
                    successDialog: false
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }


    removeDoctor() {
        console.log("Doctor removed!");

        this.setState({
            authUser: this.state.authUser,
            doctor: this.state.doctor,
            deleteDialog: false,
            successDialog: true
        })
    }

    toggleDeleteDialog() {
        this.setState({
            authUser: this.state.authUser,
            doctor: this.state.doctor,
            deleteDialog: !this.state.deleteDialog,
            successDialog: this.state.successDialog
        })
    }

    toggleSuccessDialog() {
        this.setState({
            authUser: this.state.authUser,
            doctor: this.state.doctor,
            deleteDialog: this.state.deleteDialog,
            successDialog: !this.state.successDialog
        })
    }

    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><i className="fas fa-user-md" style={{ color: "#00acc1", marginRight: "10px" }}></i> Doctor details</h3>
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
                                    <GridItem xs={12} sm={12} md={12}><Button color="danger" round onClick={this.toggleDeleteDialog}><DeleteIcon /> Remove doctor</Button></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                <Dialog
                    open={this.state.deleteDialog}
                    onClose={this.toggleDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ color: "#f44336" }}>
                        <i class="fas fa-exclamation-circle"></i> Are you sure you want to remove <strong style={{ color: "#00acc1" }}>Dr. {this.state.doctor.name}?</strong>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">This action will be <strong>permanent.</strong>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button block onClick={() => this.toggleDeleteDialog()} color="info">Cancel</Button>
                        <Button block onClick={() => this.removeDoctor()} color="danger">Remove</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.successDialog}
                    onClose={this.toggleSuccessDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ color: "#4caf50" }}>
                        <i class="fas fa-check-circle"></i> User deleted with success!
					</DialogTitle>
                    <DialogActions>
                        <Button block onClick={() => this.toggleSuccessDialog()} color="success">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default Doctor;