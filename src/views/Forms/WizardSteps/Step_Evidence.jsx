import withStyles from "@material-ui/core/styles/withStyles";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React from "react";

const style = {
	infoText: {
		fontWeight: "300",
		margin: "10px 0 30px",
		textAlign: "center"
	},
	inputAdornmentIcon: {
		color: "#555"
	},
	inputAdornment: {
		position: "relative"
	}
};

class Step_Evidence extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
			
		};
	}
	sendState() {
		return this.state;
	}

	render() {
		const { classes } = this.props;
		return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Upload Document to suport your Annotion.
          </h4>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <p className={classes.infoText}>
            I verified their identity based on their Driver’s License or
            government issued picture ID.
          </p>
          <ImageUpload />
        </GridItem>
      </GridContainer>
    );
	}
}

Step_Evidence.propTypes = {
	classes: PropTypes.object
};

export default withStyles(style)(Step_Evidence);
