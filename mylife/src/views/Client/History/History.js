import React from 'react';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Button from "components/CustomButtons/Button.js";



import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


import baseUri from "variables/baseURI";
import utils from "variables/utils";

class History extends React.Component {

    constructor() {
        super();
        this.state = {
            nutrient: "Calories",
            bodyMetric: "Calories",
            nutrientsHistory: [],
            bodyHistory: [],
        }
        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.data = [
            {
                name: 'Page A', pv: 24
            },
            {
                name: 'Page B', pv: 13
            },
            {
                name: 'Page C', pv: 98
            },
            {
                name: 'Page D', pv: 39,
            },
            {
                name: 'Page E', pv: 48
            },
            {
                name: 'Page F', pv: 38
            },
            {
                name: 'Page G', pv: 43
            },
        ];
        this.toggleNutrient = this.toggleNutrient.bind(this);
    }

    componentDidMount() {
        fetch(baseUri.restApi.nutrientsHistory + this.authUser.message.email + "?metric=" + this.state.nutrient.toLowerCase(), {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + this.authUser.token
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                this.authUser.token = data.token;
                localStorage.setItem('authUser', JSON.stringify(this.authUser));


                data.message.history.forEach(element => {
                    element.value = Math.floor(Math.random() * 101);
                });

                this.setState({
                    nutrient: this.state.nutrient,
                    bodyMetric: this.state.bodyMetric,
                    nutrientsHistory: data.message.history,
                    bodyHistory: this.state.bodyHistory,
                })

            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }


    toggleNutrient() {

    }

    render() {
        return (
            <div id="history">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}>
                        <h3><i className="fas fa-file-medical-alt" style={{ color: "#00acc1", marginRight: "5px" }}></i> Health History</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <h4><i className="fas fa-apple-alt" style={{ color: "#00acc1", marginRight: "5px" }}></i> Nutrients history - <strong>{this.state.nutrient}</strong></h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "15px" }}>
                        <FormControl variant="outlined" style={{ width: "180px" }}>
                            <InputLabel id="demo-simple-select-outlined-label">Metric</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={5}
                                onChange={this.toggleNutrient}
                                label="Age"
                            >
                                <MenuItem value="Calories">
                                    <em>None</em>
                                </MenuItem>
                                {utils.nutrients.map((nutrient, key) => {
                                    return <MenuItem value={nutrient}>{nutrient}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "15px" }}>
                        <FormControl variant="outlined" style={{ width: "180px" }}>
                            <InputLabel id="demo-simple-select-outlined-label">Period</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={5}
                                onChange={this.toggleNutrient}
                                label="Age"
                            >
                                <MenuItem value="Calories">
                                    <em>None</em>
                                </MenuItem>
                                {utils.periods.map((period, key) => {
                                    return <MenuItem value={period}>{period}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <LineChart
                            width={1000}
                            height={300}
                            data={this.state.nutrientsHistory}
                            margin={{
                                top: 5, right: 30, left: 5, bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#00acc1" activeDot={{ r: 8 }} />
                        </LineChart>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <h4><i className="fas fa-dumbbell" style={{ color: "#00acc1", marginRight: "5px" }}></i> Body history - <strong>{this.state.bodyMetric}</strong></h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "15px" }}>
                        <FormControl variant="outlined" style={{ width: "180px" }}>
                            <InputLabel id="demo-simple-select-outlined-label">Metric</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={5}
                                onChange={this.toggleNutrient}
                                label="Age"
                            >
                                <MenuItem value="Calories">
                                    <em>None</em>
                                </MenuItem>
                                {utils.body.map((metric, key) => {
                                    return <MenuItem value={metric}>{metric}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "15px" }}>
                        <FormControl variant="outlined" style={{ width: "180px" }}>
                            <InputLabel id="demo-simple-select-outlined-label">Period</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={5}
                                onChange={this.toggleNutrient}
                                label="Age"
                            >
                                <MenuItem value="Calories">
                                    <em>None</em>
                                </MenuItem>
                                {utils.periods.map((period, key) => {
                                    return <MenuItem value={period}>{period}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <LineChart
                            width={1000}
                            height={300}
                            data={this.data}
                            margin={{
                                top: 5, right: 30, left: 5, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </GridItem>

                </GridContainer>
            </div>
        );
    }

}

export default History;