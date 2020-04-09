import React from "react";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Button from "components/CustomButtons/Button.js";
import IconButton from '@material-ui/core/IconButton';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EyeIcon from '@material-ui/icons/Visibility';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import baseURI from "variables/baseURI.js";

import AddPatient from "views/Doctor/Patients/AddPatient.js";
import PatientsInfo from "views/Doctor/Patients/PatientsInfo.js";


class Patients extends React.Component {

    constructor() {
        super();
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            patients: [],
            deleteDialog: false,
            currentPatient: null,
            successDialog: false,
            details: false,
            addPatient: false
        }
        this.deletePatient = this.deletePatient.bind(this);
        this.deleteDialog = this.deleteDialog.bind(this);
        this.toggleSuccessDialog = this.toggleSuccessDialog.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.addPatient = this.addPatient.bind(this);
    }

    patientsInfo = []

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

    deletePatient() {

        fetch(baseURI.restApi.patientAssociation, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + this.state.authUser.token
            },
            body: JSON.stringify({ client: this.state.currentPatient })
        })
            .then(response => {
                if (response.status === 204) {
                    var patients = [];
                    for (var i = 0; i < this.state.patients.length; i++) {
                        if (this.state.patients[i][2] !== this.state.currentPatient)
                            patients.push(this.state.patients[i]);
                    }

                    this.setState({
                        authUser: this.state.authUser,
                        patients: patients,
                        deleteDialog: false,
                        currentPatient: null,
                        successDialog: true,
                        details: this.state.details,
                        addPatient: this.state.addPatient
                    })
                    return
                }
                else throw new Error(response.status)
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    toggleSuccessDialog() {
        this.setState({
            authUser: this.state.authUser,
            patients: this.state.patients,
            deleteDialog: this.state.deleteDialog,
            currentPatient: this.state.currentPatient,
            successDialog: !this.state.successDialog,
            details: this.state.details,
            addPatient: this.state.addPatient
        })
    }

    deleteDialog(patientEmail) {
        this.setState({
            authUser: this.state.authUser,
            patients: this.state.patients,
            deleteDialog: !this.state.deleteDialog,
            currentPatient: patientEmail,
            successDialog: this.state.successDialog,
            details: this.state.details,
            addPatient: this.state.addPatient
        })

    }

    showDetails(patientEmail) {

        var currentPatient;
        for (var i = 0; i < this.patientsInfo.length; i++) {
            if (this.patientsInfo[i].email === patientEmail) {
                currentPatient = this.patientsInfo[i];
                break;
            }
        }

        this.setState({
            authUser: this.state.authUser,
            patients: this.state.patients,
            deleteDialog: this.state.deleteDialog,
            currentPatient: currentPatient,
            successDialog: this.state.successDialog,
            details: true,
            addPatient: this.state.addPatient
        })
    }

    addPatient() {
        this.setState({
            authUser: this.state.authUser,
            patients: this.state.patients,
            deleteDialog: this.state.deleteDialog,
            currentPatient: this.state.currentPatient,
            successDialog: this.state.successDialog,
            details: this.state.details,
            addPatient: true
        })
    }


    componentDidMount() {

        fetch(baseURI.restApi.patients, {
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
                this.patientsInfo = data.message;
                var patients = [];

                data.message.forEach(patient => patients.push(
                    [
                        <img style={this.classes.picture} src={"data:image;base64," + patient.photo} alt={patient.name} />,
                        patient.name,
                        patient.email,
                        patient.phone_number,
                        patient.sex,
                        <IconButton aria-label="delete">
                            <EyeIcon onClick={() => this.showDetails(patient.email)} style={{ color: "#00acc1" }} fontSize="medium" />
                        </IconButton>,
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={() => this.deleteDialog(patient.email)} style={{ color: "#f44336" }} fontSize="medium" />
                        </IconButton>
                    ]
                ))

                this.setState({
                    authUser: this.state.authUser,
                    patients: patients,
                    deleteDialog: this.state.deleteDialog,
                    currentPatient: this.state.currentPatient,
                    successDialog: this.state.successDialog,
                    details: this.state.details,
                    addPatient: this.state.addPatient
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    render() {
        if (this.state.addPatient) return <AddPatient />
        if (this.state.details) return <PatientsInfo currentPatient={this.state.currentPatient} patientsInfo={this.patientsInfo} />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={9}>
                                        <h4 style={this.classes.cardTitleWhite}><i class="fas fa-procedures"></i>  Patients list</h4>
                                        <p style={this.classes.cardCategoryWhite}>Manage all patients from your hospital</p>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}><Button color="success" onClick={this.addPatient} round><AddCircleIcon /> Add new patient</Button></GridItem>

                                </GridContainer>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["", "Name", "Email", "Phone Number", "Sex", "Details", "Delete"]}
                                    tableData={this.state.patients}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>

                <Dialog
                    open={this.state.deleteDialog}
                    onClose={this.deleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ color: "#f44336" }}>
                        <i class="fas fa-exclamation-circle"></i> Are you sure you want to remove <strong style={{ color: "#00acc1" }}>{this.state.currentPatient}?</strong>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">This action will be <strong>permanent.</strong>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button block onClick={() => this.deleteDialog()} color="info">Cancel</Button>
                        <Button block onClick={() => this.deletePatient()} color="danger">Delete</Button>
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
        );
    }

}

export default Patients;