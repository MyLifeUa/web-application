import React from 'react';

import ReactSpeedometer from "react-d3-speedometer"

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import baseUri from "variables/baseURI";
import utils from "variables/utils";

class History extends React.Component {

    constructor() {
        super();
        this.state = {
            nutrient: { name: "Calories", period: "week" },
            nutrientsHistory: utils.defaultHistory,
            body: { name: "Calories", period: "week" },
            bodyHistory: utils.defaultHistory,
            heartSegmentStops: [49, 62, 66, 75, 82, 95],
            heartRate: 0,
            heartLabels: [],
            heartText: null,
            myLifeRate: 0,
            myLifeLabels: []
        };

        this.heartColors = {
            "Excellent": "#76E880",
            "Good": "#99FF33",
            "Average": "#99FFFF",
            "Fair": "#80CCFF",
            "Poor": "#BB99FF"
        };

        this.myLifeColors = {
            "Poor": "#0FA3B1",
            "Average": "#B5E2FA",
            "Excellent": "#F7A072",
        }

        this.nutrientsCache = {}
        utils.nutrients.forEach(nutrient => {
            utils.periods.forEach(period => {
                this.nutrientsCache[nutrient + "" + period] = [];
            });
        });

        this.bodyCache = {}
        utils.body.forEach(b => {
            utils.periods.forEach(period => {
                this.bodyCache[b + "" + period] = [];
            });
        });

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.toggleNutrient = this.toggleNutrient.bind(this);
        this.toggleNutrientPeriod = this.toggleNutrientPeriod.bind(this);
        this.fetchNutrients = this.fetchNutrients.bind(this);
        this.toggleBody = this.toggleBody.bind(this);
        this.toggleBodyPeriod = this.toggleBodyPeriod.bind(this);
        this.fetchBody = this.fetchBody.bind(this);
        this.fetchHeart = this.fetchHeart.bind(this);
        this.fetchMyLifeLabel = this.fetchMyLifeLabel.bind(this);
    }

    componentDidMount() {
        this.fetchMyLifeLabel();
        this.fetchHeart();
        this.fetchNutrients(this.state.nutrient.name, this.state.nutrient.period);
        this.fetchBody(this.state.body.name, this.state.body.period);
    }


