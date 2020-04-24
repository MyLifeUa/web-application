import React from 'react';

import Chart from 'react-apexcharts'

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import IconButton from '@material-ui/core/IconButton';
import Table from "components/Table/Table.js";
import ArrowBack from '@material-ui/icons/ArrowBackIos';


import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import utils from "variables/utils.js";

import metric3 from "assets/img/client-dashboard/metric-3.png"
import metric4 from "assets/img/client-dashboard/metric-4.png"

import baseUri from "variables/baseURI.js";

import Patients from "views/Doctor/Patients/Patients.js";

class PatientsInfo extends React.Component {

    constructor(props) {
        super(props);
        this.today = new Date();
        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.state = {
            currentPatient: props.currentPatient,
            return: false,
            nutrientsTotal: [
                [<span><i className="fas fa-circle" style={{ color: "#007280" }}></i> Carbs</span>, 0, 0, 0],
                [<span><i className="fas fa-circle" style={{ color: "#00acc1" }}></i> Fats</span>, 0, 0, 0],
                [<span><i className="fas fa-circle" style={{ color: "#00cde6" }}></i> Proteins</span>, 0, 0, 0],
                [<span><i className="fas fa-circle" style={{ color: "#1ae6ff" }}></i> Calories</span>, 0, 0, 0]
            ],
            pieChart: {
                series: [1, 1, 1, 1],
                options: {
                    chart: {
                        width: 300,
                        type: 'pie',
                    },
                    labels: ['Carbs', 'Fats', 'Proteins', 'Others'],
                    colors: ['#007280', '#00acc1', '#00cde6', '#1ae6ff'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }],

                }
            },
            nutrient: { name: "Calories", period: "week" },
            nutrientsHistory: utils.defaultHistory,
            body: { name: "Calories", period: "week" },
            bodyHistory: utils.defaultHistory
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

        this.toggleReturn = this.toggleReturn.bind(this);
        this.fetchNutrients = this.fetchNutrients.bind(this);
    }

    toggleReturn() {
        this.setState({
            return: true
        })
    }

    classes = {
        cardCategoryWhite: {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            fontWeight: "500",
            marginTop: "0",
            marginBottom: "0"
        },
        cardTitleWhite: {
            color: "#FFFFFF",
            marginTop: "0px",
            minHeight: "auto",
            fontWeight: "500",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            marginBottom: "3px",
            textDecoration: "none"
        },
        cardHeader: {
            backgroundColor: "#00acc1",
            color: "white",
            fontSize: "18px",
        }
    };


