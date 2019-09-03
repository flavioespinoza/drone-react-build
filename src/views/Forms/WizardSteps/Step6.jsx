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

class Step6 extends React.Component {
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
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <h4 className={classes.infoText}>
            Request verification from one of your Contacts.
          </h4>
          <EmailCompose />
        </GridItem>
      </GridContainer>
    );
  }
}

Step6.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step6);
