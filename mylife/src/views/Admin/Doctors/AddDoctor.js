import React from 'react';


import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Doctors from "views/Admin/Doctors/Doctors.js";

class AddDoctor extends React.Component {


    constructor() {
        super();
        this.state = {
            return: false
        }
        this.toggleReturn = this.toggleReturn.bind(this);
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
                </GridContainer>
            </div>
        );
    }
}

export default AddDoctor;