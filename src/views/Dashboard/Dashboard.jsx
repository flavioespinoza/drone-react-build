import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import DateRange from "@material-ui/icons/DateRange";
import Claims from "@material-ui/icons/Gavel";
import Consents from "@material-ui/icons/HowToReg";
import GlobalIdentity from "@material-ui/icons/Language";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import request from "request";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import store from 'redux/store'
import ReactJson from "react-json-view";
import _ from "lodash";

const log = require("ololog");

async function _each(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      cardAnimaton: "cardHidden",
      alertMsg: "Requesting Access Token",
      show: false
    };
    this._my_contacts = this._my_contacts.bind(this);
    this._discovery_service = this._discovery_service.bind(this);
  }

  componentDidMount() {
    const qs = {
      email: "flavio.salsero@protonmail.com"
    };
    this._discovery_service(qs).then(res => {
      console.log('setGlobalIdGraph', res)
      store.dispatch({type: 'SET_GLOBAL_ID_GRAPH', payload: res})
    });
  }

  _my_contacts(my_email) {
    console.log("my_email", my_email);
    const _self = this;
    const all_contacts = [
      { email: "fred@fredsemail.com" },
      { email: "bob@bobsemail.com" },
      { email: "lucy@lucysemail.com" },
      { email: "flavio.salsero@protonmail.com" }
    ];
    const my_contacts = [];
    (async function() {
      try {
        await _each(all_contacts, async obj => {
          const _contact = await _self._discovery_service({
            email: obj.email
          });
          console.log("_contact", _contact);
          my_contacts.push(_contact);
        });
        store.dispatch({type: 'SET_MY_CONTACTS', payload: my_contacts})      
      } catch (err) {
        log.red(err);
      }
    })();
  }

  _discovery_service(qs) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/discovery-service",
      qs: qs,
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate",
        Host: "localhost:8080",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "Content-Type": "application/json"
      }
    };
    return new Promise(resolve => {
      request(options, (error, response, body) => {
        if (error) throw new Error(error);
        const _body = JSON.parse(body);
        resolve(_body);
      });
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes, global_id_graph, my_contacts } = this.props;
    return (
      <section id={"dashboard_identity"}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card className={"authnet-card"}>
              <CardHeader
                className={"authnet-card__header"}
                color="info"
                stats
                icon
              >
                <CardIcon color="info">
                  <Consents />
                </CardIcon>
                <Link
                  to="/admin/my-consents"
                  className={classes.cardCategoryLink}
                >
                  View and Manage
                </Link>
                <h3 className={classes.cardTitle}>My Consents</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card className={"authnet-card"}>
              <CardHeader
                className={"authnet-card__header"}
                color="warning"
                stats
                icon
              >
                <CardIcon color="warning">
                  <Claims />
                </CardIcon>
                <Link
                  to="/admin/my-claims"
                  className={classes.cardCategoryLink}
                >
                  View and Manage
                </Link>
                <h3 className={classes.cardTitle}>My Claims</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card className={"authnet-card"}>
              <CardHeader
                className={"authnet-card__header"}
                color="rose"
                stats
                icon
              >
                <CardIcon color="rose">
                  <GlobalIdentity />
                </CardIcon>
                <Link
                  to="/admin/my-global-identity-graph"
                  className={classes.cardCategoryLink}
                >
                  View and Manage
                </Link>
                <h3 className={classes.cardTitle}>My Global Identity Graph</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer style={{ paddingLeft: 24 }}>
          <ReactJson src={global_id_graph} />
        </GridContainer>
      </section>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    global_id_graph: state.dashboardReducer.global_id_graph,
    my_contacts: state.dashboardReducer.my_contacts
  };
}

export default connect(
  mapStateToProps
)(withStyles(dashboardStyle)(Dashboard));