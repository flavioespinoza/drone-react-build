import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import Wizard from "components/Wizard/Wizard";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Step6 from "./WizardSteps/Step6";
import Step_ClaimsOverview from "./WizardSteps/Step_ClaimsOverview";

import _ from "lodash";
import uuid from "uuid/v4";
import { connect } from "react-redux";
import store from "redux/store";

const log = require("ololog");

class RequestVerifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMsg: "",
      submission_id: undefined,
      answers: [],
      claims_overview: {}
    };
  }

  // Get Claim Issuer wants to send to Verifier
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Wizard
            validate
            title=""
            subtitle=""
            steps={[
              {
                stepName: "Claims Overview",
                stepComponent: Step_ClaimsOverview,
                stepProps: {},
                stepId: "claims_overview"
              },
              {
                stepName: "Request Verifications",
                stepComponent: Step6,
                stepProps: {},
                stepId: "request_verifications"
              }
            ]}
            nextButtonClick={e => {
              console.log(e);
              this.setState({
                claims_overview: e.claims_overview
              });
            }}
            finishButtonClick={e => {
              console.log(e);
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    claim_answers: state.claimsReducer.claim_answers
  };
}

export default connect(mapStateToProps)(
  withStyles(dashboardStyle)(RequestVerifications)
);
