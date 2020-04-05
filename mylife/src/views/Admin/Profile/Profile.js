import React from "react";
// @material-ui/core components

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import baseURI from "variables/baseURI.js";

import config from "variables/config";

export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            confirmDialog: false,
            errorDialog: false,
            changes: [],
            errors: [],
            authUser: JSON.parse(localStorage.getItem('authUser')),
            updated: false
        }
        this.changeProfilePicture = this.changeProfilePicture.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogCancel = this.handleDialogCancel.bind(this);
        this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
        this.toggleErrorDialog = this.toggleErrorDialog.bind(this);
        this.validEmail = this.validEmail.bind(this);
        this.validPhoneNumber = this.validPhoneNumber.bind(this);
        this.isFloat = this.isFloat.bind(this);
        this.toggleSuccessDialog = this.toggleSuccessDialog.bind(this);
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


    validEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validPhoneNumber = (phoneNumber) => {
        return phoneNumber.match(/^[0-9]+$/) && phoneNumber.trim().length === 9;
    }

    isFloat = (number) => {
        return number.match(/^[.0-9]+$/) && parseFloat(number) > 0;
    }

    toggleSuccessDialog() {
        this.setState({
            errorDialog: this.state.errorDialog,
            changes: this.state.changes,
            errors: this.state.errors,
            authUser: this.state.authUser,
            updated: !this.state.updated
        })
    }

    handleDialogOpen() {

        var email = ["Email", document.getElementById("email")];
        var password = ["Password", document.getElementById("password")];
        var confirmPassword = ["Confirm password", document.getElementById("confirm-password")];

        // array with all values
        var values = [email, password, confirmPassword];

        // add all changes
        var changes = []
        for (var i = 0; i < values.length - 1; i++) {
            if (values[i][1].value !== "")
                changes.push(values[i]);
        }


        var errors = [];
        for (i = 0; i < changes.length; i++) {

            switch (changes[i][0]) {

                case "Email":
                    const correctEmail = this.validEmail(changes[i][1].value);
                    if (!correctEmail)
                        errors.push(["Email", "format not valid!"]);

                    break;

                case "Password":
                    if (changes[i][1].value !== confirmPassword[1].value) {
                        errors.push(["Password", "password not confirmed"]);
                        break;
                    }

                    if (changes[i][1].value.length < 8) {
                        errors.push(["Passowrd", "must have at least 8 characters"]);
                    }

					/*
					var hiddenPassword = "";
					for(var j = 0; j < changes[i][1].value.length; j++)
						hiddenPassword += "*";
					
					changes[i][1].value = hiddenPassword;
					*/
                    break;

                default:
                    break;

            }

        }

        this.setState({
            confirmDialog: changes.length !== 0 && errors.length === 0 ? true : false,
            errorDialog: errors.length === 0 ? false : true,
            changes: changes,
            errors: errors,
            authUser: this.state.authUser,
            updated: this.state.updated
        })
    }

    handleDialogConfirm() {
        console.log(this.state.changes);

        var toUpdate = { email: this.state.authUser.userInfo.email };

        for (var i = 0; i < this.state.changes.length; i++) {
            switch (this.state.changes[i][0]) {

                case "Email":
                    toUpdate.email = this.state.changes[i][1].value;
                    break;

                case "Password":
                    toUpdate.password = this.state.changes[i][1].value;
                    break;

                default:
                    break;

            }
        }

        fetch(baseURI.restApi.admins + "/" + this.state.authUser.userInfo.email, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + this.state.authUser.token
            },
            body: JSON.stringify(toUpdate)
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                console.log(data);
                this.state.authUser.token = data.token;
                this.state.authUser.userInfo.email = toUpdate.email;
                localStorage.setItem('authUser', JSON.stringify(this.state.authUser));

                this.setState({
                    confirmDialog: this.state.confirmDialog,
                    errorDialog: this.state.errorDialog,
                    changes: this.state.changes,
                    errors: this.state.errors,
                    authUser: JSON.parse(localStorage.getItem('authUser')),
                    updated: true
                })

                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                document.getElementById("confirm-password").value = "";
                
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

        this.setState({
            confirmDialog: false,
            errorDialog: this.state.errorDialog,
            changes: this.state.changes,
            errors: this.state.errors,
            authUser: this.state.authUser,
            updated: this.state.updated
        })
    }

    handleDialogCancel() {
        this.setState({
            confirmDialog: false,
            errorDialog: this.state.errorDialog,
            changes: this.state.changes,
            errors: this.state.errors,
            authUser: this.state.authUser,
            updated: this.state.updated
        })
    }

    toggleErrorDialog() {
        this.setState({
            errorDialog: !this.state.errorDialog,
            changes: this.state.changes,
            errors: this.state.errors,
            authUser: this.state.authUser,
            updated: this.state.updated
        })
    }


    changeProfilePicture() {
    }

    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <h4 style={this.classes.cardTitleWhite}><i className="fas fa-user"></i>  Edit Profile</h4>
                                <p style={this.classes.cardCategoryWhite}>Complete your profile</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Email"
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Password"
                                            id="password"
                                            password={true}
                                            formControlProps={{
                                                fullWidth: true
                                            }}

                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Confirm password"
                                            id="confirm-password"
                                            password={true}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button block color="info" onClick={this.handleDialogOpen}>Update Profile</Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card profile>
                            <CardAvatar profile>
                                <a href="#pablo" onClick={this.changeProfilePicture}>
                                    <img className="profile-picture" src={"data:image;base64," + config.defaultUser} alt="Edit profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}><h3>{this.state.authUser.role === "doctor" ? "Dr." : ""} {this.state.authUser.userInfo.first_name + " " + this.state.authUser.userInfo.last_name}</h3></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><a href={"mailto:" + this.state.authUser.userInfo.email}><strong>{this.state.authUser.userInfo.email}</strong></a></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                <Dialog
                    open={this.state.confirmDialog}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ color: "#00acc1" }}>
                        <i class="fas fa-exclamation-circle"></i> Are you sure you want to update user profile?
					</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">The following fields will be updated:<br />
                            <ol>
                                {this.state.changes.map((change) => {
                                    return <li><strong>{change[0]}: </strong> {change[1].value}</li>;
                                })}
                            </ol>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button block onClick={() => this.handleDialogCancel()} color="info">Cancel</Button>
                        <Button block onClick={() => this.handleDialogConfirm()} color="success" autoFocus>Confirm</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.errorDialog}
                    onClose={this.toggleErrorDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ color: "#f44336" }}>
                        <i class="fas fa-exclamation-circle"></i> Profile not updated due to invalid fields
					</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">The following fields will be updated:<br />
                            <ol>
                                {this.state.errors.map((error) => {
                                    return <li><strong>{error[0]}: </strong> {error[1]}</li>;
                                })}
                            </ol>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button block onClick={() => this.toggleErrorDialog()} color="danger">Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.updated}
                    onClose={this.toggleSuccessDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ color: "#4caf50" }}>
                        <i class="fas fa-check-circle"></i> Profile updated with success!
					</DialogTitle>
                    <DialogActions>
                        <Button block onClick={() => this.toggleSuccessDialog()} color="success">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}
