import React from 'react';

import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
        this.state = {
            is_diabetic: false,
            has_high_colesterol: false
        }

        localStorage.setItem('healthProblems', JSON.stringify(this.state));
        this.toggleDiabetics = this.toggleDiabetics.bind(this);
        this.toggleHighColesterol = this.toggleHighColesterol.bind(this);
    }


    toggleDiabetics() {
        this.setState({
            is_diabetic: !this.state.is_diabetic,
            has_high_colesterol: this.state.has_high_colesterol
        })
    }

    toggleHighColesterol() {
        this.setState({
            is_diabetic: this.state.is_diabetic,
            has_high_colesterol: !this.state.has_high_colesterol
        })
    }

    componentDidUpdate() {
        localStorage.setItem('healthProblems', JSON.stringify(this.state));
    }


    render() {
        return (
            <div>
                <GridContainer justify="center">
                    <GridItem xs={5} sm={5} md={10}>
                        <h4 style={{ color: "#00acc1"}}>Do you have any of the following health problems?</h4>
                    </GridItem>
                    <GridItem xs={5} sm={5} md={5} style={{marginBottom: "20px"}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="is_diabetic"
                                    checked={this.state.is_diabetic}
                                    onChange={this.toggleDiabetics}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Diabetes"
                        />

                    </GridItem>
                    <GridItem xs={5} sm={5} md={5} style={{marginBottom: "20px"}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="has_high_colesterol"
                                    checked={this.state.has_high_colesterol}
                                    onChange={this.toggleHighColesterol}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="High Colesterol"
                        />
                    </GridItem>
                </GridContainer>
            </div>
        )
    }

}

class ThirdStage extends React.Component {

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
export { SecondStage, ThirdStage };