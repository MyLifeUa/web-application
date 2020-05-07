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
            breakfast: { meals: [] },
            lunch: { meals: [] },
            snack: { meals: [] },
            dinner: { meals: [] },
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.today = new Date();

        this.toggleReturn = this.toggleReturn.bind(this);
        this.fetchFoodLogs = this.fetchFoodLogs.bind(this);
    }

    componentDidMount() {
        //this.fetchFoodLogs(this.today.toISOString().split("T")[0]);
        this.fetchFoodLogs("2020-05-06");
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

                console.log(breakfast);
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
                            <CardBody>
                                {this.state.breakfast.meals.length === 0 ?
                                    <h4>There are no meals!</h4> : <h1>Hello</h1>}
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
                                    <h4>There are no meals!</h4> : <h1>Hello</h1>}
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
                                    <h4>There are no meals!</h4> : <h1>Hello</h1>}
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
                                    <h4>There are no meals!</h4> : <h1>Hello</h1>}
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default List;