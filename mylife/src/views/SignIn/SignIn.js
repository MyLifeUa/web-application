import React from 'react';

import { Redirect } from 'react-router-dom';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

import Header from '../../components/SignIn/Header';

import baseURIs from '../../variables/baseURIs';

class SignIn extends React.Component {

    constructor() {
        super();

        this.state = {
            redirect: false
        }

        this.clickLogin = this.clickLogin.bind(this);
    }

    componentDidMount() {
        document.getElementById("errorMessage").style.visibility = "hidden";
    }

    clickLogin() {
        const username = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch(baseURIs.restApi.baseURI + baseURIs.restApi.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                return ""
                /*
                if (!response.ok) throw new Error(response.status);
                else return response.json();
                */
            })
            .then(data => {
                document.getElementById("errorMessage").style.visibility = "none";

                this.setState({
                    redirect: true
                })

            })
            .catch(error => {
                console.log("Fetch error: " + error);
                document.getElementById("errorMessage").style.visibility = "";
            })


    }

    inputStyle = {
        borderColor: "#4ca2d1",
        textColor: "#4ca2d1"
    }

    render() {
        if (this.state.redirect) return (<Redirect to="/user" />);
        else
            return (
                <div>
                    <Header />
                    <section id="signin">
                        <div class="gradient">
                            <div class="limiter">
                                <div class="container-login100">
                                    <div class="wrap-login100 p-t-50 p-b-90">
                                        <h1 class="h1-title"><i class="fas fa-heartbeat"></i><br />Sign In</h1>
                                        <Form>
                                            <Row>
                                                <Col sm="1"></Col>
                                                <Col sm="10">
                                                    <FormGroup>
                                                        <Input id="email" style={this.inputStyle} placeholder="Email" type="email" />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="1"></Col>
                                            </Row>
                                            <Row>
                                                <Col sm="1"></Col>
                                                <Col sm="10">
                                                    <FormGroup>
                                                        <Input id="password" style={this.inputStyle} placeholder="Password" type="password" />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="1"></Col>
                                            </Row>
                                            <Row>
                                                <Col sm="1"></Col>
                                                <Col sm="10">
                                                    <Button block color="info" size="lg" type="button" onClick={this.clickLogin}>Sign In</Button>
                                                </Col>
                                                <Col sm="1"></Col>
                                            </Row>
                                        </Form>
                                        <div class="row">
                                            <div class="col-sm-1"></div>
                                            <div class="col-sm-10 login-forget-pw"><a href="#">Forgot password?</a></div>
                                            <div class="col-sm-1"></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-1"></div>
                                            <div class="col-sm-10 error-message"><span id="errorMessage" ><i class="fas fa-exclamation-circle"></i> Invalid login credentials!</span></div>
                                            <div class="col-sm-1"></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div id="dropDownSelect1"></div>
                        </div>
                    </section>
                </div>
            );
    }
}

export default SignIn;