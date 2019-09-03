import withStyles from "@material-ui/core/styles/withStyles"
import CheckBoxBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardFooter from "components/Card/CardFooter.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import Button from "components/CustomButtons/Button.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import PropTypes from "prop-types"
import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import request from 'request'

const log = require('ololog')

class RegisterPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cardAnimaton: 'cardHidden',
			beginRegister: false,
			registerEmail: "",
			registerEmailState: "",
			registerFirstName: "",
			registerFirstNameState: "",
			registerLastName: "",
			registerLastNameState: "",
			registerMobilePhone: "",
			registerMobilePhoneState: "",
			registerCheckbox: "",
			registerCheckboxState: "",
			checked: []
		}
		this.handleToggle = this.handleToggle.bind(this)
		this.registerClick = this.registerClick.bind(this)
		this._openid = this._openid.bind(this)
	}

	componentDidMount() {
		// Hidden class after 700 ms it is deleted and transition appears
		this.timeOutFunction = setTimeout(
			function () {
				this.setState({ cardAnimaton: "" })
			}.bind(this),
			700
		)
	}

	componentWillUnmount() {
		clearTimeout(this.timeOutFunction)
		this.timeOutFunction = null
	}

	verifyEmail(value) {
		var emailRex = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (emailRex.test(value)) {
			return true
		}
		return false
	}
	// function that verifies if a string has a given length or not
	verifyLength(value, length) {
		if (value.length >= length) {
			return true
		}
		return false
	}
	// function that verifies if two strings are equal
	compare(string1, string2) {
		if (string1 === string2) {
			return true
		}
		return false
	}
	// function that verifies if value contains only numbers
	verifyNumber(value) {
		var numberRex = new RegExp("^[0-9]+$")
		if (numberRex.test(value)) {
			return true
		}
		return false
	}
	// verifies if value is a valid URL
	verifyUrl(value) {
		try {
			new URL(value)
			return true
		} catch (_) {
			return false
		}
	}

	change(event, stateName, type, stateNameEqualTo, maxValue) {
		switch (type) {
			case "firstName":
				this.setState({ [stateName + "State"]: "success" })
				break
			case "lastName":
				this.setState({ [stateName + "State"]: "success" })
				break
			case "mobilePhone":
				if (this.verifyNumber(event.target.value)) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "email":
				log.blue(stateName)
				if (this.verifyEmail(event.target.value)) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "equalTo":
				if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "checkbox":
				if (event.target.checked) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "number":
				if (this.verifyNumber(event.target.value)) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "length":
				if (this.verifyLength(event.target.value, stateNameEqualTo)) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "max-length":
				if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "url":
				if (this.verifyUrl(event.target.value)) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "min-value":
				if (
					this.verifyNumber(event.target.value) &&
					event.target.value >= stateNameEqualTo
				) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "max-value":
				if (
					this.verifyNumber(event.target.value) &&
					event.target.value <= stateNameEqualTo
				) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			case "range":
				if (
					this.verifyNumber(event.target.value) &&
					event.target.value >= stateNameEqualTo &&
					event.target.value <= maxValue
				) {
					this.setState({ [stateName + "State"]: "success" })
				} else {
					this.setState({ [stateName + "State"]: "error" })
				}
				break
			default:
				break
		}
		switch (type) {
			case "checkbox":
				this.setState({ [stateName]: event.target.checked })
				break
			default:
				this.setState({ [stateName]: event.target.value })
				break
		}
	}

	handleToggle(value) {
		const { checked } = this.state
		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]
		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}
		this.setState({
			checked: newChecked
		})
	}

	registerClick() {

		const firstName = this.state.registerFirstName
		const lastName = this.state.registerLastName
		const mobilePhone = this.state.registerMobilePhone
		const email = this.state.registerEmail
		const termsAndConditions = this.state.registerCheckboxState

		const qs = {
			firstName: firstName,
			lastName: lastName,
			mobilePhone: mobilePhone,
			email: email,
			termsAndConditions: termsAndConditions
		}

		console.log('qs', qs)

		if (firstName === '') {
			this.setState({ registerFirstNameState: "error" })
		}
		if (lastName === '') {
			this.setState({ registerLastNameState: "error" })
		}
		if (email === '') {
			console.log(this.state.registerEmail)
			this.setState({ registerEmailState: "error" })
		}
		if (mobilePhone === '') {
			this.setState({ registerMobilePhoneState: "error" })
		}
		if (termsAndConditions === '') {
			this.setState({ registerCheckboxState: "error" })
		}
		setTimeout(() => {
			console.log(this.state)
			if (this.state.registerEmailState === 'success') {
				this._openid(qs)
			}
		}, 2000)

	}

	_openid(qs) {
		const options = {
			method: 'POST',
			url: 'http://localhost:8080/api/register',
			qs: qs,
			headers: {
				'cache-control': 'no-cache',
				Connection: 'keep-alive',
				'Content-Length': '',
				'Accept-Encoding': 'gzip, deflate',
				Host: 'localhost:8080',
				'Cache-Control': 'no-cache',
				Accept: '*/*',
			}
		}
		request(options, function (error, response, body) {
			if (error) throw new Error(error)
			const _body = JSON.parse(body)
			console.log(_body)
		})
	}

	render() {
		const { classes } = this.props
		const { beginRegister } = this.state

		const _loginShow = () => {
			if (beginRegister) {
				return (
					<Button color="rose" simple size="lg" onClick={this._openid}>
						Connecting... <i className="fas fa-cog fa-spin" style={{ marginLeft: '1em' }}></i>
					</Button>
				)
			} else {
				return (
					<Button color="rose" simple size="lg" onClick={this.registerClick}>
						Register
          </Button>
				)
			}
		}

		return (
			<div className={classes.container}>
				<GridContainer justify="center">
					<GridItem xs={12} sm={6} md={4}>
						<Card login className={classes[this.state.cardAnimaton]}>
							<CardHeader
								className={`${classes.cardHeader} ${classes.textCenter}`}
								color="rose"
							>
								<h4 className={classes.cardTitle}>Register</h4>
								<div className={classes.socialLine}>
									{[
										"fab fa-openid",
									].map((prop, key) => {
										return (
											<Button
												color="transparent"
												justIcon
												key={key}
												className={classes.customButtonClass}
											>
												<i className={prop} />
											</Button>
										)
									})}
								</div>
							</CardHeader>
							<CardBody>
								<GridContainer justify="center">
									<GridItem xs={12} sm={12} md={12}>
										<form className={classes.form}>
											<CustomInput
												success={this.state.registerFirstNameState === "success"}
												error={this.state.registerFirstNameState === "error"}
												labelText="First Name *"
												id="registerFirstName"
												formControlProps={{
													fullWidth: true,
													className: classes.customFormControlClasses
												}}
												inputProps={{
													onChange: (event) => {
														this.change(event, "registerFirstName", "firstName")
													}
												}}
											/>
											<CustomInput
												success={this.state.registerLastNameState === "success"}
												error={this.state.registerLastNameState === "error"}
												labelText="Last Name *"
												id="registerLastName"
												formControlProps={{
													fullWidth: true,
													className: classes.customFormControlClasses
												}}
												inputProps={{
													onChange: (event) => {
														this.change(event, "registerLastName", "lastName")
													}
												}}
											/>
											<CustomInput
												success={this.state.registerEmailState === "success"}
												error={this.state.registerEmailState === "error"}
												labelText="Email Address *"
												id="registeremail"
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{
													onChange: event =>
														this.change(event, "registerEmail", "email"),
													type: "email"
												}}
											/>
											<CustomInput
												success={this.state.registerMobilePhoneState === "success"}
												error={this.state.registerMobilePhoneState === "error"}
												labelText="Mobile Phone *"
												id="registerMobilePhone"
												formControlProps={{
													fullWidth: true,
													className: classes.customFormControlClasses
												}}
												inputProps={{
													onChange: (event) => {
														this.change(event, "registerMobilePhone", "mobilePhone")
													}
												}}
											/>
											<FormControlLabel
												classes={{
													root: classes.checkboxLabelControl,
													label: classes.checkboxLabel
												}}
												control={
													<Checkbox
														success={this.state.registerEmailState === "success"}
														error={this.state.registerEmailState === "error"}
														tabIndex={-1}
														onClick={() => this.handleToggle(1)}
														checkedIcon={<CheckBoxIcon className={classes.checkedIcon} />}
														icon={<CheckBoxBlankIcon className={classes.uncheckedIcon} />}
														classes={{
															checked: classes.checked,
															root: classes.checkRoot
														}}
													/>
												}
												label={
													<span>
														I agree to the{" "}
														<a href="#pablo">terms and conditions</a>.
                          </span>
												}
											/>
										</form>
									</GridItem>
								</GridContainer>
							</CardBody>
							<CardFooter className={classes.justifyContentCenter}>
								{_loginShow()}
							</CardFooter>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		)
	}
}

RegisterPage.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(loginPageStyle)(RegisterPage)
