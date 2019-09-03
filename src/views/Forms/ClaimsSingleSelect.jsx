import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CheckboxIcon from "components/CheckboxIcon/CheckboxIcon";
import _ from 'lodash';
import uuid from 'uuid/v4';

const styles = {
	block: {
		maxWidth: 250,
	},
	radioButton: {
		marginBottom: 16,
		width: 100,
		height: 100
	},
};

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	formControl: {
		margin: theme.spacing(3),
	},
	group: {
		margin: theme.spacing(1, 0),
	},
	section: {
		margin: '0 auto'
	}
}));

const ClaimsSingleSelect = ({ ...props }) => {

	const { classes, ...prop } = props

	const classes2 = useStyles();

	const [value, setValue] = React.useState('relationships');

	const _items = _.map(prop.items, (obj, idx) => {
		return (
			<FormControlLabel
				key={uuid()}
				value={obj.name}
				control={
					<Radio
						icon={CheckboxIcon({ classes, style: 'regular', icon: obj.icon })}
						checkedIcon={CheckboxIcon({ classes, style: 'solid', icon: obj.icon })}
						style={styles.radioButton}
					/>
				}
				label={obj.annotationText} />
		)
	})

	function handleChange(event) {
		setValue(event.target.value);
		prop._handleChange(event)
	};

	return (
		<section id={prop.id} className={classes2.section}>
			<h4 className={classes.infoText}>{prop.groupInfoText}</h4>
			{/* <p className={classes.infoText}>{prop.groupSubText}</p> */}
			<FormControl component="fieldset" className={classes.formControl}>
				<RadioGroup
					aria-label={prop.ariaLabel}
					name={prop.groupName}
					className={classes2.group}
					value={value}
					onChange={handleChange}>
					{_items}
				</RadioGroup>
			</FormControl>
		</section>
	)
};

export default ClaimsSingleSelect;
