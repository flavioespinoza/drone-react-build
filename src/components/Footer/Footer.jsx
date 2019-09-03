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
/*eslint-disable*/
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";
import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";



function Footer({ ...props }) {
  const { classes, fluid, white, rtlActive } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={block}>
                {rtlActive ? "الصفحة الرئيسية" : "Home"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={block}>
                {rtlActive ? "شركة" : "Company"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={block}>
                {rtlActive ? "بعدسة" : "Portfolio"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={block}>
                {rtlActive ? "مدونة" : "Blog"}
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a
            href="https://www.webshield.io"
            className={anchor}
            target="_blank"
          >
            {rtlActive ? "توقيت الإبداعية" : "WebShield Inc."}
          </a>
          {rtlActive
            ? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"
            : ", built on trust for a better web"}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
