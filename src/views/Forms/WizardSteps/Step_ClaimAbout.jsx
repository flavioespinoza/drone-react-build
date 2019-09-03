import withStyles from "@material-ui/core/styles/withStyles";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";

import items from "../Claims/ClaimAbout";
import ClaimsSingleSelect from "../ClaimsSingleSelect";

import _ from "lodash";
import uuid from "uuid/v4";

const log = require("ololog");

const style = {
  infoText: {
    fontWeight: "300",
    margin: "24px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choice: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  ...dashboardStyle
};

class Step_ClaimAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _selected: ""
    };
    this._handleSelect = this._handleSelect.bind(this);
  }

  componentDidMount() {}
  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
  }

  _handleSelect(e) {
    this.setState({
      _selected: e.target.value
    });
  }

  _handler = e => {
    this._handleSelect(e);
  };

  _navigateTo = e => {
    const { _selected } = this.state;
    if (_selected === "self_claim") {
      window.location.href = "http://localhost:8080/admin/self-claim";
    }
    if (_selected === "other_person_claim") {
      window.location.href = "http://localhost:8080/admin/other-person-claim";
    }
  };

  render() {
    const { classes } = this.props;

    const group = {
      id: "claim_subject",
      ariaLabel: "Who are you making a Claim about?",
      groupType: "ClaimSubject",
      groupName: "claim_subject_1",
      groupInfoText: "Who are you making a Claim about?",
      groupSubText: "(select best that applies to this context)",
      items: items
    };

    return (
      <section>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
            <Card className={"authnet-card"} style={{paddingBottom: 84}}>
              <ClaimsSingleSelect
                classes={classes}
                _handleChange={this._handler}
                {...group}
              />
              <Button
                color="rose"
                onClick={this._navigateTo}
                style={{ position: "absolute", bottom: 24, right: 24 }}
              >
                Next
              </Button>
            </Card>
          </GridItem>
        </GridContainer>
      </section>
    );
  }
}

Step_ClaimAbout.propTypes = {
  classes: PropTypes.object
};

function mapStateToProps(state) {
  console.log(state);
  return {
    claim_about: state.claimsReducer.claim_about
  };
}

export default connect(mapStateToProps)(withStyles(style)(Step_ClaimAbout));
