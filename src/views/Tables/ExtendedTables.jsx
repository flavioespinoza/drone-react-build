import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Add from "@material-ui/icons/Add";
// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Person from "@material-ui/icons/Person";
import Remove from "@material-ui/icons/Remove";
import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import PropTypes from "prop-types";
import React from "react";

class ExtendedTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes } = this.props;
    const fillButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button color={prop.color} className={classes.actionButton} key={key}>
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    const simpleButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          color={prop.color}
          simple
          className={classes.actionButton}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    const roundButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          round
          color={prop.color}
          className={classes.actionButton + " " + classes.actionButtonRound}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    return (
      <GridContainer>

        <GridItem xs={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <Check />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Consents</h4>
            </CardHeader>
						<CardBody>
              <Table
                tableHead={[
                  "ID",
                  "Authority",
                  "Consent Given",
                  "Since",
                  "Details",
                  "Actions"
                ]}
                tableData={[
                  [
                    "1",
                    "Authority 1",
                    "Consent 1",
                    "2019",
                    "Details about consent",
                    simpleButtons
                  ],
                  [
                    "2",
                    "Authority 2",
                    "Consent 2",
                    "2019",
                    "Details about consent",
                    simpleButtons
                  ],
                  [
                    "3",
                    "Authority 3",
                    "Consent 3",
                    "2019",
                    "Details about consent",
                    simpleButtons
                  ],
                  [
                    "4",
                    "Authority 4",
                    "Consent 4",
                    "2019",
                    "Details about consent",
                    simpleButtons
                  ]
                ]}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 4, 5]}
              />
            </CardBody>
          </Card>
        </GridItem>
			
			</GridContainer>
    );
  }
}

ExtendedTables.propTypes = {
  classes: PropTypes.object
};

export default withStyles(extendedTablesStyle)(ExtendedTables);
