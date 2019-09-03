import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import Language from "@material-ui/icons/Language";
import avatar from "assets/img/faces/jonathan.jpg";
import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Timeline from "@material-ui/icons/Timeline"
import Gavel from "@material-ui/icons/Gavel"

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle"

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import ReactJson from 'react-json-view'
import React from "react";
import { Link } from 'react-router-dom'
import CardFooter from "components/Card/CardFooter.jsx"
import DateRange from "@material-ui/icons/DateRange"


function GlobalIdentityGraph(props) {
	const { classes } = props;
	return (
		<div>

			<GridContainer>

				<GridItem xs={12} sm={12} md={4}>
					<Card className={'authnet-card'}>
						<CardHeader className={'authnet-card__header'} color="rose" stats icon>
							<CardIcon color="rose">
								<Timeline />
								<PermIdentity />
							</CardIcon>
							<Link to="#" className={classes.cardCategoryLink}>View and Manage</Link>
							<h3 className={classes.cardTitle}>Link Identities</h3>
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
					<Card className={'authnet-card'}>
						<CardHeader className={'authnet-card__header'} color="rose" stats icon>
							<CardIcon color="rose">
								<Timeline />
								<Gavel />
							</CardIcon>
							<Link to="#" className={classes.cardCategoryLink}>View and Manage</Link>
							<h3 className={classes.cardTitle}>Link Claims & Consents</h3>
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
					<Card className={'authnet-card'}>
						<CardHeader className={'authnet-card__header'} color="rose" stats icon>
							<CardIcon color="rose">
								<Timeline />
								<Gavel />
							</CardIcon>
							<Link to="#" className={classes.cardCategoryLink}>View and Manage</Link>
							<h3 className={classes.cardTitle}>Derived Claims</h3>
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


			{/* GLOBAL IDENTITY GRAPH */}
			<GridContainer>
				<GridItem xs={12} sm={12} md={8}>
					<Card className={'authnet-card'}>
						<CardHeader className={'authnet-card__header'} color="rose" stats icon>
							<CardIcon color="rose">
								<Language />
							</CardIcon>
							<Link to="#" className={classes.cardCategoryLink}>View and Manage</Link>
							<h3 className={classes.cardTitle}>My Global Identity Graph</h3>
						</CardHeader>

						<CardBody>
							<GridContainer style={{ paddingLeft: 24 }}>

								{/* <ReactJson src={id_graph} /> */}

							</GridContainer>

						</CardBody>
					</Card>
				</GridItem>

				{/* Right Profile */}
				<GridItem xs={12} sm={12} md={4}>
					<Card profile>
						<CardAvatar profile>
							<a href="#pablo" onClick={e => e.preventDefault()}>
								<img src={avatar} alt="..." />
							</a>
						</CardAvatar>
						<CardBody profile>
							<h4 className={classes.cardTitle}>Jonathan Hare</h4>
							<p style={{ textAlign: 'left', padding: 12 }} className={classes.description}>
								Jonathan Hare is the CEO of WebShield Inc. and co-founder of EP3 Foundation (Empowering People with Privacy and Personalization). He is a serial entrepreneur and technology executive, and has broad expertise in Internet and enterprise software, security and privacy technology, electronic health records, healthcare and education policy, etc. He has been a member of the Health IT Standards Panel's Security and Privacy Technical Committee, the Identity Credential Management Working Group, the Markle Foundation Consumer Authentication Working Group, and the Markle Foundation Personal Health Technology Council. He has testified before Congress on Health IT policies. He has broad expertise in privacy, cybersecurity, cloud technology, informatics, and legal and regulatory compliance. He has been granted three patents for trusted social networking, identity syndication, privacy preserving data sharing and analytics.
              </p>
							<p style={{ textAlign: 'left', padding: 12 }} className={classes.description}>
								He was Founder, CTO and Executive Chairman of Resilient Network Systems, where he pioneered novel approaches to trusted networking. He was also founder and CEO of Consilient, Inc. an internet software firm which pioneered XML-based collaborative application technology. Earlier, he was founding CEO of Evolve Software, an enterprise software vendor which pioneered a new application market, and went public in 2000. Jonathan has held executive, management and technical positions at Teseract, Microsoft, Cornerstone Research, Strategic Planning Associates, and Impell Corporation. Jonathan received his MBA from Stanford Graduate School of Business, where he was an Arjay Miller Scholar. He was a Regents and Chancellors Scholar at UC Berkeley, where he majored in Industrial Engineering and Operations Research.
							</p>
							<Button color="rose" round>
								Make Claims About Jonathan
              </Button>
						</CardBody>
					</Card>
				</GridItem>

			</GridContainer>

			<GridContainer>
				<GridItem xs={12} sm={12} md={8}>
					<Card>
						<CardHeader color="rose" stats icon>
							<CardIcon color="rose">
								<PermIdentity />
							</CardIcon>
							<h4 className={classes.cardIconTitle}>
								My Profile - <small>Update profile</small>
							</h4>
						</CardHeader>
						<CardBody>

							<GridContainer>
								<GridItem xs={12} sm={12} md={6}>
									<CustomInput
										labelText="First Name"
										id="first-name"
										formControlProps={{
											fullWidth: true
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<CustomInput
										labelText="Last Name"
										id="last-name"
										formControlProps={{
											fullWidth: true
										}}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="City"
										id="city"
										formControlProps={{
											fullWidth: true
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Country"
										id="country"
										formControlProps={{
											fullWidth: true
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Postal Code"
										id="postal-code"
										formControlProps={{
											fullWidth: true
										}}
									/>
								</GridItem>
							</GridContainer>

							<GridContainer>
								<GridItem xs={12} sm={12} md={12}>
									<InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
									<CustomInput
										labelText="About me text...."
										id="about-me"
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											multiline: true,
											rows: 5
										}}
									/>
								</GridItem>
							</GridContainer>

							<Button color="rose" className={classes.updateProfileButton}>
								Update Profile
              </Button>

							<Clearfix />
						</CardBody>
					</Card>
				</GridItem>

			</GridContainer>

		</div>
	);
}

GlobalIdentityGraph.propTypes = {
	classes: PropTypes.object
};

export default withStyles({...userProfileStyles, ...dashboardStyle})(GlobalIdentityGraph);
