import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import FoodLogs from "views/Client/FoodLogs/FoodLogs.js";

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
            breakfast: { total_calories: 0, meals: [] },
            lunch: { total_calories: 0, meals: [] },
            snack: { total_calories: 0, meals: [] },
            dinner: { total_calories: 0, meals: [] },
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.today = new Date();

        this.toggleReturn = this.toggleReturn.bind(this);
        this.fetchFoodLogs = this.fetchFoodLogs.bind(this);
    }

    componentDidMount() {
        //this.fetchFoodLogs(this.today.toISOString().split("T")[0]);
        this.fetchFoodLogs("2020-05-05");
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

                console.log(data.message);
                this.setState({
                    breakfast: breakfast,
                    lunch: lunch,
                    snack: snack,
                    dinner: dinner,
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
                    <GridItem xs={12} sm={12} md={3}>
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
                                            return <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-40px" }}>
                                                <Card style={{ backgroundColor: "#eee" }}>
                                                    <CardHeader style={{ backgroundColor: "#00acc1", color: "white" }}>
                                                        <strong>{meal.meal_name}</strong>
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
                    <GridItem xs={12} sm={12} md={3}>
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
                                            return <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-40px" }}>
                                                <Card style={{ backgroundColor: "#eee" }}>
                                                    <CardHeader style={{ backgroundColor: "#00acc1", color: "white" }}>
                                                        <strong>{meal.meal_name}</strong>
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
                    <GridItem xs={12} sm={12} md={3}>
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
                                            return <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-40px" }}>
                                                <Card style={{ backgroundColor: "#eee" }}>
                                                    <CardHeader style={{ backgroundColor: "#00acc1", color: "white" }}>
                                                        <strong>{meal.meal_name}</strong>
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
                    <GridItem xs={12} sm={12} md={3}>
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
                                            return <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-40px" }}>
                                                <Card style={{ backgroundColor: "#eee" }}>
                                                    <CardHeader style={{ backgroundColor: "#00acc1", color: "white" }}>
                                                        <strong>{meal.meal_name}</strong>
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
            </div>
        )
    }
}

export default List;