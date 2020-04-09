import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import SearchIcon from '@material-ui/icons/Search';

import Patients from "views/Doctor/Patients/Patients.js";

import baseUri from "variables/baseURI.js";

class AddPatient extends React.Component {

    constructor() {
        super();
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            return: false,
            notFound: false,
            foundClient: null
        }
        this.toggleReturn = this.toggleReturn.bind(this);
        this.searchUser = this.searchUser.bind(this);
    }

    searchUser() {
        var email = document.getElementById("outlined-adornment-amount").value;

        if (email === "") {
            this.setState({
                authUser: this.state.authUser,
                return: false,
                notFound: true,
                foundClient: false
            })
            return
        }
        
        fetch(baseUri.restApi.checkEmail + email, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        })
        .then(data => {
            if(data.message === false) {
                this.setState({
                    authUser: this.state.authUser,
                    return: false,
                    notFound: true,
                    foundClient: this.state.foundClient
                })
                return;
            }
            
            fetch(baseUri.restApi.signup + "/" + email, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Token " + this.state.authUser.token
                }
            })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    authUser: this.state.authUser,
                    return: false,
                    notFound: false,
                    foundClient: data.message
                })
    
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

        })
        .catch(error => {
            console.log("Fetch error: " + error);
        })


    }

    toggleReturn() {
        this.setState({
            return: true
        })
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
                        Add patient</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <FormControl fullWidth variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><i className="fas fa-envelope"></i></InputAdornment>}
                                labelWidth={60}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}><Button color="info" onClick={this.searchUser} size="large"><SearchIcon /> Search</Button></GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>

                    {this.state.notFound === true ?
                        <GridItem xs={12} sm={12} md={4} style={{marginTop: "20px"}}>
                            <SnackbarContent
                                message={
                                    'The searched email was not foun!'
                                }
                                color="danger"
                            /> 
                        </GridItem> : 
                    ""}
                </GridContainer>
            </div>
        )
    }

}

export default AddPatient;