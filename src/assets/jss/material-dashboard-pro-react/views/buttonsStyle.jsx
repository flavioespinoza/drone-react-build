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
import { grayColor } from "assets/jss/material-dashboard-pro-react.jsx";
import buttonGroupStyle from "assets/jss/material-dashboard-pro-react/buttonGroupStyle.jsx";


const buttonsStyle = {
  cardTitle: {
    marginTop: "0",
    marginBottom: "3px",
    color: grayColor[2],
    fontSize: "18px"
  },
  cardHeader: {
    zIndex: "3"
  },
  cardContentLeft: {
    padding: "15px 20px 15px 0px",
    position: "relative"
  },
  cardContentRight: {
    padding: "15px 20px 15px 0px",
    position: "relative"
  },
  cardContentBottom: {
    padding: "15px 0px 0px 0px",
    position: "relative"
  },
  marginRight: {
    marginRight: "5px"
  },
  icons: {
    width: "17px",
    height: "17px"
  },
  ...buttonGroupStyle,
  socialButtonsIcons: {
    fontSize: "18px",
    marginTop: "-2px",
    position: "relative"
  }
};

export default buttonsStyle;
