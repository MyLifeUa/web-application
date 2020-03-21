import React from 'react';

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

import logo from '../../assets/home/white-logo.png'

class SignIn extends React.Component {

    inputStyle = {
        borderColor: "#4ca2d1",
        textColor: "#4ca2d1"
    }

    render() {
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
                                                    <Input style={this.inputStyle} placeholder="Email" type="email" />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="1"></Col>
                                        </Row>
                                        <Row>
                                            <Col sm="1"></Col>
                                            <Col sm="10">
                                                <FormGroup>
                                                    <Input style={this.inputStyle} placeholder="Password" type="password" />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="1"></Col>
                                        </Row>
                                        <Row>
                                            <Col sm="1"></Col>
                                            <Col sm="10">
                                                <Button block color="info" size="lg" type="button">Sign In</Button>
                                            </Col>
                                            <Col sm="1"></Col>
                                        </Row>
                                    </Form>
                                    <div class="row">
                                        <div class="col-sm-1"></div>
                                        <div class="col-sm-10 login-forget-pw"><a href="#">Forgot password?</a></div>
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