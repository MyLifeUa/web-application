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

export default class UserProfile extends React.Component {

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
			backgroundColor: "#4a9fd2"
		}
	};

	componentDidMount() {
		console.log(this.authUser);
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
									<GridItem xs={12} sm={12} md={5}>
										<CustomInput
											labelText="Company (disabled)"
											id="company-disabled"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												disabled: true
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={3}>
										<CustomInput
											labelText="Username"
											id="username"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Email address"
											id="email-address"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
								</GridContainer>
								<GridContainer>
									<GridItem xs={12} sm={12} md={6}>
										<CustomInput
											labelText="First Name"
											id="first-name"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={6}>
										<CustomInput
											labelText="Last Name"
											id="last-name"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
								</GridContainer>
								<GridContainer>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="City"
											id="city"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Country"
											id="country"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={4}>
										<CustomInput
											labelText="Postal Code"
											id="postal-code"
											formControlProps={{
												fullWidth: true
											}}
										/>
									</GridItem>
								</GridContainer>
							</CardBody>
							<CardFooter>
								<Button color="primary">Update Profile</Button>
							</CardFooter>
						</Card>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<Card profile>
							<CardAvatar profile>
								<a href="#pablo" onClick={e => e.preventDefault()}>
									<img src={"data:image;base64,"+this.authUser.message.photo} alt="..." />
								</a>
							</CardAvatar>
							<CardBody profile>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}><h3>{this.authUser.message.name}</h3></GridItem>
									<GridItem xs={12} sm={12} md={12}><a href="/signin">tiagocmendes@ua.pt</a></GridItem>
									<GridItem xs={12} sm={12} md={12}><a href="/signin">Height: {this.authUser.message.height} cm</a></GridItem>
									<GridItem xs={12} sm={12} md={12}><a href="/signin">Weight: {this.authUser.message.current_weight} kg</a></GridItem>
									<GridItem xs={12} sm={12} md={12}><a href="/signin">Phone: {this.authUser.message.phone_number}</a></GridItem>
									<GridItem xs={12} sm={12} md={12}><a href="/signin">Sex: {this.authUser.message.sex === "M" ? "Male" : "Female"}</a></GridItem>
								</GridContainer>
							</CardBody>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		);
	}

}
