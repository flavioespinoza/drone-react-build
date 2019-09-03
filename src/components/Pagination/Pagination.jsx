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
import Button from "@material-ui/core/Button";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import paginationStyle from "assets/jss/material-dashboard-pro-react/components/paginationStyle.jsx";
import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";



function Pagination({ ...props }) {
  const { classes, pages, color } = props;
  return (
    <ul className={classes.pagination}>
      {pages.map((prop, key) => {
        const paginationLink = cx({
          [classes.paginationLink]: true,
          [classes[color]]: prop.active,
          [classes.disabled]: prop.disabled
        });
        return (
          <li className={classes.paginationItem} key={key}>
            {prop.onClick !== undefined ? (
              <Button onClick={prop.onClick} className={paginationLink}>
                {prop.text}
              </Button>
            ) : (
              <Button
                onClick={() => alert("you've clicked " + prop.text)}
                className={paginationLink}
              >
                {prop.text}
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

Pagination.defaultProps = {
  color: "primary"
};

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(["PREV", "NEXT", "..."])
      ]).isRequired,
      onClick: PropTypes.func
    })
  ).isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(paginationStyle)(Pagination);
