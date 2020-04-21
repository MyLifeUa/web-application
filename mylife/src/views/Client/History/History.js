import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

class History extends React.Component {

    constructor() {
        super();
        this.authUser = JSON.parse(localStorage.getItem('authUser'));
    }



    render() {
        return (
            <div id="history">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px"}}>
                        <h3><i className="fas fa-file-medical-alt" style={{ color: "#00acc1", marginRight: "5px" }}></i> Health History</h3>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }

}

export default History;