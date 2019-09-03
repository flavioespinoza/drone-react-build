/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.webshield.io/product/material-dashboard-pro-react
* Copyright 2019 WebShield (https://www.webshield.io)

* Coded by WebShield

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import cardTextStyle from "assets/jss/material-dashboard-pro-react/components/cardTextStyle.jsx";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";

function CardText({ ...props }) {
  const { classes, className, children, color, ...rest } = props;
  const cardTextClasses = classNames({
    [classes.cardText]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardTextClasses} {...rest}>
      {children}
    </div>
  );
}

CardText.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  children: PropTypes.node
};

export default withStyles(cardTextStyle)(CardText);
