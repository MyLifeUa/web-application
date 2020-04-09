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
import config from "variables/config.js";

class AddDoctor extends React.Component {


    constructor() {
        super();
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            notFound: false,
            message: "The searched doctor is already registered in the hospital!",
            color: "danger",
            return: false,
        }
        this.doctorInfo = {
            email: null,
            password: null,
            first_name: null,
            last_name: null,
            birth_date: null,
            phone_number: null,
            photo: config.defaultUser
        }
        this.today = new Date();
        this.date = this.today.toISOString().split('T')[0];
        this.addDoctor = this.addDoctor.bind(this);
        this.toggleReturn = this.toggleReturn.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fieldsValidation = this.fieldsValidation.bind(this);
    }

    validEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    fieldsValidation() {
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm-password");
        var phoneNumber = document.getElementById("phone-number");
        var birthDate = document.getElementById("birth-date");

        var properties = [firstName, lastName, email, password, confirmPassword, phoneNumber, birthDate];

        // Check if there are empty fields
        for (var i = 0; i < properties.length; i++)
            if (properties[i].value === "")
                properties[i].className = "doctor-form-input-error";
            else
                properties[i].className = "doctor-form-input";

        var emptyFields = properties.filter(p => p.value === "").length;

        if (emptyFields !== 0) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "*" + emptyFields + (emptyFields === 1 ? " field required" : " fields required"),
                color: "danger",
                return: this.state.return,
            })

            return false;
        }

        // First name verification
        properties[0].className = "doctor-form-input";
        if (!properties[0].value.match(/^[a-zA-Z]+$/)) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "First name can only contain letters",
                color: "danger",
                return: this.state.return,
            })
            properties[0].className = "doctor-form-input-error";
            return false;
        }

        if (properties[0].value.trim().length < 3) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "First name should have at least 3 characters",
                color: "danger",
                return: this.state.return,
            })

            properties[0].className = "doctor-form-input-error";
            return false;
        }

        // Last name verification
        properties[1].className = "doctor-form-input";
        if (!properties[1].value.match(/^[a-zA-Z]+$/)) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "Last name can only contain letters",
                color: "danger",
                return: this.state.return,
            })
            properties[1].className = "doctor-form-input-error";
            return false;
        }

        if (properties[1].value.trim().length < 3) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "Last name should have at least 3 characters",
                color: "danger",
                return: this.state.return,
            })

            properties[1].className = "doctor-form-input-error";
            return false;
        }

        // Check valid email
        properties[2].className = "doctor-form-input";
        if (!this.validEmail(properties[2].value)) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "Email format not valid",
                color: "danger",
                return: this.state.return,
            })
            properties[2].className = "doctor-form-input-error";
            return false;
        }

        // Check phone number
        properties[5].className = "doctor-form-input";
        if (!properties[5].value.match(/^[0-9]+$/) || properties[5].value.trim().length !== 9) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "Invalid phone number",
                color: "danger",
                return: this.state.return,
            })

            properties[5].className = "doctor-form-input-error";
            return false;
        }

        // Check valid password
        properties[3].className = "doctor-form-input";
        if (properties[3].value.length < 8) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "Password must have at least 8 characters",
                color: "danger",
                return: this.state.return,
            })
            properties[3].className = "doctor-form-input-error";
            return false;
        }

        properties[3].className = "doctor-form-input";
        if (properties[3].value.includes(properties[0].value.toLowerCase()) || properties[3].value.includes(properties[1].value.toLowerCase()) || properties[3].value.includes(properties[2].value.toLowerCase())) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "Password can not be to similiar to the other fields",
                color: "danger",
                return: this.state.return,
            })
            properties[3].className = "doctor-form-input-error";
            return false;
        }

        // Check password confirmation
        properties[4].className = "doctor-form-input";
        if (properties[3].value !== properties[4].value) {
            this.setState({
                authUser: this.state.authUser,
                notFound: true,
                message: "Password not confirmed",
                color: "danger",
                return: this.state.return,
            })
            properties[4].className = "doctor-form-input-error";
            return false;
        }

        this.doctorInfo.first_name = firstName.value;
        this.doctorInfo.last_name = lastName.value;
        this.doctorInfo.email = email.value;
        this.doctorInfo.phone_number = phoneNumber.value;
        this.doctorInfo.password = password.value;

        var aux = birthDate.value.split("/").reverse()
        this.doctorInfo.birth_date = aux[0] + "-" + aux[2] + "-" + aux[1];

        this.setState({
            authUser: this.state.authUser,
            notFound: false,
            message: this.state.message,
            color: this.state.color,
            return: this.state.return,
        })

        return true;
    }


    addDoctor() {

        if (this.fieldsValidation()) {

            fetch(baseUri.restApi.doctors, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Token " + this.state.authUser.token
                },
                body: JSON.stringify(this.doctorInfo)
            })
                .then(response => {

                    if (!response.ok) throw new Error(response.status);
                    else return response.json();

                })
                .then(data => {

                    document.getElementById("first-name").value = "";
                    document.getElementById("last-name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("confirm-password").value = "";
                    document.getElementById("phone-number").value = "";
                    document.getElementById("birth-date").value = "";

                    var authUser = this.state.authUser;
                    authUser.token = data.token;
                    
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.setState({
                        authUser: this.state.authUser,
                        notFound: true,
                        message: this.doctorInfo.email + " doctor added with success!",
                        color: "success",
                        return: this.state.return,
                    })

                })
                .catch(error => {
                    console.log("Fetch error: " + error);
                    this.setState({
                        authUser: this.state.authUser,
                        notFound: true,
                        message: this.doctorInfo.email + " can not be added to the doctor list!",
                        color: "warning",
                        return: this.state.return,
                    })
                })
        }

    }

    onChange = (jsDate, dateString) => {
        document.getElementById("birth-date").value = dateString.split("T")[0]
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