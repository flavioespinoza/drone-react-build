// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import error from "assets/img/clint-mckoy.jpg";
import login from "assets/img/login.jpeg";
import register from "assets/img/register.jpeg";
import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/authStyle.jsx";
// core components
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";

const log = require('ololog')

class Pages extends React.Component {
	wrapper = React.createRef();
	componentDidMount() {
		document.body.style.overflow = "unset";
	}
	getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.collapse) {
				return this.getRoutes(prop.views);
			}
			if (prop.layout === "/auth") {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};

	getBgImage = () => {
		if (window.location.pathname.indexOf("/auth/register-page") !== -1) {
			return register;
		} else if (window.location.pathname.indexOf("/auth/login-page") !== -1) {
			return login;
		} else if (window.location.pathname.indexOf("/auth/error-page") !== -1) {
			return error;
		}
	}

	getActiveRoute = routes => {
		let activeRoute = "Authorization Network";
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = this.getActiveRoute(routes[i].views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else {
				if (
					window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
				) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	}

	render() {
		const { classes, ...rest } = this.props;
		return (
			<div>
				<AuthNavbar brandText={this.getActiveRoute(routes)} {...rest} />
				<div className={classes.wrapper} ref={this.wrapper}>
					<div
						className={classes.fullPage}
					>
						<Switch>
							{this.getRoutes(routes)}
							<Redirect from="/auth" to="/auth/login-page" />
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

Pages.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
