import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import List from "views/Client/FoodLogs/List.js";
import Insert from "views/Client/FoodLogs/Insert.js";

import food01 from "assets/img/client-dashboard/food01.png";
import food02 from "assets/img/client-dashboard/food02.png";

class FoodLogs extends React.Component {

    constructor() {
        super();
        this.state = {
            page: 0
        }
    }

    render() {
        if(this.state.page === 1) return <List />
        if(this.state.page === 2) return <Insert />
        return (
            <div id="food-logs">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px" }}>
                        <h3><i className="fas fa-utensils" style={{ color: "#00acc1", marginRight: "5px" }}></i> Foog Logs</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{marginTop: "20px"}}>
                        <Card profile>
                            <CardAvatar profile>
                                <a href="#m">
                                    <img src={food01} alt="My profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <Button color="info" round onClick={() => this.setState({ page: 1 })}>
                                    Review food logs
                                </Button>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{marginTop: "20px"}}>
                        <Card profile>
                            <CardAvatar profile>
                                <a href="#m">
                                    <img src={food02} alt="My profile" />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <Button color="info" round onClick={() => this.setState({ page: 2 })}>
                                    Insert new food log
                                </Button>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }

}

export default FoodLogs;