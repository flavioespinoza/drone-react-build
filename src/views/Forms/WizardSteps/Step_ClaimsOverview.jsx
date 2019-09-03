import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import React from "react";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import _ from "lodash";
import { connect } from "react-redux";
import store from "redux/store";
import EmailCompose from "views/Forms/EmailCompose/EmailCompose.jsx";

const request = require("request");
const log = require("ololog");

class ParseStringVars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issuer_is_subject: this.props.issuer_is_subject.prettyFormat,
      issuer_name: this.props.issuer_name.prettyFormat,
      issuer_email: this.props.issuer_email.answer,
      subject_name: this.props.subject_name.prettyFormat,
      subject_email: this.props.subject_email.answer,
      claim_type: this.props.claim_type.answer,
      statement_of_truth: this.props.statement_of_truth.prettyFormat,
      consent_regarding_personal_data: this.props
        .consent_regarding_personal_data.prettyFormat,
      terms_and_conditions: this.props.terms_and_conditions.prettyFormat
    };
    this._get_jotform_submission = this._get_jotform_submission.bind(this);
    this._send_state = this._send_state.bind(this);
  }

  componentDidMount() {
    console.log("---------");
    console.log("---------");
    console.log("---------");
    console.log("---------");
    console.log("---------");
    console.log(this.state);
    if (this.state.claim_type === "Person Property Value") {
      this.setState({
        age_over: this.props.age_over.answer,
        proofing_annotation: this.props.proofing_annotation.answer
      });
    }
    setTimeout(() => {
      this._send_state(this.state);
    }, 500);
  }

  _send_state(_state) {
    this.props._send_state(_state);
  }

  _get_jotform_submission() {
    const _self = this;
    const urlParams = new URLSearchParams(window.location.search);
    const submission_id = urlParams.get("submission_id");
    const error = urlParams.get("error");
    _self.setState({ submission_id: submission_id });
    if (submission_id && !error) {
      const options = {
        method: "POST",
        url: "http://localhost:8080/api/request-verifications",
        qs: { submission_id: submission_id }
      };
      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        const _body = JSON.parse(body);
        console.log(_body);
        store.dispatch({
          type: "SET_CLAIM_ANSWERS",
          payload: _body.claim.answers
        });
      });
    } else {
      log.red("Request Verification Error");
    }
  }

  render() {
    const _self = this;
    const { claim_type } = this.state;
    const _parse_template = _template => {
      const r = _template.match(/\{[\w]+\}/g);
      r &&
        r.forEach(state => {
          const regex = new RegExp(state, "g");
          const stateItem = state.split(/{|}/g)[1];
          _template = _template.replace(regex, _self.state[stateItem]);
        });
      return <div dangerouslySetInnerHTML={{ __html: _template }} />;
    };
    if (claim_type === "Person Property Value") {
      const { age_over, proofing_annotation } = this.props;
      let template_age_over = `<div class="claim-answer">Assertion:<br /><span class="claim-answer__purple">${
        age_over.text
      } ${age_over.answer}</span></div>`;
      let template_proofing_annotation = `<div class="claim-answer">Basis of Verification:<br /><span class="claim-answer__purple">${
        proofing_annotation.answer
      }</span></div>`;
      return (
        <section>
          <div className={"claim-answer"}>
            Issuer is Subject:
            <br />
            <span className={"claim-answer__purple"}>
              {this.props.issuer_is_subject.prettyFormat}
            </span>
          </div>
          <div className={"claim-answer"}>
            Issuer Name:
            <br />
            <span className={"claim-answer__transparent"}>
              {this.props.issuer_name.prettyFormat}
            </span>
          </div>
          <div className={"claim-answer"}>
            Issuer Email:
            <br />
            <span className={"claim-answer__transparent"}>
              {this.props.issuer_email.answer}
            </span>
          </div>
          <div className={"claim-answer"}>
            Subject Name:
            <br />
            <span className={"claim-answer__transparent"}>
              {this.props.subject_name.prettyFormat}
            </span>
          </div>
          <div className={"claim-answer"}>
            Subject Email:
            <br />
            <span className={"claim-answer__transparent"}>
              {this.props.subject_email.answer}
            </span>
          </div>
          <div className={"claim-answer"}>
            Claim Type:
            <br />
            <span className={"claim-answer__blue"}>
              {this.props.claim_type.answer}
            </span>
          </div>
          <div className={"claim-answer"}>
            {_parse_template(template_age_over)}
          </div>
          <div className={"claim-answer"}>
            {_parse_template(template_proofing_annotation)}
          </div>
          <div className={"claim-answer"}>
            Evidence:
            <br />
            <img
              className={"claim-answer__evidence-img"}
              src={this.props.uploadDocuments245.answer}
            />
          </div>
          <div className={"claim-answer"}>
            Statement of Truth:
            <br />
            <span className={"claim-answer__blue"}>
              {this.props.statement_of_truth.prettyFormat}
            </span>
          </div>
          <div className={"claim-answer"}>
            Consent Regarding Personal Data:
            <br />
            <span className={"claim-answer__blue"}>
              {this.props.consent_regarding_personal_data.prettyFormat}
            </span>
          </div>
          <div className={"claim-answer"}>
            Terms and Conditions:
            <br />
            <span className={"claim-answer__blue"}>
              {this.props.terms_and_conditions.prettyFormat}
            </span>
          </div>
        </section>
      );
    } else if (claim_type.answer === "Person Relationship Person") {
      let template = `<div>Person Relationship Person Placeholder</div>`;
      return <div>{_parse_template(template)}</div>;
    } else if (claim_type.answer === "Person Association Organization") {
      let template = `<div>Person Association Organization Placeholder</div>`;
      return <div>{_parse_template(template)}</div>;
    } else {
      return <div>Loading....</div>;
    }
  }
}

