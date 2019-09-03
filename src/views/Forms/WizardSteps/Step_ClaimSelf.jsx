import withStyles from "@material-ui/core/styles/withStyles";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import store from "redux/store";
import Jotform from "components/Jotform/Jotform";

import _ from "lodash";
import uuid from "uuid/v4";

const log = require("ololog");

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
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
  ...customCheckboxRadioSwitch
};

class Step_ClaimSelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _selected: ""
    };
    this._handleSelect = this._handleSelect.bind(this);
  }

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
    setTimeout(() => {
      console.log("AFTER", JSON.stringify(this.state, null, 2));
    }, 1000);
  }

  _handler = e => {
    log.lightBlue(e.target.value);
    store.dispatch({
      type: "SET_CLAIM_ABOUT",
      payload: e.target.value
    });
    this._handleSelect(e);
  };
  render() {
    const { classes, claim_about } = this.props;

    return (
      <section>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
						<Jotform src="https://hipaa.jotform.com/flavio.espinoza/claim-self" />
          </GridItem>
        </GridContainer>
      </section>
    );
  }
}

Step_ClaimSelf.propTypes = {
  classes: PropTypes.object
};

function mapStateToProps(state) {
  console.log(state);
  return {
    claim_about: state.claimsReducer.claim_about
  };
}

export default connect(mapStateToProps)(withStyles(style)(Step_ClaimSelf));
