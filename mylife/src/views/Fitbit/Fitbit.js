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
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    fetched: true,
                    measures: {
                        currentWeight: data[0].currentWeight + " kg",
                        date: data[0].date,
                        caloriesBMR: data[0].caloriesBMR,
                        caloriesOut: data[0].caloriesOut,
                        sedentaryMinutes: data[0].sedentaryMinutes,
                        steps: data[0].steps,
                        goalWeight: data[0].goalWeight + " kg",
                        heartRate: data[0].heartRate,
                        age: data[0].age,
                        avatar: data[0].avatar,
                        dateOfBirth: data[0].dateOfBirth,
                        fullName: data[0].fullName,
                        gender: data[0].gender,
                        height: data[0].height + " cm"

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
                        <div class="col-lg-4"><h1>Personal information</h1></div>
                        <div class="col-lg-1"></div>
                        <div class="col-lg-3"><h1>Fitbit measures</h1></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Name:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.fullName}</h2></div>
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Date:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.date}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Age:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.age}</h2></div>
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Current weight:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.currentWeight}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Date of birth:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.dateOfBirth}</h2></div>
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>CaloriesBMR:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.caloriesBMR}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Gender:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.gender}</h2></div>
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>CaloriesOut:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.caloriesOut}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Height:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.height}</h2></div>
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Sedentary minutes:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.sedentaryMinutes}</h2></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2"><h2>Heart Rate:</h2></div>
                        <div class="col-lg-2"><h2>{this.state.measures.heartRate}</h2></div>
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