class Step_ClaimsOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMsg: "hello",
      submission_id: undefined,
      answers: []
    };
    this._get_jotform_submission = this._get_jotform_submission.bind(this);
    this._handle_state = this._handle_state.bind(this);
  }

  // Get Claim Issuer wants to send to Verifier
  componentDidMount() {
    this._get_jotform_submission();
    this._handle_state();
  }

  sendState() {
    return this.state;
  }

  _handle_state(_state) {
    console.log("_handle_state", _state);
    this.setState(_state);
  }

  // Retrieves Claim Submission Answers from the Jotform API
  _get_jotform_submission() {
    const _self = this;
    const urlParams = new URLSearchParams(window.location.search);
    const submission_id = urlParams.get("submission_id");
    const error = urlParams.get("error");
    _self.setState({ submission_id: submission_id });
    if (submission_id && !error) {
      const options = {
        method: "POST",
        url: "http://localhost:8080/api/request-verifications",
        qs: { submission_id: submission_id }
      };
      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        const _body = JSON.parse(body);
        console.log(_body);
        store.dispatch({
          type: "SET_CLAIM_ANSWERS",
          payload: _body.claim.answers
        });
      });
    } else {
      log.red("Request Verification Error");
    }
  }

  render() {
    const { classes, claim_answers } = this.props;
    // console.log("claim_answers", claim_answers);
    const issuer_is_subject = _.find(claim_answers, obj => {
      return obj.name === "issuer_is_subject";
    });
    const _props = {};
    const _order = [];
    if (issuer_is_subject) {
      _.each(claim_answers, obj => {
        obj.order = _.toNumber(obj.order);
        _order.push(obj);
      });
    }
    const _sort = _.sortBy(_order, [
      function(obj) {
        return obj.order;
      }
    ]);
    _.each(_sort, obj => {
      _props[obj.name] = obj;
    });
    const _claims_answers = (props, sort) => {
      // console.log(JSON.stringify(props, null, 2));
      if (props.issuer_is_subject) {
        return <ParseStringVars _send_state={this._handle_state} {...props} />;
      }
    };
    return (
      <section>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={12}>
            {_claims_answers(_props, _sort)}
          </GridItem>
        </GridContainer>
      </section>
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
  withStyles(dashboardStyle)(Step_ClaimsOverview)
);
