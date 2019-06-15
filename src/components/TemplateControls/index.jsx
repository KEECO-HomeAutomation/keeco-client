import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import SwitchControls from './SwitchControls';
import LampControls from './LampControls';
import ThermostatControls from './ThermostatControls';

const styles = () => ({
	container: {
		width: '100%',
		padding: '5px'
	}
});

export const TemplateControls = ({
	Controls,
	templateData,
	onTemplateDataChange,
	classes
}) => {
	return (
		<div className={classes.container}>
			{Controls && (
				<Controls data={templateData} onChange={onTemplateDataChange} />
			)}
		</div>
	);
};

TemplateControls.propTypes = {
	template: PropTypes.string,
	templateData: PropTypes.object,
	onTemplateDataChange: PropTypes.func,
	classes: PropTypes.object,
	Controls: PropTypes.elementType
};

export const enhancer = compose(
	withStyles(styles),
	withProps(({ template }) => {
		let Controls;
		switch (template) {
			case 'switch':
				Controls = SwitchControls;
				break;
			case 'lamp':
				Controls = LampControls;
				break;
			case 'thermostat':
				Controls = ThermostatControls;
				break;
			default:
				Controls = null;
				break;
		}

		return { Controls };
	})
);

export default enhancer(TemplateControls);
