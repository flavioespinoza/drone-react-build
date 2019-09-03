import withStyles from "@material-ui/core/styles/withStyles";
import Gavel from "@material-ui/icons/Gavel";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

class ClaimsTable extends React.Component {
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

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className={"authnet-card"}>
            <CardHeader
              className={"authnet-card__header"}
              color="warning"
              stats
              icon
            >
              <CardIcon color="warning">
                <Gavel />
              </CardIcon>
              <h3 className={classes.cardTitle}>My Claims</h3>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "date",
                  "id",
                  "type",
                  "issuer",
                  "credential subject",
                  "annotations",
                  "requested verifications"
                ]}
                tableData={[
                  [
										"date",
										"id",
										"type",
										"issuer",
										"credential subject",
										"annotations",
										"requested verifications",
                    simpleButtons
                  ]
                ]}
                customCellClasses={[classes.left, classes.left, classes.left]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.left,
                  classes.left,
                  classes.left
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

ClaimsTable.propTypes = {
  classes: PropTypes.object
};

export default withStyles(extendedTablesStyle)(ClaimsTable);
