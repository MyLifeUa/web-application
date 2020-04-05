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


export default class UserProfile extends React.Component {

	constructor() {
		super();
		this.state = {
			confirmDialog: false,
			errorDialog: false,
			changes: [],
			errors: []
		}
		this.changeProfilePicture = this.changeProfilePicture.bind(this);
		this.handleDialogOpen = this.handleDialogOpen.bind(this);
		this.handleDialogCancel = this.handleDialogCancel.bind(this);
		this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
		this.toggleErrorDialog = this.toggleErrorDialog.bind(this);
		this.validEmail = this.validEmail.bind(this);
		this.validPhoneNumber = this.validPhoneNumber.bind(this);
	}

	authUser = JSON.parse(localStorage.getItem('authUser'));

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

	handleDialogOpen() {

		var email = ["Email", document.getElementById("email")];
		var phoneNumber = ["Phone number", document.getElementById("phone-number")];
		var height = ["Height (cm)", document.getElementById("height")];
		var weight = ["Weight (kg)", document.getElementById("weight")];
		var goalWeight = ["Goal weight", document.getElementById("goal-weight")];
		var password = ["Password", document.getElementById("password")];
		var confirmPassword = ["Confirm password", document.getElementById("confirm-password")];

		// array with all values
		var values = [email, phoneNumber, height, weight, goalWeight, password, confirmPassword];
		
		// add all changes
		var changes = []
		for(var i = 0; i < values.length - 1; i++) {
			if(values[i][1].value !== "")
				changes.push(values[i]);
		}


		var errors = [];
		for(i = 0; i < changes.length; i++) {
			
			switch(changes[i][0]) {

				case "Email":
					const correctEmail = this.validEmail(changes[i][1].value);
					if(!correctEmail)
						errors.push(["Email", "format not valid!"]);
					break;
				
				case "Phone number":
					if(!this.validPhoneNumber(changes[i][1].value))
						errors.push(["Phone number", "should have 9 digits!"]);
					break;
				
				default:
					break;

			}

		}



		this.setState({
			confirmDialog: errors.length === 0 ? true : false,
			errorDialog: errors.length === 0 ? false : true,
			changes: changes,
			errors: errors
		})
	}

	handleDialogConfirm() {
		this.setState({
			confirmDialog: false,
			errorDialog: this.state.errorDialog,
			changes: this.state.changes,
			errors: this.state.errors
		})
	}

	handleDialogCancel() {
		this.setState({
			confirmDialog: false,
			errorDialog: this.state.errorDialog,
			changes: this.state.changes,
			errors: this.state.errors
		})
	}

	toggleErrorDialog() {
		this.setState({
			errorDialog: !this.state.errorDialog,
			changes: this.state.changes,
			errors: this.state.errors
		})
	}

	changeProfilePicture() {
		alert("Hello");
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
									<GridItem xs={12} sm={12} md={6}>
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
											labelText="Phone number"
											id="phone-number"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Height (cm)"
											id="height"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Weight"
											id="weight"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Goal weight"
											id="goal-weight"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={6}>
										<CustomInput
											labelText="Password"
											id="password"
											formControlProps={{
												fullWidth: true
											}}

										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={6}>
										<CustomInput
											labelText="Confirm password"
											id="confirm-password"
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
									<img className="profile-picture" src={"data:image;base64," + this.authUser.message.photo} alt="Edit profile" />
								</a>
							</CardAvatar>
							<CardBody profile>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}><h3>{this.authUser.role === "doctor" ? "Dr." : ""} {this.authUser.message.name}</h3></GridItem>
									<GridItem xs={12} sm={12} md={12}><a href={"mailto:" + this.authUser.message.email}><strong>{this.authUser.message.email}</strong></a></GridItem>
									<GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-ruler-vertical"></i> {this.authUser.message.height} cm</p></GridItem>
									<GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-weight"></i>  {this.authUser.message.current_weight} kg</p></GridItem>
									<GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-phone"></i> {this.authUser.message.phone_number}</p></GridItem>
									<GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class={this.authUser.message.sex === "M" ? "fas fa-male" : "fas fa-female"}></i> {this.authUser.message.sex === "M" ? "Male" : "Female"}</p></GridItem>
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
									return <li><strong style={{color: "#f44336"}}>{error[0]}: </strong> {error[1]}</li>;
								})}
							</ol>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button block onClick={() => this.toggleErrorDialog()} color="info">Cancel</Button>
						<Button block onClick={() => this.toggleErrorDialog()} color="success" autoFocus>Confirm</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}

}
