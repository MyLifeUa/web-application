import React from 'react';
import { Redirect } from 'react-router-dom';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

import FirstStage, { SecondStage, ThirdStage } from "views/SignUpStages/SignUpStage.js";

import config from "variables/config.js";
import baseURI from "variables/baseURI.js";

class SignUp extends React.Component {

    constructor() {
        super();

        this.state = {
            currentStage: 1,
            errorMessage: "",
            redirect: JSON.parse(localStorage.getItem('currentUser')) !== null ? true : false
        }

        this.changeStage = this.changeStage.bind(this);
        this.clickNext = this.clickNext.bind(this);
        this.validateFirstStage = this.validateFirstStage.bind(this);
        this.signupPOST = this.signupPOST.bind(this);
    }

    signupInfo = {
        email: null,
        password: null,
        first_name: null,
        last_name: null,
        birth_date: null,
        phone_number: null,
        photo: config.defaultUser,
        current_weight: null,
        weight_goal: null,
        sex: "M",
        is_diabetic: false,
        has_high_colesterol: false
    }

    validEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    validateFirstStage = () => {
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm-password");

        var properties = [firstName, lastName, email, password, confirmPassword];

        // Check if there are empty fields
        for (var i = 0; i < properties.length; i++)
            if (properties[i].value === "")
                properties[i].className = "form-input-error";
            else
                properties[i].className = "form-input";

        var emptyFields = properties.filter(p => p.value === "").length;

        if (emptyFields !== 0) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "*" + emptyFields + (emptyFields === 1 ? " field required" : " fields required")
            });

            return false;
        }

        // First name verification
        properties[0].className = "form-input";
        if (!properties[0].value.match(/^[a-zA-Z]+$/)) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "First name can only contain letters"
            });
            properties[0].className = "form-input-error";
            return false;
        }

        if (properties[0].value.trim().length < 3) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "First name should have at least 3 characters"
            });
            properties[0].className = "form-input-error";
            return false;
        }

        // Last name verification
        properties[1].className = "form-input";
        if (!properties[1].value.match(/^[a-zA-Z]+$/)) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Last name can only contain letters"
            });
            properties[1].className = "form-input-error";
            return false;
        }

        if (properties[1].value.trim().length < 3) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Last name should have at least 3 characters"
            });
            properties[1].className = "form-input-error";
            return false;
        }

        // Check valid email
        properties[2].className = "form-input";
        if (!this.validEmail(properties[2].value)) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Email format not valid"
            });
            properties[2].className = "form-input-error";
            return false;
        }

        // Check valid password
        properties[3].className = "form-input";
        if (properties[3].value.length < 8) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Password must have at least 8 characters"
            });
            properties[3].className = "form-input-error";
            return false;
        }

        properties[3].className = "form-input";
        if (properties[3].value.includes(properties[0].value.toLowerCase()) || properties[3].value.includes(properties[1].value.toLowerCase()) || properties[3].value.includes(properties[2].value.toLowerCase())) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Password can not be to similiar to the other fields"
            });
            properties[3].className = "form-input-error";
            return false;
        }

        // Check password confirmation
        properties[4].className = "form-input";
        if (properties[3].value !== properties[4].value) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Password not confirmed"
            });
            properties[4].className = "form-input-error";
            return false;
        }

        // update sign up info
        this.signupInfo.first_name = firstName.value;
        this.signupInfo.last_name = lastName.value;
        this.signupInfo.email = email.value;
        this.signupInfo.password = password.value;

        return true;
    }

    validateSecondStage = () => {
        var height = document.getElementById("height");
        var currentWeight = document.getElementById("current-weight");
        var goalWeight = document.getElementById("goal-weight");
        var phoneNumber = document.getElementById("phone-number");
        var birthDate = document.getElementById("birth-date");
        
        var sex = document.getElementById("sex-select");

        var properties = [height, currentWeight, goalWeight, phoneNumber, birthDate];


        // Check if there are empty fields
        for (var i = 0; i < properties.length; i++)
            if (properties[i].value === "")
                properties[i].className = "form-input-error";
            else
                properties[i].className = "form-input";

        var emptyFields = properties.filter(p => p.value === "").length;

        if (emptyFields !== 0) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "*" + emptyFields + (emptyFields === 1 ? " field required" : " fields required")
            });

            return false;
        }

        // Check height
        properties[0].className = "form-input";
        if (!properties[0].value.match(/^[.0-9]+$/) || parseFloat(properties[0].value) <= 0) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Invalid height"
            });
            properties[0].className = "form-input-error";
            return false;
        }

        // Check current weight
        properties[1].className = "form-input";
        if (!properties[1].value.match(/^[.0-9]+$/) || parseFloat(properties[1].value) <= 0) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Invalid current weight"
            });
            properties[1].className = "form-input-error";
            return false;
        }

        // Check goal weight
        properties[2].className = "form-input";
        if (!properties[2].value.match(/^[.0-9]+$/) || parseFloat(properties[2].value) <= 0) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Invalid goal weight"
            });
            properties[2].className = "form-input-error";
            return false;
        }

        // Check phone number
        properties[3].className = "form-input";
        if (!properties[3].value.match(/^[0-9]+$/) || properties[3].value.trim().length !== 9) {
            this.setState({
                currentStage: this.state.currentStage,
                errorMessage: "Invalid phone number"
            });
            properties[3].className = "form-input-error";
            return false;
        }

        this.signupInfo.phone_number = phoneNumber.value;
        this.signupInfo.height = height.value;
        this.signupInfo.current_weight = currentWeight.value;
        this.signupInfo.weight_goal = goalWeight.value;
        this.signupInfo.sex = sex.value;

        var aux = birthDate.value.split("/").reverse()
        this.signupInfo.birth_date = aux[0] + "-" + aux[2] + "-" + aux[1];

        return true;

    }
    

    clickNext() {

        if ((this.state.currentStage === 1 &&
            !this.validateFirstStage()) ||
            (this.state.currentStage === 3 &&
                !this.validateSecondStage())) {
            document.getElementById("errorMessage").class = "error-message";
            document.getElementById("errorMessage").style.visibility = "";
            return;
        }

        document.getElementById("errorMessage").style.visibility = "hidden";

        this.setState({
            currentStage: this.state.currentStage !== 3 ? this.state.currentStage + 1 : 3
        })

        // fetch POST sign up
        if (this.state.currentStage === 3) {
            this.signupPOST();
        }
            

    }

    signupPOST = () => {

        let healthProblems = JSON.parse(localStorage.getItem('healthProblems'));
        this.signupInfo.is_diabetic = healthProblems.is_diabetic;
        this.signupInfo.has_high_colesterol = healthProblems.has_high_colesterol;

        fetch(baseURI.restApi.signup, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.signupInfo)
        })
            .then(response => {

                if (!response.ok) throw new Error(response.status);
                else return response.json();

            })
            .then(data => {
                var errorMessage = document.getElementById("errorMessage");
                errorMessage.classList.remove("error-message");
                errorMessage.classList.add("success-signup");
            
                var icon = document.getElementById("errorIcon");
                icon.classList.remove("fa-exclamation-circle");
                icon.classList.add("fa-check-circle"); 
                
                this.setState({
                    currentStage: this.state.currentStage,
                    errorMessage: "Sign up complete! You will be redirected"
                })
                document.getElementById("errorMessage").style.visibility = "";

                setInterval(() => {
                    this.setState({redirect: true})
                }, 2000);

            })
            .catch(error => {
                console.log("Fetch error: " + error);
                this.setState({
                    errorMessage: "Email already taken",
                    stage: this.state.currentStage
                })
                document.getElementById("errorMessage").style.visibility = "";
            })
    }

    changeStage() {
        switch (this.state.currentStage) {
            case 1:
                return <FirstStage />
            case 2:
                return <SecondStage />
            case 3:
                return <ThirdStage />
            default:
                return <FirstStage />
        }
    }


    componentDidMount() {
        try {
            document.getElementById("errorMessage").style.visibility = "hidden";
        } catch { }
    }

    render() {
        if(this.state.redirect) return <Redirect to="/signin" />
        else
        return (
            <section className="banner">
                <div className="gradient">
                    <div class="limiter">
                        <div class="container-signup100">
                            <div class="wrap-signup100 p-t-10 p-b-40">
                                <h2 class="h2-title"><i class="fas fa-heartbeat"></i><br />Sign Up</h2>
                                {this.changeStage()}
                                <GridContainer justify="center">
                                    <GridItem xs={10} sm={10} md={10}>
                                        <Button id="btn" color="info" block type="button" onClick={this.clickNext}>
                                            {this.state.currentStage !== 3 ? <span>Next <i class="fas fa-arrow-right"></i></span> : <span>Sign Up <i class="fas fa-user-plus"></i></span>}
                                        </Button>
                                    </GridItem>
                                    <GridItem xs={10} sm={10} md={10}>
                                    <div class="error-message" id="errorMessage">{this.state.errorMessage} <i id="errorIcon" class="fas fa-exclamation-circle"></i></div>
                                    </GridItem>
                                    
                                </GridContainer>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SignUp;