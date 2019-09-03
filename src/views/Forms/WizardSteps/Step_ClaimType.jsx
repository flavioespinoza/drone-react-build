import withStyles from "@material-ui/core/styles/withStyles";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "redux/actions/actions";

import items from "../Claims/ClaimType";
import ClaimsSingleSelect from "../ClaimsSingleSelect";

import _ from "lodash";
import uuid from "uuid/v4";

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

class Step_ClaimType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _selected: ""
    };
    this._handleSelect = this._handleSelect.bind(this);
  }

  componentDidMount() {
    console.log(JSON.stringify(this.state, null, 2));
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
		const { actions } = this.props;
		actions.setProofingAnnotation(e.target.value)
    this._handleSelect(e);
  };
  render() {
    const { classes } = this.props;

    const group = {
      id: "claim_type",
      ariaLabel: "Claim Type",
      groupType: "ClaimType",
      groupName: "claim_type_1",
      groupInfoText: "What Type of Claim are you Making?",
      groupSubText: "(select best that applies to this context)",
      items: items
    };

    return (
      <section>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <ClaimsSingleSelect
                classes={classes}
                _handleChange={this._handler}
                {...group}
              />
            </GridContainer>
          </GridItem>
        </GridContainer>
      </section>
    );
  }
}

Step_ClaimType.propTypes = {
  classes: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
	console.log(state)
  return {
    proofing_annotation: state.dashboardReducer.proofing_annotation
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Step_ClaimType));
