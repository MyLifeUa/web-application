import React from 'react';


import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Doctors from "views/Admin/Doctors/Doctors.js";

class AddDoctor extends React.Component {


    constructor() {
        super();
        this.state = {
            return: false
        }
        this.searchDoctor = this.searchDoctor.bind(this);
        this.toggleReturn = this.toggleReturn.bind(this);
    }

    searchDoctor() {
        alert("Search doctor!");
    }

    toggleReturn() {
        this.setState({
            return: true
        })
    }

    render() {
        if(this.state.return) return <Doctors /> 
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><IconButton aria-label="back">
                            <ArrowBack onClick={() => this.toggleReturn()} style={{ color: "#00acc1" }} fontSize="medium" />
                        </IconButton>
                        Add doctor</h3>
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
                    <GridItem xs={12} sm={12} md={2}><Button color="info" onClick={this.searchDoctor} size="large" round><AddCircleIcon /> Add doctor</Button></GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default AddDoctor;