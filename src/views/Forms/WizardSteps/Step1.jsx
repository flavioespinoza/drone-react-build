import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import PictureUpload from "components/CustomUpload/PictureUpload.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React from "react";

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

class Step1 extends React.Component {
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
		var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (emailRex.test(value)) {
			return true;
		}
		return false;
	}
	// function that verifies if value contains only numbers
	verifyNumber(value) {
		var numberRex = new RegExp("^[0-9]+$");
		if (numberRex.test(value)) {
			return true;
		}
		return false;
	}
	// function that verifies if a string has a given length or not
	verifyLength(value, length) {
		if (value.length >= length) {
			return true;
		}
		return false;
	}
	change(event, stateName, type, stateNameEqualTo) {
		switch (type) {
			case "email":
				if (this.verifyEmail(event.target.value)) {
					this.setState({ [stateName + "State"]: "success" });
				} else {
					this.setState({ [stateName + "State"]: "error" });
				}
				break;
			case "mobilePhone":
				if (this.verifyNumber(event.target.value)) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "length":
				if (this.verifyLength(event.target.value, stateNameEqualTo)) {
					this.setState({ [stateName + "State"]: "success" });
				} else {
					this.setState({ [stateName + "State"]: "error" });
				}
				break;
			default:
				break;
		}
		this.setState({ [stateName]: event.target.value });
	}
	isValidated() {
		if (
			this.state.firstNameState === "success" &&
			this.state.lastNameState === "success" &&
			this.state.emailState === "success" &&
			this.state.mobilePhoneState === "success"
		) {
			return true;
		} else {
			if (this.state.firstNameState !== "success") {
				this.setState({ firstNameState: "error" });
			}
			if (this.state.lastNameState !== "success") {
				this.setState({ lastNameState: "error" });
			}
			if (this.state.emailState !== "success") {
				this.setState({ emailState: "error" });
			}
			if (this.state.mobilePhoneState !== "success") {
				this.setState({ mobilePhoneState: "error" });
			}
		}
		return false;
	}
	render() {
		const { classes } = this.props;
		return (
			<GridContainer justify="center">
				<GridItem xs={12} sm={12}>
					<h4 className={classes.infoText}>
						Let's start with the basic information about the person.
          </h4>
				</GridItem>
				<GridItem xs={12} sm={4}>
					<PictureUpload />
				</GridItem>
				<GridItem xs={12} sm={4}>
					<CustomInput
						success={this.state.firstNameState === "success"}
						error={this.state.firstNameState === "error"}
						labelText={
							<span>
								First Name <small>(required)</small>
							</span>
						}
						id="firstName"
						formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							onChange: event => this.change(event, "firstName", "length", 3),
							endAdornment: (
								<InputAdornment
									position="end"
									className={classes.inputAdornment}
								>
									<Face className={classes.inputAdornmentIcon} />
								</InputAdornment>
							)
						}}
					/>
					<CustomInput
						success={this.state.lastNameState === "success"}
						error={this.state.lastNameState === "error"}
						labelText={
							<span>
								Last Name <small>(required)</small>
							</span>
						}
						id="lastName"
						formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							onChange: event => this.change(event, "lastName", "length", 3),
							endAdornment: (
								<InputAdornment
									position="end"
									className={classes.inputAdornment}
								>
									<RecordVoiceOver className={classes.inputAdornmentIcon} />
								</InputAdornment>
							)
						}}
					/>
					<CustomInput
						success={this.state.emailState === "success"}
						error={this.state.emailState === "error"}
						labelText={
							<span>
								Email <small>(required)</small>
							</span>
						}
						id="email"
						formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							onChange: event => this.change(event, "email", "email"),
							endAdornment: (
								<InputAdornment
									position="end"
									className={classes.inputAdornment}
								>
									<Email className={classes.inputAdornmentIcon} />
								</InputAdornment>
							)
						}}
					/>
					<CustomInput
						success={this.state.mobilePhoneState === "success"}
						error={this.state.mobilePhoneState === "error"}
						labelText={
							<span>
								Mobile Phone <small>(required)</small>
							</span>
						}
						id="mobilePhone"
						formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							onChange: event => this.change(event, "mobilePhone", "mobilePhone"),
							endAdornment: (
								<InputAdornment
									position="end"
									className={classes.inputAdornment}
								>
									<Phone className={classes.inputAdornmentIcon} />
								</InputAdornment>
							)
						}}
					/>
				</GridItem>

			</GridContainer>
		);
	}
}

Step1.propTypes = {
	classes: PropTypes.object
};

export default withStyles(style)(Step1);
