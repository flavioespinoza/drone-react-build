import withStyles from "@material-ui/core/styles/withStyles";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Card from "components/Card/Card.jsx";
import _ from "lodash";

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

class Placeholder extends React.Component {
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
    return (
      <section>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
            <Card className={"authnet-card"} style={{paddingBottom: 84}}>
              <h2>Hello Placeholder Component</h2>
            </Card>
          </GridItem>
        </GridContainer>
      </section>
    );
  }
}

Placeholder.propTypes = {
  classes: PropTypes.object
};

function mapStateToProps(state) {
  console.log(state);
  return {
    claim_about: state.claimsReducer.claim_about
  };
}

export default connect(mapStateToProps)(withStyles(style)(Placeholder));
