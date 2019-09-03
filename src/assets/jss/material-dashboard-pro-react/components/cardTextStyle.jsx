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
import { dangerCardHeader, grayColor, infoCardHeader, primaryCardHeader, roseCardHeader, successCardHeader, warningCardHeader } from "assets/jss/material-dashboard-pro-react.jsx";

const cardTextStyle = {
  cardText: {
    float: "none",
    display: "inline-block",
    marginRight: "0",
    borderRadius: "3px",
    backgroundColor: grayColor[0],
    padding: "15px",
    marginTop: "-20px"
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader
};

export default cardTextStyle;
