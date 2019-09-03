import withStyles from "@material-ui/core/styles/withStyles";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import PropTypes from "prop-types";
import React from "react";
import PersonRelationshipPerson from '../Claims/PersonRelationshipPerson';
import ClaimsSingleSelect from '../ClaimsSingleSelect'
import _ from 'lodash';
import uuid from 'uuid/v4';

const style = {
	infoText: {
		fontWeight: "300",
		margin: "10px 0 30px",
		textAlign: "center"
	},
	inputAdornmentIcon: {
		color: "#555"
	},
	choice: {
		textAlign: "center",
		cursor: "pointer",
		marginTop: "20px"
	},
	...customSelectStyle,
	...customCheckboxRadioSwitch
};

const relationships = PersonRelationshipPerson

class Step2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_selected: ""
		};
		this._handleSelect = this._handleSelect.bind(this)
	}

	componentDidMount () {
		console.log(JSON.stringify(this.state, null, 2))
	}
	sendState() {
		return this.state;
	}

	isValidated() {
		return true;
	}

	_handleSelect (e) {
		this.setState({
			_selected: e.target.value
		})
		setTimeout(() => {
			console.log('AFTER', JSON.stringify(this.state, null, 2))
		}, 1000);
	}

	_handler = (e) => {
		this._handleSelect(e)
	}
	render() {
		const { classes } = this.props;

		const group = {
			id: 'person_relationship_person',
			ariaLabel: 'Relationship to Person',
			groupType: 'PersonRelationshipPerson',
			groupName: 'person_relationship_person_1',
			groupInfoText: 'What is your relationship to this person?',
			groupSubText: '(select best that applies to this context)',
			items: relationships
		}

		return (
			<section>
				<GridContainer justify="center">
					<GridItem xs={12} sm={12} md={12} lg={10}>
						<GridContainer>
							<ClaimsSingleSelect classes={classes} _handleChange={this._handler} { ...group} />
						</GridContainer>
					</GridItem>
				</GridContainer>
			</section>
		);
	}
}

Step2.propTypes = {
	classes: PropTypes.object
};

export default withStyles(style)(Step2);
