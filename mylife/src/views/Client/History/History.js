import React from 'react';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import Button from "components/CustomButtons/Button.js";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

class History extends React.Component {

    constructor() {
        super();
        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.nutrients = ["Calories", "Carbs", "Fat", "Proteins"]
        this.data = [
            {
                name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
            },
            {
                name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
            },
            {
                name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
            },
            {
                name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
            },
            {
                name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
            },
            {
                name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
            },
            {
                name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
            },
        ];
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
                        this.nutrients.map((nutrient, key) => {
                            return <GridItem xs={12} sm={12} md={2} style={{marginTop: "15px"}}><Button round color={nutrient === "Calories" ? "info" : "white"} style={{width: "150px"}}>{nutrient}</Button></GridItem>
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
                        </LineChart>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <h4><i className="fas fa-dumbbell" style={{ color: "#00acc1", marginRight: "5px" }}></i> Body history</h4>
                    </GridItem>
                    {
                        this.nutrients.map((nutrient, key) => {
                            return <GridItem xs={12} sm={12} md={2} style={{marginTop: "15px"}}><Button round color={nutrient === "Calories" ? "info" : "white"} style={{width: "150px"}}>{nutrient}</Button></GridItem>
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