import React from 'react';

import {
    Button,
    Row,
    Col
} from "reactstrap";

import { DatePicker, DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';


class FirstStage extends React.Component {

    render() {
        return (
            <div>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="5">
                        <input id="first-name" class="form-input" placeholder="First name *" type="text" />
                    </Col>
                    <Col sm="5">
                        <input id="last-name" class="form-input" placeholder="Last name *" type="text" />
                    </Col>
                    <Col sm="1"></Col>
                </Row>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="10">
                        <input id="email" class="form-input" placeholder="Email *" type="email" />
                    </Col>
                    <Col sm="1"></Col>
                </Row>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="5">
                        <input id="password" class="form-input" placeholder="Password *" type="password" />
                    </Col>
                    <Col sm="5">
                        <input id="confirm-password" class="form-input" placeholder="Confirm password *" type="password" />
                    </Col>
                    <Col sm="1"></Col>
                </Row>
            </div>
        );
    }
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
    

    render() {
        return (
            <div>
                <Row>
                <Col sm="6"></Col>
                <Col sm="3"><span class="input-title">Birth date</span></Col>
                </Row>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="5">
                        <input id="phone-number" class="form-input" placeholder="Phone number *" type="text" />
                    </Col>
                    <Col sm="5">
                        <DatePickerInput
                            locale="en-SG"
                            id="birth-date"
                            value={this.date}
                            onChange={this.onChange}
                            className='form-input'
                        />
                    </Col>
                    <Col sm="1"></Col>
                </Row>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="5">
                        <input id="height" class="form-input" placeholder="Height (cm) *" type="text" />
                    </Col>
                    <Col sm="5">
                        <input id="current-weight" class="form-input" placeholder="Current weight (kg) *" type="text" />
                    </Col>
                    <Col sm="1"></Col>
                </Row>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="10">
                        <input id="goal-weight" class="form-input" placeholder="What is your goal weight? (kg) *" type="text" />
                    </Col>
                    <Col sm="1"></Col>
                </Row>
            </div>
        );
    }
}

/* https://reactjsexample.com/a-decent-and-pretty-date-picker-to-be-used-with-reactjs/ */

export default FirstStage;
export { SecondStage }