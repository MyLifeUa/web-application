import React from 'react';
import { Redirect } from 'react-router-dom';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

import baseURI from "variables/baseURI.js";

class SignIn extends React.Component {

    constructor() {
        super();

        this.state = {
            redirect: JSON.parse(localStorage.getItem('currentUser')) !== null ? true : false,
            currentUser: JSON.parse(localStorage.getItem('currentUser')) !== null ? JSON.parse(localStorage.getItem('currentUser')).role : false
        }

        this.clickSignIn = this.clickSignIn.bind(this);

    }

    clickSignIn() {
        const username = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch(baseURI.restApi.signin, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(response => {

                if (!response.ok) throw new Error(response.status);
                else return response.json();

            })
            .then(data => {
                document.getElementById("errorMessage").style.visibility = "none";

                var currentUser = { "role": data.role, "userInfo": data.data, "token": data.token }

                localStorage.setItem('currentUser', JSON.stringify(currentUser))
                this.setState({
                    redirect: true,
                    currentUser: JSON.parse(localStorage.getItem('currentUser')).role
                })

            })
            .catch(error => {
                console.log("Fetch error: " + error);
                try {
                    document.getElementById("errorMessage").style.visibility = "";
                } catch {}
                
            })
    }

    componentDidMount() {
        try {
            document.getElementById("errorMessage").style.visibility = "hidden";
        }
        catch {}
        
    }

    render() {
        if (this.state.redirect) {
            if (this.state.currentUser === "client")
                return (<Redirect to="/client/auth" />);
            else if (this.state.currentUser === "doctor")
                return (<Redirect to="/doctor/auth" />)
            else if (this.state.currentUser === "admin")
                return (<Redirect to="/admin/auth" />)
        }
        else
            return (
                <section className="banner">
                    <div className="gradient">
                        <div class="limiter">
                            <div class="container-signin100">
                                <div class="wrap-signin100 p-t-10 p-b-10">
                                    <h2 class="h2-title"><i class="fas fa-heartbeat"></i><br />Sign In</h2>
                                    <GridContainer justify="center">
                                        <GridItem xs={1} sm={1} md={1}></GridItem>
                                        <GridItem xs={10} sm={10} md={10}><input id="email" class="form-input" placeholder="Email" type="email" /></GridItem>
                                        <GridItem xs={1} sm={1} md={1}></GridItem>
                                        <GridItem xs={1} sm={1} md={1}></GridItem>
                                        <GridItem xs={10} sm={10} md={10}><input id="password" class="form-input" placeholder="Password" type="password" /></GridItem>
                                        <GridItem xs={1} sm={1} md={1}></GridItem>
                                        <GridItem xs={1} sm={1} md={1}></GridItem>
                                        <GridItem xs={10} sm={10} md={10}><Button id="signin-btn" block color="info" onClick={this.clickSignIn}><span>Sign In <i className="fas fa-arrow-circle-up"></i></span></Button></GridItem>
                                        <GridItem xs={1} sm={1} md={1}></GridItem>
                                        <div className="error-message" ><p id="errorMessage"><i class="fas fa-exclamation-circle"></i> Invalid login credentials!</p></div>
                                    </GridContainer>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            );
    }
}

export default SignIn;