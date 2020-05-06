import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

class FoodLogs extends React.Component {


    render() {
        return (
            <div id="food-logs">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}>
                        <h3><i className="fas fa-utensils" style={{ color: "#00acc1", marginRight: "5px" }}></i> Foog Logs</h3>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }

}

export default FoodLogs;