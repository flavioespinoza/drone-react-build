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
import Grid from "@material-ui/core/Grid";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";

const style = {
  grid: {
    padding: "0 15px !important"
  }
};

function GridItem({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node
};

export default withStyles(style)(GridItem);
