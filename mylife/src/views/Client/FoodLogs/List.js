import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever.js';
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";


import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { DatePickerInput } from 'rc-datepicker';

import FoodLogs from "views/Client/FoodLogs/FoodLogs.js";

import utils from "variables/utils.js";

import baseUri from "variables/baseURI.js";

class List extends React.Component {

    classes = {
        cardHeader: {
            backgroundColor: "#00acc1",
            color: "white",
            fontSize: "18px",
        }
    }

    constructor() {
        super();

        this.state = {
            return: false,
            today: new Date(),
            breakfast: { total_calories: 0, meals: [] },
            lunch: { total_calories: 0, meals: [] },
            snack: { total_calories: 0, meals: [] },
            dinner: { total_calories: 0, meals: [] },
            successDialog: false
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.date = this.state.today.toISOString().split('T')[0];

        this.dayLabel = this.dayLabel.bind(this);
        this.toggleReturn = this.toggleReturn.bind(this);
        this.fetchFoodLogs = this.fetchFoodLogs.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteMeal = this.deleteMeal.bind(this);
        this.toggleSuccessDialog = this.toggleSuccessDialog.bind(this);
    }

    toggleSuccessDialog() {
        this.setState({
            successDialog: !this.state.successDialog
        })
    }

    componentDidMount() {
        this.fetchFoodLogs(this.state.today.toISOString().split("T")[0]);
    }

    fetchFoodLogs(date) {
        fetch(baseUri.restApi.foodLogs + "/" + date, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + this.authUser.token
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();

            })
            .then(data => {

                let breakfast = data.message.breakfast;
                let lunch = data.message.lunch;
                let snack = data.message.snack;
                let dinner = data.message.dinner;

                this.setState({
                    breakfast: breakfast,
                    lunch: lunch,
                    snack: snack,
                    dinner: dinner,
                    deleted: false
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    toggleReturn() {
        this.setState({
            return: true
        })
    }

    dayLabel() {
        switch (parseInt(String(this.state.today.getUTCDate()).charAt(String(this.state.today.getUTCDate()).length - 1))) {
            case 1:
                return "st"
            case 2:
                return "nd"
            case 3:
                return "rd"
            default:
                return "th"
        }
    }

    onChange = (jsDate, dateString) => {
        document.getElementById("birth-date").value = dateString.split("T")[0];
        this.setState({
            today: new Date(dateString.split("T")[0])
        })
        this.fetchFoodLogs(dateString.split("T")[0]);
    }

    deleteMeal(meal_id) {

        fetch(baseUri.restApi.foodLogs + "/" + meal_id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + this.authUser.token
            }
        })
            .then(response => {
                if (response.status === 204 || response.status === 200) {
                    this.setState({
                        deleted: true,
                        successDialog: true
                    })
                }
                else throw new Error(response.status)
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    componentDidUpdate() {
        if (this.state.deleted) {
            this.fetchFoodLogs(this.state.today.toISOString().split("T")[0]);
        }

    }

    render() {
        if (this.state.return) return <FoodLogs />
        return (
            <div id="food-logs">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}>
                        <h3><IconButton aria-label="back">
                            <ArrowBack onClick={() => this.toggleReturn()} style={{ color: "#00acc1" }} fontSize="medium" />
                        </IconButton>
                        Review food logs</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-5px" }}>
                        <p><i className="fas fa-calendar-alt" style={{ color: "#00acc1" }}></i> {utils.weekday[this.state.today.getDay()]}, {this.state.today.getUTCDate()}{this.dayLabel()} of {utils.monthNames[this.state.today.getMonth()] + " " + this.state.today.getFullYear()}</p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <DatePickerInput
                            locale="en-SG"
                            id="birth-date"
                            value={this.date}
                            onChange={this.onChange}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}></GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <i className="fas fa-sun"></i> <strong>Breakfast</strong>
                            </CardHeader>
                            <CardBody profile>
                                {this.state.breakfast.meals.length === 0 ?
                                    <h4>There are no meals!</h4>
                                    :
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}><h6><strong style={{ color: "#00acc1" }}>Total calories:</strong> {this.state.breakfast.total_calories} cal</h6></GridItem>
                                        <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}><h6><strong style={{ color: "#00acc1" }}>Meals:</strong></h6></GridItem>
                                        {this.state.breakfast.meals.map((meal, key) => {
                                            return <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-40px" }}>
                                                <Card style={{ backgroundColor: "#eee" }}>
                                                    <CardHeader style={{ backgroundColor: "#00acc1", color: "white" }}>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={8} style={{ marginTop: "13px" }}><strong>{meal.meal_name}</strong></GridItem>
                                                            <GridItem xs={12} sm={12} md={4}>
                                                                <IconButton aria-label="back">
                                                                    <DeleteForeverIcon onClick={() => this.deleteMeal(meal.id)} style={{ color: "white" }} fontSize="medium" />
                                                                </IconButton>
                                                            </GridItem>
                                                        </GridContainer>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Category:</strong> {meal.meal_category}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Servings:</strong> {meal.number_of_servings}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Calories:</strong> {String(meal.calories).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Carbs:</strong> {String(meal.carbs).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Fat:</strong> {String(meal.fat).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Proteins:</strong> {String(meal.proteins).substring(0, 6)}
                                                            </GridItem>
                                                        </GridContainer>
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        })}
                                    </GridContainer>
                                }
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <i className="fas fa-utensils"></i> <strong>Lunch</strong>
                            </CardHeader>
                            <CardBody>
                                {this.state.lunch.meals.length === 0 ?
                                    <h4>There are no meals!</h4>
                                    :
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}><h6><span style={{ color: "#00acc1" }}>Total calories:</span> {this.state.lunch.total_calories} cal</h6></GridItem>
                                        <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}><h6><span style={{ color: "#00acc1" }}>Meals:</span></h6></GridItem>
                                        {this.state.lunch.meals.map((meal, key) => {
                                            return <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-40px" }}>
                                                <Card style={{ backgroundColor: "#eee" }}>
                                                    <CardHeader style={{ backgroundColor: "#00acc1", color: "white" }}>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={8} style={{ marginTop: "13px" }}><strong>{meal.meal_name}</strong></GridItem>
                                                            <GridItem xs={12} sm={12} md={4}>
                                                                <IconButton aria-label="back">
                                                                    <DeleteForeverIcon onClick={() => this.deleteMeal(meal.id)} style={{ color: "white" }} fontSize="medium" />
                                                                </IconButton>
                                                            </GridItem>
                                                        </GridContainer>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Category:</strong> {meal.meal_category}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Servings:</strong> {meal.number_of_servings}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Calories:</strong> {String(meal.calories).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Carbs:</strong> {String(meal.carbs).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Fat:</strong> {String(meal.fat).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Proteins:</strong> {String(meal.proteins).substring(0, 6)}
                                                            </GridItem>
                                                        </GridContainer>
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        })}
                                    </GridContainer>
                                }
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <i className="fas fa-cookie-bite"></i> <strong>Snack</strong>
                            </CardHeader>
                            <CardBody>
                                {this.state.snack.meals.length === 0 ?
                                    <h4>There are no meals!</h4>
                                    :
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}><h6><span style={{ color: "#00acc1" }}>Total calories:</span> {this.state.snack.total_calories} cal</h6></GridItem>
                                        <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}><h6><span style={{ color: "#00acc1" }}>Meals:</span></h6></GridItem>
                                        {this.state.snack.meals.map((meal, key) => {
                                            return <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-40px" }}>
                                                <Card style={{ backgroundColor: "#eee" }}>
                                                    <CardHeader style={{ backgroundColor: "#00acc1", color: "white" }}>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={8} style={{ marginTop: "13px" }}><strong>{meal.meal_name}</strong></GridItem>
                                                            <GridItem xs={12} sm={12} md={4}>
                                                                <IconButton aria-label="back">
                                                                    <DeleteForeverIcon onClick={() => this.deleteMeal(meal.id)} style={{ color: "white" }} fontSize="medium" />
                                                                </IconButton>
                                                            </GridItem>
                                                        </GridContainer>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Category:</strong> {meal.meal_category}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Servings:</strong> {meal.number_of_servings}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Calories:</strong> {String(meal.calories).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Carbs:</strong> {String(meal.carbs).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Fat:</strong> {String(meal.fat).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Proteins:</strong> {String(meal.proteins).substring(0, 6)}
                                                            </GridItem>
                                                        </GridContainer>
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        })}
                                    </GridContainer>
                                }
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <i className="fas fa-moon"></i> <strong>Dinner</strong>
                            </CardHeader>
                            <CardBody>
                                {this.state.dinner.meals.length === 0 ?
                                    <h4>There are no meals!</h4>
                                    :
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}><h6><span style={{ color: "#00acc1" }}>Total calories:</span> {this.state.dinner.total_calories} cal</h6></GridItem>
                                        <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}><h6><span style={{ color: "#00acc1" }}>Meals:</span></h6></GridItem>
                                        {this.state.dinner.meals.map((meal, key) => {
                                            return <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-40px" }}>
                                                <Card style={{ backgroundColor: "#eee" }}>
                                                    <CardHeader style={{ backgroundColor: "#00acc1", color: "white" }}>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={8} style={{ marginTop: "13px" }}><strong>{meal.meal_name}</strong></GridItem>
                                                            <GridItem xs={12} sm={12} md={4}>
                                                                <IconButton aria-label="back">
                                                                    <DeleteForeverIcon onClick={() => this.deleteMeal(meal.id)} style={{ color: "white" }} fontSize="medium" />
                                                                </IconButton>
                                                            </GridItem>
                                                        </GridContainer>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Category:</strong> {meal.meal_category}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Servings:</strong> {meal.number_of_servings}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Calories:</strong> {String(meal.calories).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Carbs:</strong> {String(meal.carbs).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Fat:</strong> {String(meal.fat).substring(0, 6)}
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <strong>Proteins:</strong> {String(meal.proteins).substring(0, 6)}
                                                            </GridItem>
                                                        </GridContainer>
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        })}
                                    </GridContainer>
                                }
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                <Dialog
                    open={this.state.successDialog}
                    onClose={this.toggleSuccessDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ color: "#4caf50" }}>
                        <i class="fas fa-check-circle"></i> Meal removed with success!
					</DialogTitle>
                    <DialogActions>
                        <Button block onClick={() => this.toggleSuccessDialog()} color="success">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default List;