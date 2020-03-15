import React from 'react';

import URIs from '../../variables/baseURIs';

export default class Fitbit extends React.Component {

    constructor() {
        super();
        this.state = {
            fetched: false,
            measures: {
                currentWeight: null,
                date: null,
                caloriesBMR: null,
                caloriesOut: null,
                sedentaryMinutes: null,
                steps: null
            }
        }
        this.getMeasures = this.getMeasures.bind(this);
    }

    getMeasures() {

        console.log(URIs.fitbit.baseURI + "fitbit/");
        fetch(URIs.fitbit.baseURI + "fitbit/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json() )
        .then(data => {
            console.log(data);
            this.setState({
                fetched: true,
                measures: {
                    currentWeight: data[0].currentWeight,
                    date: data[0].date,
                    caloriesBMR: data[0].caloriesBMR,
                    caloriesOut: data[0].caloriesOut,
                    sedentaryMinutes: data[0].sedentaryMinutes,
                    steps: data[0].steps
                }
            })
        })
        .catch(error => {
            console.log("GET ERROR: " + error);
        })

    }

    render() {
        if (this.state.fetched) {
            return (
                <div id="fitbit">
                    <div class="row" style={{ marginTop: "100px" }}>
                        <div class="col-lg-1"></div>
                        <div class="col-lg-3"><h1>Fitbit measures</h1></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Date:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.date}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Current weight:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.currentWeight}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>CaloriesBMR:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.caloriesBMR}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>CaloriesOut:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.caloriesOut}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Sedentary minutes:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.sedentaryMinutes}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Steps:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.steps}</h2></div>
                    </div>
                </div>
            );
        }
        return (
            <div id="fitbit">
                <div class="row" style={{ marginTop: "100px" }}>
                    <div class="col-lg-1"></div>
                    <div class="col-lg-3"><h1>Fitbit measures</h1></div>
                </div>
                <div class="row" style={{ marginTop: "100px" }}>
                    <div class="col-lg-1"></div>
                    <div class="col-lg-3"><button onClick={this.getMeasures}>Get measures!</button></div>
                </div>
            </div>
        )

    }
}