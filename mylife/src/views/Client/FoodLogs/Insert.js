import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { DatePickerInput } from 'rc-datepicker';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

import FoodLogs from "views/Client/FoodLogs/FoodLogs.js";

class Insert extends React.Component {

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
            date: new Date(),
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.date = this.state.date.toISOString().split('T')[0];

        this.toggleReturn = this.toggleReturn.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    toggleReturn() {
        this.setState({
            return: true
        })
    }

    onChange = (jsDate, dateString) => {
        document.getElementById("birth-date").value = dateString.split("T")[0];
        this.setState({
            date: new Date(dateString.split("T")[0])
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
                        Insert a new food log</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <i className="fas fa-utensils"></i> Please, fill in the following parameters:
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={1}>
                                        <h4>Day: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <DatePickerInput
                                            locale="en-SG"
                                            id="birth-date"
                                            value={this.date}
                                            onChange={this.onChange}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={8}></GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <h4>Type of meal: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <h4>Day: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={7}></GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <h4>Number of serving: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <h4>Day: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}></GridItem>
                                    <GridItem xs={12} sm={12} md={1}>
                                        <h4>Meal: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <h4>Day: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={8}></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default Insert;