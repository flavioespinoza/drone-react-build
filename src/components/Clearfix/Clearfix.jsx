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
// mterial-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import React from "react";


const style = {
  clearfix: {
    "&:after,&:before": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      clear: "both"
    }
  }
};

function Clearfix({ ...props }) {
  const { classes } = props;
  return <div className={classes.clearfix} />;
}

Clearfix.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Clearfix);
