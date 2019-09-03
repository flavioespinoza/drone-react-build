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
import { cardTitle, dangerColor, grayColor, infoColor, primaryColor, roseColor, successColor, warningColor } from "assets/jss/material-dashboard-pro-react.jsx";

const chartsStyle = {
  cardTitle,
  cardCategory: {
    margin: "0",
    color: grayColor[0]
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  legendTitle: {
    color: grayColor[0],
    margin: "10px 0 !important",
    display: "flex"
  },
  primary: {
    color: primaryColor[0]
  },
  warning: {
    color: warningColor[0]
  },
  danger: {
    color: dangerColor[0]
  },
  success: {
    color: successColor[0]
  },
  info: {
    color: infoColor[0]
  },
  rose: {
    color: roseColor[0]
  },
  gray: {
    color: grayColor[0]
  },
  cardFooter: {
    display: "block"
  }
};

export default chartsStyle;
