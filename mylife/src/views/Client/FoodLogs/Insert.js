import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { DatePickerInput } from 'rc-datepicker';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';

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
            mealType: "breakfast",
            servings: 1
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.date = this.state.date.toISOString().split('T')[0];

        this.servings = [
            {
                value: 1,
                label: '1',
            },
            {
                value: 2,
                label: '2',
            },
            {
                value: 3,
                label: '3',
            },
            {
                value: 4,
                label: '4',
            },
            {
                value: 5,
                label: '5',
            },
        ]

        this.toggleReturn = this.toggleReturn.bind(this);
        this.changeTypeMeal = this.changeTypeMeal.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    toggleReturn() {
        this.setState({
            return: true
        })
    }

    changeTypeMeal(event) {
        alert(event.target.value);
    }

    onChange = (jsDate, dateString) => {
        document.getElementById("birth-date").value = dateString.split("T")[0];
        this.setState({
            date: new Date(dateString.split("T")[0])
        })
        alert(document.getElementById("slider").value)
    }

    handleSliderChange = (event, newValue) => {
        alert(newValue);
        this.setState({
            servings: newValue
        })
    };

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
                                        <h4 style={{ color: "#00acc1" }}>DATE: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "18px" }}>
                                        <DatePickerInput
                                            locale="en-SG"
                                            id="birth-date"
                                            value={this.date}
                                            onChange={this.onChange}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={8}></GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <h4 style={{ color: "#00acc1" }}>TYPE OF MEAL: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={5} style={{ marginTop: "18px" }}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" defaultValue={this.state.mealType}>
                                                <FormControlLabel value="breakfast" control={<Radio color="primary" onChange={this.changeTypeMeal} />} label="Breakfast" />
                                                <FormControlLabel value="lunch" control={<Radio color="primary" onChange={this.changeTypeMeal} />} label="Lunch" />
                                                <FormControlLabel value="snack" control={<Radio color="primary" onChange={this.changeTypeMeal} />} label="Snack" />
                                                <FormControlLabel value="dinner" control={<Radio color="primary" onChange={this.changeTypeMeal} />} label="Dinner" />
                                            </RadioGroup>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={5}></GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <h4 style={{ color: "#00acc1" }}>SERVINGS: </h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3} style={{marginTop: "22px"}}>
                                        <Slider
                                            defaultValue={this.state.servings}
                                            onChange={this.handleSliderChange}
                                            getAriaValueText={this.valuetext}
                                            id="slider"
                                            aria-labelledby="discrete-slider-custom"
                                            step={0.5}
                                            min={1}
                                            max={5}
                                            valueLabelDisplay="auto"
                                            marks={this.servings}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={7}></GridItem>
                                    <GridItem xs={12} sm={12} md={1}>
                                        <h4 style={{ color: "#00acc1" }}>MEAL: </h4>
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