    fetchNutrients() {
        fetch(baseUri.restApi.nutrientsRatio + this.state.currentPatient.email + "/" + this.today.toISOString().slice(0, 10), {
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

                let series = [
                    data.message.carbs.ratio,
                    data.message.fat.ratio,
                    data.message.proteins.ratio,
                    data.message.others.ratio,
                ];

                let pieChart = this.state.pieChart;
                pieChart.series = series;

                this.setState({
                    pieChart: pieChart,
                    nutrientsTotal: this.state.nutrientsTotal,
                    currentPatient: this.state.currentPatient,
                    return: this.state.return,
                    nutrient: this.state.nutrient,
                    nutrientsHistory: this.state.nutrientsHistory,
                    body: this.state.body,
                    bodyHistory: this.state.bodyHistory
                })



            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

        fetch(baseUri.restApi.nutrientsTotal + this.state.currentPatient.email + "/" + this.today.toISOString().slice(0, 10), {
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

                let nutrients = [
                    [<span><i className="fas fa-circle" style={{ color: "#007280" }}></i> Carbs</span>, data.message.carbs.total, data.message.carbs.goal, String(data.message.carbs.left).includes("-") === true ? <span style={{ color: "red" }}>{String(data.message.carbs.left).substr(1)}</span> : <span style={{ color: "green" }}>{data.message.carbs.left}</span>],
                    [<span><i className="fas fa-circle" style={{ color: "#00acc1" }}></i> Fats</span>, data.message.fat.total, data.message.fat.goal, String(data.message.fat.left).includes("-") === true ? <span style={{ color: "red" }}>{String(data.message.fat.left).substr(1)}</span> : <span style={{ color: "green" }}>{data.message.fat.left}</span>],
                    [<span><i className="fas fa-circle" style={{ color: "#00cde6" }}></i> Proteins</span>, data.message.proteins.total, data.message.proteins.goal, String(data.message.proteins.left).includes("-") === true ? <span style={{ color: "red" }}>{String(data.message.proteins.left).substr(1)}</span> : <span style={{ color: "green" }}>{data.message.proteins.left}</span>],
                    [<span><i className="fas fa-circle" style={{ color: "#1ae6ff" }}></i> Calories</span>, data.message.calories.total, data.message.calories.goal, String(data.message.calories.left).includes("-") === true ? <span style={{ color: "red" }}>{String(data.message.calories.left).substr(1)}</span> : <span style={{ color: "green" }}>{data.message.calories.left}</span>]
                ];

                this.setState({
                    pieChart: this.state.pieChart,
                    nutrientsTotal: nutrients,
                    currentPatient: this.state.currentPatient,
                    return: this.state.return,
                    nutrient: this.state.nutrient,
                    nutrientsHistory: this.state.nutrientsHistory,
                    body: this.state.body,
                    bodyHistory: this.state.bodyHistory
                })


            })
            .catch(error => {
                console.log("Fetch error: " + error);

                if (String(error).includes("SyntaxError: JSON.parse")) {
                    let nutrients = [
                        [<span><i className="fas fa-circle" style={{ color: "#007280" }}></i> Carbs</span>, 0, 0, 0],
                        [<span><i className="fas fa-circle" style={{ color: "#00acc1" }}></i> Fats</span>, 0, 0, 0],
                        [<span><i className="fas fa-circle" style={{ color: "#00cde6" }}></i> Proteins</span>, 0, 0, 0],
                        [<span><i className="fas fa-circle" style={{ color: "#1ae6ff" }}></i> Calories</span>, 0, 0, 0]
                    ];

                    this.setState({
                        pieChart: this.state.pieChart,
                        nutrientsTotal: nutrients,
                        currentPatient: this.state.currentPatient,
                        return: this.state.return,
                        nutrient: this.state.nutrient,
                        nutrientsHistory: this.state.nutrientsHistory,
                        body: this.state.body,
                        bodyHistory: this.state.bodyHistory
                    })
                }
            })
    }

    componentDidMount() {
        this.fetchNutrients();
    }

    render() {
        if (this.state.return) return <Patients />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><IconButton aria-label="back">
                            <ArrowBack onClick={() => this.toggleReturn()} style={{ color: "#00acc1" }} fontSize="medium" />
                        </IconButton>
                        Patient details</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card profile style={{ paddingBottom: "105px" }}>
                            <CardAvatar profile>
                                <a href="#pablo" >
                                    <img className="profile-picture" src={"data:image;base64," + this.state.currentPatient.photo} alt="Edit profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}><h3>{this.state.currentPatient.name}</h3></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><a href={"mailto:" + this.state.currentPatient.email}><strong>{this.state.currentPatient.email}</strong></a></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-ruler-vertical"></i> {this.state.currentPatient.height} cm</p></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-weight"></i>  {this.state.currentPatient.current_weight} kg</p></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class="fas fa-phone"></i> {this.state.currentPatient.phone_number}</p></GridItem>
                                    <GridItem xs={12} sm={12} md={12}><p style={{ fontSize: "17px" }}><i style={{ color: "#00acc1", marginRight: "3px" }} class={this.state.currentPatient.sex === "M" ? "fas fa-male" : "fas fa-female"}></i> {this.state.currentPatient.sex === "M" ? "Male" : "Female"}</p></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card profile>
                                    <CardAvatar profile style={{ height: "100px", width: "100px" }}>
                                        <a href="#i" onClick={this.changeProfilePicture}>
                                            <img className="profile-picture" src={metric4} alt="Edit profile" />
                                        </a>
                                    </CardAvatar>
                                    <CardBody profile>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}><h4>{this.state.currentPatient.height !== null && this.state.currentPatient.height !== "" ? this.state.currentPatient.height + " m" : "Not found"}</h4></GridItem>
                                            <GridItem xs={12} sm={12} md={6}><h4>{this.state.currentPatient.current_weight !== null && this.state.currentPatient.current_weight !== "" ? this.state.currentPatient.current_weight + " kg" : "Not found"}</h4></GridItem>
                                            <GridItem xs={12} sm={12} md={6} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Height</h6></GridItem>
                                            <GridItem xs={12} sm={12} md={6} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Weight</h6></GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} style={{ marginTop: "85px" }}>
                                <Card profile>
                                    <CardAvatar profile style={{ height: "100px", width: "100px" }}>
                                        <a href="#i" onClick={this.changeProfilePicture}>
                                            <img className="profile-picture" src={metric3} alt="Edit profile" />
                                        </a>
                                    </CardAvatar>
                                    <CardBody profile>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}><h4>{this.state.currentPatient.heart_rate !== null && this.state.currentPatient.weight_goal !== "" ? this.state.currentPatient.weight_goal + " kg" : "Not found"}</h4></GridItem>
                                            <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-40px", color: "#00acc1" }}><h6>Weight Goal</h6></GridItem>

                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <i className="fas fa-apple-alt"></i> Nutrients
                            </CardHeader>
                            <CardBody>
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Chart options={this.state.pieChart.options} series={this.state.pieChart.series} type="pie" width={300} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Table
                                            tableHeaderColor="info"
                                            tableHead={["Nutrient", "Total", "Goal", "Difference"]}
                                            tableData={this.state.nutrientsTotal}
                                        />
                                    </GridItem>

                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h3><i className="fas fa-file-medical-alt" style={{ color: "#00acc1", marginRight: "5px" }}></i> Health History</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <h4><i className="fas fa-apple-alt" style={{ color: "#00acc1", marginRight: "5px" }}></i> Nutrients history - <strong>{this.state.nutrient.name}</strong></h4>
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
                        <h4><i className="fas fa-dumbbell" style={{ color: "#00acc1", marginRight: "5px" }}></i> Body history - <strong>{this.state.nutrient.name}</strong></h4>
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
            </div >
        )
    }
}

export default PatientsInfo;