    fetchNutrients(nutrient, period) {

        if (this.nutrientsCache[nutrient + "" + period].length !== 0) {
            this.setState({
                nutrient: { name: nutrient, period: period },
                nutrientsHistory: this.nutrientsCache[nutrient + "" + period],
                body: this.state.body,
                bodyHistory: this.state.bodyHistory,
            })
            return;
        }


        fetch(baseUri.restApi.nutrientsHistory + this.authUser.message.email + "?metric=" + nutrient.toLowerCase() + "&period=" + period, {
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

                let nutrientsHistory = [];
                data.message.history.forEach(elem => {
                    nutrientsHistory.push({
                        day: elem.day,
                        value: elem.value,
                        goal: data.message.goal !== undefined ? data.message.goal : 0
                    })
                })

                this.setState({
                    nutrient: { name: nutrient, period: period },
                    nutrientsHistory: nutrientsHistory,
                    body: this.state.body,
                    bodyHistory: this.state.bodyHistory,
                })
                this.nutrientsCache[nutrient + "" + period] = data.message.history;

            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    fetchHeart() {
        fetch(baseUri.restApi.heartLabel + this.authUser.message.email, {
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
                let heartSegmentStops = [];

                let heartLabels = [];

                for (let key in data.message.scale) {
                    if(data.message.scale[key] !== "Poor") {
                        heartLabels.push(
                            <div style={{ padding: "5px", height: "30px", width: "120px", backgroundColor: this.heartColors[data.message.scale[key]] }}><strong style={{ color: "white" }}>{key}: {data.message.scale[key]}</strong></div>
                        )
                        heartSegmentStops.push(parseInt(String(key).split("-")[0]))
                    }
                }
                for (let key in data.message.scale) {
                    if(data.message.scale[key] === "Poor") {
                        heartLabels.push(
                            <div style={{ padding: "5px", height: "30px", width: "120px", backgroundColor: this.heartColors[data.message.scale[key]] }}><strong style={{ color: "white" }}>{key}: {data.message.scale[key]}</strong></div>
                        )
                        key = key + "-";
                        heartSegmentStops.push(parseInt(String(key).split("-")[0]))
                    }
                }
                heartSegmentStops.push(99);

                this.setState({
                    heartSegmentStops: heartSegmentStops.sort(),
                    heartRate: {
                        "value": data.message.avg_heart_rate <= 99 ? data.message.avg_heart_rate : 99,
                        "label": data.message.label
                    },
                    heartLabels: heartLabels.sort(),
                })

            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    fetchMyLifeLabel() {
        fetch(baseUri.restApi.myLifeLabel + this.authUser.message.email, {
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
                let myLifeLabels = [];

                for (let key in data.message.scale) {
                    myLifeLabels.push(
                        <div style={{ padding: "5px", height: "30px", width: "120px", backgroundColor: this.myLifeColors[data.message.scale[key]] }}><strong style={{ color: "white" }}>{key}: {data.message.scale[key]}</strong></div>
                    )
                }
                this.setState({
                    myLifeLabels: myLifeLabels,
                    myLifeRate: data.message.current_week
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }


    toggleNutrient = (event) => {
        this.fetchNutrients(event.target.value, this.state.nutrient.period);
    }

    toggleNutrientPeriod = (event) => {
        this.fetchNutrients(this.state.nutrient.name, event.target.value);
    }


    fetchBody(body, period) {

        if (this.bodyCache[body + "" + period].length !== 0) {
            this.setState({
                nutrient: this.state.nutrient,
                nutrientsHistory: this.state.nutrientsHistory,
                body: { name: body, period: period },
                bodyHistory: this.bodyCache[body + "" + period],
            })
            return;
        }


        fetch(baseUri.restApi.bodyHistory + this.authUser.message.email + "?metric=" + body.toLowerCase() + "&period=" + period, {
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

                let bodyHistory = [];
                data.message.history.forEach(elem => {
                    bodyHistory.push({
                        day: elem.day,
                        value: elem.value,
                        goal: data.message.goal !== undefined ? data.message.goal : 0
                    })
                })

                this.setState({
                    nutrient: this.state.nutrient,
                    nutrientsHistory: this.state.nutrientsHistory,
                    body: { name: body, period: period },
                    bodyHistory: bodyHistory
                })
                this.bodyCache[body + "" + period] = data.message.history;

            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    toggleBody = (event) => {
        this.fetchBody(event.target.value, this.state.body.period);
    }

    toggleBodyPeriod = (event) => {
        this.fetchBody(this.state.body.name, event.target.value);
    }

    render() {
        return (
            <div id="history">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}>
                        <h3><i className="fas fa-file-medical-alt" style={{ color: "#00acc1", marginRight: "5px" }}></i> Health History</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <h4><i className="fas fa-heartbeat" style={{ color: "#00acc1", marginRight: "5px" }}></i> <strong>MyLife Metric</strong></h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <h4><i className="fas fa-heartbeat" style={{ color: "#00acc1", marginRight: "5px" }}></i> <strong>Heart history</strong></h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={12}>
                                {this.state.heartRate !== 0 &&
                                    <ReactSpeedometer
                                        minValue={0}
                                        value={this.state.myLifeRate.value}
                                        maxValue={5}
                                        currentValueText={this.state.myLifeRate.value + ""}
                                        customSegmentStops={[0, 2, 4, 5]}
                                        segmentColors={[
                                            "#0FA3B1",
                                            "#B5E2FA",
                                            "#F7A072",
                                        ]}
                                        customSegmentLabels={[
                                            {
                                                position: "INSIDE",
                                                color: "white",
                                            },
                                            {
                                                position: "INSIDE",
                                                color: "white",
                                            },
                                            {
                                                position: "INSIDE",
                                                color: "white",
                                            },
                                        ]}
                                    />}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-100px" }}>
                                <span>Your estimate of <strong>{this.state.myLifeRate.value}</strong> is <strong style={{ color: this.myLifeColors[this.state.myLifeRate.label] }}>{this.state.myLifeRate.label}</strong> for your age</span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <GridContainer>
                            {this.state.myLifeLabels.map(label => {
                                return <GridItem xs={12} sm={12} md={12} style={{ marginBottom: "10px" }}>
                                    {label}
                                </GridItem>
                            })}
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        {this.state.heartRate !== 0 &&
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <ReactSpeedometer
                                        minValue={this.state.heartSegmentStops[0]}
                                        value={this.state.heartRate.value}
                                        maxValue={this.state.heartSegmentStops[this.state.heartSegmentStops.length - 1]}
                                        currentValueText={this.state.heartRate.value + " bpm"}
                                        customSegmentStops={this.state.heartSegmentStops}
                                        segmentColors={[
                                            "#76E880",
                                            "#99FF33",
                                            "#99FFFF",
                                            "#80CCFF",
                                            "#BB99FF",
                                        ]}
                                        customSegmentLabels={[
                                            {
                                                position: "INSIDE",
                                                color: "white",
                                            },
                                            {
                                                position: "INSIDE",
                                                color: "white",
                                            },
                                            {
                                                position: "INSIDE",
                                                color: "white",
                                            },
                                            {
                                                position: "INSIDE",
                                                color: "white",
                                            },
                                            {
                                                position: "INSIDE",
                                                color: "white",
                                            },
                                        ]}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-100px" }}>
                                    <span>Your estimate of <strong>{this.state.heartRate.value}</strong> is <strong style={{ color: this.heartColors[this.state.heartRate.label] }}>{this.state.heartRate.label}</strong> for your age</span>
                                </GridItem>
                            </GridContainer>
                        }
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <GridContainer>
                            {this.state.heartLabels.map(label => {
                                return <GridItem xs={12} sm={12} md={12} style={{ marginBottom: "10px" }}>
                                    {label}
                                </GridItem>
                            })}
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <h4><i className="fas fa-apple-alt" style={{ color: "#00acc1", marginRight: "5px" }}></i> <strong>Nutrients history</strong> - {this.state.nutrient.name}</h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "15px" }}>
                        <FormControl variant="outlined" style={{ width: "180px" }}>
                            <InputLabel id="demo-simple-select-outlined-label">Metric</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="nutrients-metric"
                                value={this.state.nutrient.name}
                                onChange={this.toggleNutrient}
                                label="Metric"
                            >
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
                                id="nutrients-period"
                                value={this.state.nutrient.period}
                                onChange={this.toggleNutrientPeriod}
                                label="Period"
                            >
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
                            <Line type="monotone" dataKey="goal" stroke="red" />
                        </LineChart>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <h4><i className="fas fa-dumbbell" style={{ color: "#00acc1", marginRight: "5px" }}></i> <strong>Body history</strong> - {this.state.body.name}</h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "15px" }}>
                        <FormControl variant="outlined" style={{ width: "180px" }}>
                            <InputLabel id="demo-simple-select-outlined-label">Metric</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="nutrients-metric"
                                value={this.state.body.name}
                                onChange={this.toggleBody}
                                label="Metric"
                            >
                                {utils.body.map((b, key) => {
                                    return <MenuItem value={b}>{b}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "15px" }}>
                        <FormControl variant="outlined" style={{ width: "180px" }}>
                            <InputLabel id="demo-simple-select-outlined-label">Period</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="nutrients-period"
                                value={this.state.body.period}
                                onChange={this.toggleBodyPeriod}
                                label="Period"
                            >
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
                            data={this.state.bodyHistory}
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
                            <Line type="monotone" dataKey="goal" stroke="red" />
                        </LineChart>
                    </GridItem>


                </GridContainer>
            </div>
        );
    }

}

export default History;