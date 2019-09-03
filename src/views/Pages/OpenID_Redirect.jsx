import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React from "react";
import request from 'request'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'redux/actions/actions'
import store from 'redux/store'

const log = require('ololog')

class OpenID_Redirect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cardAnimaton: 'cardHidden',
			alertMsg: 'Requesting Access Token',
			show: false,
			email: ''
		}
		this._openid_token = this._openid_token.bind(this)
	}

	componentDidMount() {
		this._openid_token()
		// Hidden class after 700 ms it is deleted and transition appears
		this.timeOutFunction = setTimeout(
			function () {
				this.setState({ cardAnimaton: "" });
			}.bind(this),
			700
		);
	}

	componentWillUnmount() {
		clearTimeout(this.timeOutFunction);
		this.timeOutFunction = null;
	}

	_openid_token() {
		const { actions } = this.props 
		const _self = this
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get('code')
		const error = urlParams.get('error')
		if (code && !error) {
			const options = {
				method: 'POST',
				url: 'http://localhost:8080/api/openIdClient/redirect',
				qs: { code: code },
				headers: {
					'cache-control': 'no-cache',
					Connection: 'keep-alive',
					'Content-Length': '',
					'Accept-Encoding': 'gzip, deflate',
					Host: 'localhost:8080',
					'Cache-Control': 'no-cache',
					Accept: '*/*',
				}
			};
			request(options, function (error, response, body) {
				if (error) throw new Error(error);
				
				const _body = JSON.parse(body)
				const token = _body.openid_token
				const user_info = _body.openid_user_info
				
				if (user_info.body) {
					
					const email = user_info.body.email
					
					_self.setState({
						alertMsg: 'Success!',
						email: email
					})

					//TODO: Set Session JWT 

					let dashboard_url = `http://localhost:8080/admin/dashboard?email=${email}`
					setTimeout(() => {
						window.location.href = dashboard_url
					}, 700)
				}

				if (token.body.error) {
					_self.setState({
						alertMsg: 'Expired Authorization Code'
					})
				}
			})
		} else {
			if (error && error.length > 0) {
				const error_description = urlParams.get('error_description')
				log.yellow(error_description)
				_self.setState({
					alertMsg: 'Authentication Failed'
				})
			} else {
				_self.setState({
					alertMsg: 'An Unknown Error Occurred'
				})
			}
		}
	}

	render() {
		const { classes } = this.props;
		const { alertMsg, email } = this.state;
		const _btnReturnToLogin = () => {
			if (alertMsg === 'Expired Authorization Code') {
				return (
					<Link to="/auth/login-page" className="link__goto-login">Go to Login</Link>
				)
			}
			if (alertMsg === 'Authentication Failed' || alertMsg === 'An Unknown Error Occurred') {
				return (
					<Link to="/auth/register-page" className="link__goto-login">Go to Registration</Link>
				)
			}
			if (alertMsg === 'Success!') {
				return (
					<Link to="#" disabled={true} className="link__goto-login">Loading Your Dashboard</Link>
				)
			}
		}
		return (
			<div className={classes.container}>
				<GridContainer justify="center">
					<GridItem xs={12} sm={6} md={4}>
						<form>
							<Card login className={classes[this.state.cardAnimaton]}>
								<CardHeader
									className={`${classes.cardHeader} ${classes.textCenter}`}
									color="rose"
								>
									<h4 className={classes.cardTitle}>{alertMsg}</h4>
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
											);
										})}
									</div>
								</CardHeader>
								<CardBody>
									{_btnReturnToLogin()}
								</CardBody>
							</Card>
						</form>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

OpenID_Redirect.propTypes = {
	classes: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

function mapStateToProps(state) {
	return {
		...state
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(loginPageStyle)(OpenID_Redirect))