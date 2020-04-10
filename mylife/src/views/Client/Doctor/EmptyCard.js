import React from "react";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Sad from '@material-ui/icons/SentimentVeryDissatisfied';
// core components
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

var styles = {
    ...dashboardStyle,
    cardTitle: {
        marginTop: "0",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        color: "#15bbcf"
    }
};

const useStyles = makeStyles(styles);

export default function EmptyCard() {
    const classes = useStyles();
    return (
        <div>
            <Card>
                <CardHeader color="info" icon>
                    <CardIcon color="info">
                        <Sad />
                    </CardIcon>
                </CardHeader>
                <CardBody>
                    <h3 className={classes.cardTitle}>Doctor not found!</h3>
                    Currently, you do not have an associated doctor.<br />
                    Please, contact your doctor in order for him to add you. 
            </CardBody>
            </Card>
        </div>
    );
}