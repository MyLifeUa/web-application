import React from 'react';

import { DatePickerInput } from 'rc-datepicker';

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import Doctors from "views/Admin/Doctors/Doctors.js";

import baseUri from "variables/baseURI.js";

class AddDoctor extends React.Component {


    constructor() {
        super();
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            notFound: true,
            message: "The searched doctor is already registered in the hospital!",
            color: "danger",
            return: false,
        }
        this.today = new Date();
        this.date = this.today.toISOString().split('T')[0];
        this.addDoctor = this.addDoctor.bind(this);
        this.toggleReturn = this.toggleReturn.bind(this);
        this.onChange = this.onChange.bind(this);
    }



    addDoctor() {

        fetch(baseUri.restApi.doctors, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + this.state.authUser.token
            }
        })

    }

    onChange = (jsDate, dateString) => {
        document.getElementById("birth-date").value = dateString.split("T")[0]
        alert(document.getElementById("birth-date").value)
    }

    toggleReturn() {
        this.setState({
            return: true
        })
    }

    render() {
        if (this.state.return) return <Doctors />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><IconButton aria-label="back">
                            <ArrowBack onClick={() => this.toggleReturn()} style={{ color: "#00acc1" }} fontSize="medium" />
                        </IconButton>
                        Add doctor</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}></GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <input id="first-name" class="doctor-form-input" placeholder="First name *" type="text" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <input id="last-name" class="doctor-form-input" placeholder="Last name *" type="text" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}></GridItem>
                    <GridItem xs={12} sm={12} md={2}></GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <input id="email" class="doctor-form-input" placeholder="Email" type="email" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}></GridItem>
                    <GridItem xs={12} sm={12} md={2}></GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <input id="phone-number" class="doctor-form-input" placeholder="Phone number *" type="text" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <DatePickerInput
                            locale="en-SG"
                            id="birth-date"
                            value={this.date}
                            onChange={this.onChange}
                            className='doctor-form-input'
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}></GridItem>
                    <GridItem xs={12} sm={12} md={2}></GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <input id="password" class="doctor-form-input" placeholder="Password *" type="password" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <input id="confirm-password" class="doctor-form-input" placeholder="Confirm password *" type="password" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}></GridItem>
                    <GridItem xs={12} sm={12} md={4}></GridItem>
                    <GridItem xs={12} sm={12} md={4}><Button color="info" onClick={this.addDoctor} size="large" round block><AddCircleIcon /> Add doctor</Button></GridItem>
                    <GridItem xs={12} sm={12} md={4}></GridItem>
                    <GridItem xs={12} sm={12} md={3}></GridItem>
                    {this.state.notFound === true ?
                        <GridItem xs={12} sm={12} md={6} style={{ marginTop: "20px" }}>
                            <SnackbarContent
                                message={this.state.message}
                                color={this.state.color}
                            />
                        </GridItem> :
                        ""}
                    <GridItem xs={12} sm={12} md={6}></GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default AddDoctor;