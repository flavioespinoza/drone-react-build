import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React from "react";
import EmailCompose from "views/Forms/EmailCompose/EmailCompose.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};

class Step_Consent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobilePhone: "",

      firstNameState: "success",
      lastNameState: "success",
      emailState: "success",
      mobilePhoneState: "success"
    };
  }
  sendState() {
    return this.state;
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  render() {
    const { classes } = this.props;

    const privacy_domain_app = 'https://app.pd.authnet.webshield.io'

    let consent_text = `
    This Notice describes how Personal Identity Information about you will be protected by the Authorization Network, and how you can get access to this information.  Please review it carefully. Personally identifiable information about you, your SSN or Tax ID, your birth date, your gender, your emails, your phone numbers, your postal addresses,  your relationships with other people, your employment information, your professional and personal associations, etc, is called Personal Identity Information.  

    We must safeguard your Personal Identity Information and give you this Notice about our privacy and security practices that explains how, when and why we secure and protect your Personal Identity Information. 

    We must follow the practices described in this Notice, but we can change our privacy practices and the terms of this Notice at any time.

    If we revise the Notice, you may read the new version of the Notice of Privacy Practices on our website at ${privacy_domain_app}.  You also may ask for a copy of the Notice by contacting us at {contact_us_email}.

    Any uses or disclosures of your Personal Identity Information will be made only with your express consent, which you may withdraw at any time.

    For any other purposes not described in this Notice.  Without your permission, we will not use or disclose your Personal Identity Information under any circumstances.`

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <h4 className={classes.infoText}>
            Consent
          </h4>
          <p>
            
          </p>
        </GridItem>
      </GridContainer>
    );
  }
}

Step_Consent.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step_Consent);
