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
import { blackColor, cardTitle, container, hexToRgb, whiteColor } from "assets/jss/material-dashboard-pro-react.jsx";

const lockScreenPageStyle = theme => ({
  cardTitle,
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  customCardClass: {
    width: "240px",
    margin: "60px auto 0",
    color: whiteColor,
    display: "block",
    transform: "translate3d(" + hexToRgb(blackColor) + ")",
    transition: "all 300ms linear"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardAvatar: {
    maxWidth: "90px",
    maxHeight: "90px",
    marginTop: "-45px"
  },
  customCardFooterClass: {
    border: "none",
    paddingTop: "0"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  }
});

export default lockScreenPageStyle;
