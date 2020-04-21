import React from 'react';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

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



            console.log(data);
        })
        .catch(error => {
            console.log("Fetch error: " + error);
        })
    }



    render() {
        return (
            <div id="history">
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}>
                        <h3><i className="fas fa-file-medical-alt" style={{ color: "#00acc1", marginRight: "5px" }}></i> Health History</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <h4><i className="fas fa-apple-alt" style={{ color: "#00acc1", marginRight: "5px" }}></i> Nutrients history</h4>
                    </GridItem>
                    {
                        utils.nutrients.map((nutrient, key) => {
                            return <GridItem xs={12} sm={12} md={2} style={{marginTop: "15px"}}><Button round color={nutrient === this.state.nutrient ? "info" : "white"} style={{width: "150px"}}>{nutrient}</Button></GridItem>
                        })
                    }
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
                            <Line type="monotone" dataKey="pv" stroke="#00acc1" activeDot={{ r: 8 }} />
                        </LineChart>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <h4><i className="fas fa-dumbbell" style={{ color: "#00acc1", marginRight: "5px" }}></i> Body history</h4>
                    </GridItem>
                    {
                        utils.body.map((elem, key) => {
                            return <GridItem xs={12} sm={12} md={2} style={{marginTop: "15px"}}><Button round color={elem === this.state.bodyMetric ? "info" : "white"} style={{width: "150px"}}>{elem}</Button></GridItem>
                        })
                    }
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