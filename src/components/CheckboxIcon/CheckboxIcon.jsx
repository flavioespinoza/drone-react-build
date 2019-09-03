import React from "react";

function CheckboxIcon({ ...props }) {
	const { classes, ...prop } = props
	const iconStyle = (style) => {
			if (style === 'solid') { return 'fas' }
			if (style === 'regular') { return 'far' }
			if (style === 'light') { return 'fal' }
			return 'fas'
	}
	const className = `${iconStyle(prop.style)} fa-${prop.icon} ${classes.iconCheckboxIcon}`
	return (
		<i className={className} />
	)
}

export default CheckboxIcon