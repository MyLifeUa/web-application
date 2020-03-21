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

class SignIn extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <section id="signin">
                    <div class="gradient">
                        <div class="limiter">
                            <div class="container-login100">
                                <div class="wrap-login100 p-t-50 p-b-90">
                                    <h1 class="h1-title">Sign In</h1>
                                    <Form>
                                        <Row>
                                            <Col md="1"></Col>
                                            <Col md="10">
                                                <FormGroup>
                                                    <InputGroup classname="mb-4">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i class="ni ni-zoom-split-in"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="Email" type="email" />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md="1"></Col>
                                        </Row>
                                    </Form>
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