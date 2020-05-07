import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';
import Table from "components/Table/Table.js";
import ArrowBack from '@material-ui/icons/ArrowBackIos';

import FoodLogs from "views/Client/FoodLogs/FoodLogs.js";

import baseUri from "variables/baseURI.js";

class List extends React.Component {

    constructor() {
        super();

        this.state = {
            return: false
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.today = new Date();

        this.toggleReturn = this.toggleReturn.bind(this);
        this.fetchFoodLogs = this.fetchFoodLogs.bind(this);
    }

    componentDidMount() {
        this.fetchFoodLogs(this.today.toISOString().split("T")[0]);
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
                console.log(data);
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
                </GridContainer>
            </div>
        )
    }
}

export default List;