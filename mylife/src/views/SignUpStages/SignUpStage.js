import React from 'react';

import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function FirstStage() {
    return (
        <div>
            <GridContainer justify="center">
                <GridItem xs={5} sm={5} md={5}><input id="first-name" class="form-input" placeholder="First name *" type="text" /></GridItem>
                <GridItem xs={5} sm={5} md={5}><input id="last-name" class="form-input" placeholder="Last name *" type="text" /></GridItem>
                <GridItem xs={10} sm={10} md={10}><input id="email" class="form-input" placeholder="Email" type="email" /></GridItem>
                <GridItem xs={5} sm={5} md={5}><input id="password" class="form-input" placeholder="Password *" type="password" /></GridItem>
                <GridItem xs={5} sm={5} md={5}><input id="confirm-password" class="form-input" placeholder="Confirm password *" type="password" /></GridItem>
            </GridContainer>
        </div>
    );
}

class SecondStage extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    today = new Date();
    date = this.today.toISOString().split('T')[0];

    onChange = (jsDate, dateString) => {
        document.getElementById("birth-date").value = dateString.split("T")[0]
    }

    handleChange = () => {

    }

    render() {
        return (
            <div>
                <GridContainer justify="center">
                    <GridItem xs={5} sm={5} md={5}><input id="phone-number" class="form-input" placeholder="Phone number *" type="text" /></GridItem>
                    <GridItem xs={5} sm={5} md={5}>
                        <DatePickerInput
                            locale="en-SG"
                            id="birth-date"
                            value={this.date}
                            onChange={this.onChange}
                            className='form-input'
                        />
                    </GridItem>
                    <GridItem xs={5} sm={5} md={5}><input id="height" class="form-input" placeholder="Height (cm) *" type="text" /></GridItem>
                    <GridItem xs={5} sm={5} md={5}>
                        <select id="sex-select" className="sex-select" placeholder="Sex">
                            <option value="M">Sex</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </GridItem>
                    
                    <GridItem xs={5} sm={5} md={5}><input id="current-weight" class="form-input" placeholder="Current weight (kg) *" type="text" /></GridItem>
                    <GridItem xs={5} sm={5} md={5}><input id="goal-weight" class="form-input" placeholder="What is your goal weight? (kg) *" type="text" /></GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default FirstStage;
export { SecondStage };